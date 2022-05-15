import { useSnackbar } from "notistack";
import React, { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../config";
import { AuthReducer } from "./Auth.reducer";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export interface AuthStateType {
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  token: string;
}

const initialState: AuthStateType = {
  isAuthenticated: false,
  loading: false,
  user: null,
  token: "",
};

const AuthContext = createContext(initialState);

export default AuthContext;

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const userLogin = async (
    data: { email: string; password: string },
    auth: any
  ) => {
    dispatch({ type: "LOADING" });
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        handleFirebaseResponse(res);
      })
      .catch((err) => {
        console.log({ err });
        enqueueSnackbar("User not found! Please enter valid credentials", {
          variant: "error",
        });
      });
  };

  const userSignup = async (
    data: { email: string; password: string },
    auth: any
  ) => {
    dispatch({ type: "LOADING" });
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        handleFirebaseResponse(res);
      })
      .catch((err) => {
        console.log({ err });
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      });
  };

  const googleLogin = async (auth: any) => {
    await signInWithPopup(auth, provider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = res.user;
        console.log({ res, token, user });
        // Login(token!);
        handleFirebaseResponse(res);
      })
      .catch((err) => {
        console.log({ err });
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      });
  };

  const handleFirebaseResponse = (res: UserCredential) => {
    res.user.getIdTokenResult().then(async (token) => {
      // console.log(token.token);
      await Login(token.token);
    });
  };

  const Login = async (token: string) => {
    return fetch(`${backendUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.message);
        }
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        dispatch({
          type: "LOGIN",
          payload: { user: res.user, token: res.token },
        });
        enqueueSnackbar("Login successful", {
          variant: "success",
          autoHideDuration: 3000,
        });
        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  const getUserProfile = async () => {
    let token = localStorage.getItem("token");
    dispatch({ type: "LOADING" });
    return fetch(`${backendUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.err) {
          throw new Error(res.message);
        }
        localStorage.setItem("user", JSON.stringify(res.user));
        dispatch({
          type: "USER_PROFILE",
          payload: { user: res.user, token },
        });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserProfile();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={
        {
          ...state,
          userLogin,
          userSignup,
          googleLogin,
          getUserProfile,
          logout,
        } as any
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
