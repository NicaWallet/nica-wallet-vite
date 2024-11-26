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
  CardActionArea,
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
  gradientBg?: string; // Fondo degradado
  customHeight?: string;
  rounded?: boolean; // Bordes redondeados
  shadowLevel?: "none" | "low" | "medium" | "high"; // Nivel de sombra
  titleColor?: string; // Color del título
  descriptionColor?: string; // Color de la descripción
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
 * CardComponent mejorado con variantes de diseño adicionales.
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
  gradientBg,
  customHeight = "auto",
  rounded = false,
  shadowLevel = "medium",
  titleColor = "text.primary",
  descriptionColor = "text.secondary",
  maxDescriptionHeight = "100px",
  imageBorderRadius = "0px",
  imageBoxShadow = "none",
  imageObjectFit = "cover",
  imageHeight = "140px",
  customBody,
}) => {
  const boxShadow =
    shadowLevel === "none"
      ? "none"
      : shadowLevel === "low"
        ? "0px 1px 3px rgba(0, 0, 0, 0.1)"
        : shadowLevel === "medium"
          ? "0px 3px 6px rgba(0, 0, 0, 0.16)"
          : "0px 6px 12px rgba(0, 0, 0, 0.25)";

  return (
    <Card
      sx={{
        maxWidth: width,
        width: "100%",
        background: gradientBg ? gradientBg : bgColor,
        borderRadius: rounded ? "16px" : "4px",
        borderColor: borderColor,
        border: `1px solid ${borderColor}`,
        boxShadow: boxShadow,
        height: customHeight,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardActionArea onClick={onClick}>
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

        <CardContent
          sx={{
            flex: 1,
            textAlign: "left",
          }}
        >
          {isLoading ? (
            <>
              <Skeleton width="60%" height={30} />
              <Skeleton width="100%" height={20} />
              <Skeleton width="80%" height={20} />
            </>
          ) : (
            <>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: titleColor }}
              >
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
                  <Typography variant="body2" sx={{ color: descriptionColor }}>
                    {description}
                  </Typography>
                )}
              </Box>
            </>
          )}
        </CardContent>
      </CardActionArea>

      {buttonText && (
        <CardActions>
          {isLoading ? (
            <Skeleton width="80px" height="36px" />
          ) : (
            <Button size="small" onClick={onClick} variant="outlined">
              {buttonText}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default CardComponent;