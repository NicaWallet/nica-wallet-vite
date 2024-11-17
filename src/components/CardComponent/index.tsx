import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CardMedia,
  Box,
  Skeleton,
} from "@mui/material";

export interface CardComponentProps {
  title: string;
  description: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onClick?: () => void;
  isLoading?: boolean;
  width?: string;
  borderColor?: string;
  bgColor?: string;
  customHeight?: string;
  maxDescriptionHeight?: string;
  imageBorderRadius?: string;
  imageBoxShadow?: string;
  imageObjectFit?:
    | "cover"
    | "contain"
    | "fill"
    | "none"
    | "scale-down"
    | "unset"
    | "initial"
    | "revert"
    | "inherit";
  imageHeight?: string;
  customBody?: React.ReactNode;
}

/**
 * CardComponent es un componente reutilizable que muestra un título, descripción, imagen o ícono, y un botón opcional.
 * Soporta estado de carga y varias opciones de personalización.
 *
 * @param {CardComponentProps} props - Las propiedades para el CardComponent.
 * @returns {JSX.Element} El CardComponent renderizado.
 */
const CardComponent: React.FC<CardComponentProps> = ({
  title,
  description,
  imageUrl,
  icon,
  buttonText,
  onClick,
  isLoading = false,
  width = "345px",
  borderColor = "transparent",
  bgColor = "white",
  customHeight = "auto",
  maxDescriptionHeight = "100px",
  imageBorderRadius = "0px",
  imageBoxShadow = "none",
  imageObjectFit = "cover",
  imageHeight = "140px",
  customBody,
}) => {
  return (
    <Card
      sx={{
        maxWidth: width,
        width: "100%",
        borderColor: borderColor,
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        height: customHeight,
      }}
    >
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={icon ? 80 : imageHeight}
        />
      ) : icon ? (
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
            image={imageUrl}
            alt={title}
            height={imageHeight}
            sx={{
              borderRadius: imageBorderRadius,
              boxShadow: imageBoxShadow,
              objectFit: imageObjectFit,
            }}
          />
        )
      )}

      <CardContent>
        {isLoading ? (
          <>
            <Skeleton width="60%" height={30} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="80%" height={20} />
          </>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Box
              sx={{
                maxHeight: maxDescriptionHeight,
                overflowY: "auto",
              }}
            >
              {customBody ? (
                customBody
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              )}
            </Box>
          </>
        )}
      </CardContent>

      {buttonText && (
        <CardActions>
          {isLoading ? (
            <Skeleton width="80px" height="36px" />
          ) : (
            <Button size="small" onClick={onClick}>
              {buttonText}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default CardComponent;
