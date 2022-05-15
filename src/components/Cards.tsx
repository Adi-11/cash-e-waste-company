import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { GiTwoCoins, GiPriceTag, GiStack } from "react-icons/gi";
import { GrAdd, GrSubtract, GrCart } from "react-icons/gr";
import { useSnackbar } from "notistack";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ProductCardProps {
  product: any;
  addToCart: any;
  handleIncreaseProductCount: any;
  handleDecreaseProductCount: any;
  cartItem: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addToCart,
  handleDecreaseProductCount,
  handleIncreaseProductCount,
  cartItem,
}) => {
  const [count, setCount] = useState(1);
  const [showCart, setShowCart] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (cartItem.length === 0) {
      setShowCart(true);
      setCount(1);
    }
  }, [cartItem]);

  const handleIncrease = () => {
    if (count < product.stock) {
      setCount(count + 1);
    }
    handleIncreaseProductCount(product._id);
  };

  const handleDecrease = () => {
    setCount(count - 1);
    if (count <= 0) {
      setShowCart(true);
      setCount(1);
      return;
    }
    handleDecreaseProductCount(product._id);
  };

  const handleAddToCart = () => {
    if (count < product.stock) {
      addToCart(product);
      setShowCart(false);
    } else {
      enqueueSnackbar("Out of stock", { variant: "error" });
    }
  };

  return (
    <Card sx={{ backgroundColor: "white", margin: "auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.name[0]}
          </Avatar>
        }
        action={
          <div className="flex items-center justify-center bg-accent px-1 py-0.5 rounded-sm ">
            {showCart ? (
              <div
                className="p-0.5 cursor-pointer"
                onClick={() => handleAddToCart()}
              >
                <GrCart size={20} />
              </div>
            ) : (
              <>
                <div
                  className="px-0.5 cursor-pointer"
                  onClick={() => handleIncrease()}
                >
                  <GrAdd size={15} />
                </div>
                <div className="px-0.5">{count}</div>
                <div
                  className="px-0.5 cursor-pointer"
                  onClick={() => handleDecrease()}
                >
                  <GrSubtract size={15} />
                </div>
              </>
            )}
          </div>
        }
        title={`${product.name}`}
        subheader={`${product.company}`}
      />
      <CardMedia
        component="img"
        style={{
          height: 190,
          objectFit: "contain",
        }}
        image={`${product.avatar}`}
        alt="Paella dish"
      />
      <CardActions>
        <div className="flex items-center justify-center cursor-pointer mx-2">
          <GiTwoCoins />
          <p>
            <strong>{product.coins}</strong>
          </p>
        </div>
        <div className="flex items-center justify-center cursor-pointer mx-2">
          <GiPriceTag />
          <p>
            <strong>{product.price}</strong>
          </p>
        </div>
        <div className="flex items-center justify-center cursor-pointer mx-2">
          <GiStack />
          <p>
            <strong>{product.stock}</strong>
          </p>
        </div>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
