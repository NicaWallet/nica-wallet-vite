import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";

export interface CardComponentProps {
  title: string;
  description: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onClick?: () => void;
}

/**
 * CardComponent is a React functional component that displays a card with an optional icon or image,
 * title, description, and a button.
 *
 * @component
 * @param {CardComponentProps} props - The properties that define the CardComponent.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description text of the card.
 * @param {string} [props.imageUrl] - The URL of the image to be displayed in the card.
 * @param {React.ReactNode} [props.icon] - An optional icon to be displayed at the top of the card.
 * @param {string} [props.buttonText] - The text to be displayed on the button.
 * @param {() => void} [props.onClick] - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered card component.
 */
const CardComponent: React.FC<CardComponentProps> = ({
  title,
  description,
  imageUrl,
  icon,
  buttonText,
  onClick,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {icon ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 80,
            backgroundColor: "background.default",
          }}
        >
          {icon}
        </Box>
      ) : (
        imageUrl && (
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt={title}
          />
        )
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {buttonText && (
        <CardActions>
          <Button size="small" onClick={onClick}>
            {buttonText}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CardComponent;
