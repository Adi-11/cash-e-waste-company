import { CircularProgress, Divider } from "@mui/material";
import React, { useContext, useState } from "react";
import Lottie from "react-lottie";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../context/Authentication/Auth.provider";
import { validateEmail } from "../Helpers/validations";
import { useSnackbar } from "notistack";
import { getAuth } from "firebase/auth";
import { getApp } from "firebase/app";

interface LoginProps {}

export const LoginComp: React.FC<LoginProps> = ({}) => {
  const [forLogin, setForLogin] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { loading, userSignup, userLogin, googleLogin } =
    useContext<any>(AuthContext);
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleForLogin = () => {
    setForLogin(!forLogin);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const verifyData = () => {
    if (data.email === "" && data.password === "") {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "error",
      });
      return false;
    }

    if (validateEmail(data.email) === null) {
      enqueueSnackbar("Please enter a valid email", { variant: "error" });
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    if (verifyData()) {
      const auth = getAuth(getApp());
      userLogin(data, auth);
    }
  };

  const handleRegister = () => {
    if (verifyData()) {
      const auth = getAuth(getApp());
      userSignup(data, auth);
    }
  };

  const handleGoogleLogin = () => {
    const auth = getAuth(getApp());
    googleLogin(auth);
  };

  return (
    <div className="lg:h-screen flex items-center justify-center">
      <div className="shadow-2xl shadow-slate-500 rounded-md py-4 m-auto mb-4 mt-10 flex items-center flex-col-reverse lg:flex-row lg:py-8 justify-center w-3/4 login-bg">
        <div className="flex-[0.5] h-full rounded-tl-md rounded-bl-md p-4">
          <div
            className={
              "flex items-center justify-center flex-col h-full lg:w-3/4 md:w-3/4 w-full m-auto"
            }
          >
            <p className="text-accent mt-4 text-3xl font-extrabold ">
              Cash-e-Waste
            </p>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: require(`../assets/login.json`),
              }}
            />
          </div>
        </div>
        <div className="flex-[0.5] p-4 relative w-full">
          <div className="w-full h-full">
            {forLogin ? (
              <div className="text-center">
                <p className="font-bold text-secondary-dark text-2xl w-full">
                  Welcome Back
                </p>
                <p className={"text-base opacity-80 text-semibold scale-90"}>
                  Sign In to your account
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="font-bold text-2xl text-secondary-dark w-full">
                  Welcome to Cash-e-Waste
                </p>
                <p className={"text-base opacity-80 text-semibold scale-90"}>
                  Sign Up for new user
                </p>
              </div>
            )}

            <div className="m-auto lg:w-3/4 md:w-3/4 w-full">
              <div
                className={
                  "feild w-full flex items-start justify-center flex-col mb-6"
                }
              >
                <div className={"w-4/5 mb-2"}>
                  <p>Email</p>
                </div>
                <input
                  className={
                    "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full"
                  }
                  type="email"
                  name="email"
                  placeholder="Type in your email.."
                  required
                  onChange={onChange}
                  value={data.email}
                />
              </div>
              <div
                className={
                  "feild w-full flex items-start justify-start flex-col"
                }
              >
                <div className={"w-4/5 mb-2"}>
                  <p>Password</p>
                </div>
                <input
                  className={
                    "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full"
                  }
                  type="password"
                  name="password"
                  placeholder="Type in your password.."
                  required
                  onChange={onChange}
                  value={data.password}
                />
              </div>
              {forLogin ? (
                <button
                  className={"btn"}
                  onClick={() => handleLogin()}
                  disabled={loading}
                >
                  Login
                  {loading && (
                    <CircularProgress
                      size={20}
                      color={"primary"}
                      className={"loader"}
                    />
                  )}
                </button>
              ) : (
                <button
                  className={"btn"}
                  onClick={() => handleRegister()}
                  disabled={loading}
                >
                  Register
                  {loading && (
                    <CircularProgress
                      size={20}
                      color={"primary"}
                      className={"loader"}
                    />
                  )}
                </button>
              )}
            </div>
            <div className="m-auto mt-6">
              <Divider variant="inset" sx={{ borderBottomWidth: 2 }} />
            </div>
            <div className="m-auto lg:w-3/4 md:w-3/4 w-full">
              <button
                className={"btn-google"}
                onClick={() => handleGoogleLogin()}
                disabled={loading}
              >
                Login with Google <FcGoogle size={25} className={"loader"} />
              </button>
            </div>

            <div className="flex items-center justify-center mt-8 opacity-80">
              {forLogin ? (
                <p className="text-base">
                  Don't have an account yet?{" "}
                  <span
                    className="text-secondary-dark font-semibold hover:underline cursor-pointer"
                    onClick={() => handleForLogin()}
                  >
                    Sign up
                  </span>
                </p>
              ) : (
                <p className="text-base">
                  Already have an account?{" "}
                  <span
                    className="text-secondary-dark font-semibold hover:underline cursor-pointer"
                    onClick={() => handleForLogin()}
                  >
                    Log In
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
