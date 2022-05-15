import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { GiTwoCoins, GiPriceTag, GiStack } from "react-icons/gi";

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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ backgroundColor: "white", margin: "auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
