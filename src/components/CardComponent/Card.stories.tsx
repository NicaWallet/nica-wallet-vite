import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import CardComponent, { CardComponentProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";
import AddIcon from "@mui/icons-material/Add";

export default {
  title: "Components/CardComponent",
  component: CardComponent,
  argTypes: {
    title: {
      control: "text",
      description: "Título de la tarjeta.",
      defaultValue: "Título del Card",
    },
    description: {
      control: "text",
      description: "Descripción dentro del card.",
      defaultValue: "Esta es la descripción del card.",
    },
    imageUrl: {
      control: "text",
      description: "URL de la imagen a mostrar en la tarjeta.",
    },
    icon: {
      control: false,
      description: "Ícono opcional para mostrar en lugar de la imagen.",
    },
    buttonText: {
      control: "text",
      description: "Texto a mostrar en el botón.",
      defaultValue: "Click Me",
    },
    onClick: {
      action: "clicked",
      description: "Función que se ejecuta al hacer clic en el botón.",
    },
    isLoading: {
      control: "boolean",
      description:
        "Muestra skeletons en lugar del contenido real mientras se carga.",
      defaultValue: false,
    },
    width: {
      control: "text",
      description: "Ancho de la tarjeta (porcentaje o px).",
      defaultValue: "345px",
    },
    borderColor: {
      control: "color",
      description: "Color del borde de la tarjeta.",
      defaultValue: "transparent",
    },
    bgColor: {
      control: "color",
      description: "Color de fondo de la tarjeta.",
      defaultValue: "white",
    },
    customHeight: {
      control: "text",
      description: "Altura de la tarjeta (porcentaje o px).",
      defaultValue: "auto",
    },
    maxDescriptionHeight: {
      control: "text",
      description:
        "Altura máxima de la descripción antes de que aparezca el scroll.",
      defaultValue: "100px",
    },
    imageBorderRadius: {
      control: "text",
      description: "Radio del borde de la imagen.",
      defaultValue: "0px",
    },
    imageBoxShadow: {
      control: "text",
      description: "Sombra aplicada a la imagen.",
      defaultValue: "none",
    },
    imageObjectFit: {
      control: { type: "select" },
      options: ["cover", "contain", "fill", "none"],
      description: "Ajuste de la imagen en su contenedor.",
      defaultValue: "cover",
    },
    imageHeight: {
      control: "text",
      description: "Altura personalizada de la imagen.",
      defaultValue: "140px",
    },
  },
} as Meta<CardComponentProps>;

const Template: StoryFn<CardComponentProps> = (args) => (
  <CenteredTemplate>
    <CardComponent {...args} />
  </CenteredTemplate>
);

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  title: "Título del Card",
  description: "Esta es la descripción del card.",
  imageUrl: "https://via.placeholder.com/150",
  buttonText: "Click Me",
  width: "345px",
  isLoading: false,
};
DefaultCard.storyName = "Default Card";

export const CardWithIcon = Template.bind({});
CardWithIcon.args = {
  title: "Título del Card",
  description: "Esta es la descripción del card.",
  icon: <AddIcon fontSize="large" />,
  buttonText: "Click Me",
  width: "345px",
  isLoading: false,
};
CardWithIcon.storyName = "Card With Icon";

export const LoadingCard = Template.bind({});
LoadingCard.args = {
  title: "Cargando...",
  description: "Esta descripción está cargando...",
  imageUrl: "https://via.placeholder.com/150",
  buttonText: "Cargando...",
  isLoading: true,
};
LoadingCard.storyName = "Loading Card";

export const CustomImageCard = Template.bind({});
CustomImageCard.args = {
  title: "Título del Card",
  description: "Esta es una descripción con una imagen personalizada.",
  imageUrl: "https://picsum.photos/1920/1080.jpg",
  buttonText: "Click Me",
  imageBorderRadius: "10px",
  imageBoxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  imageObjectFit: "contain",
  imageHeight: "200px",
};
CustomImageCard.storyName = "Card with Custom Image";
