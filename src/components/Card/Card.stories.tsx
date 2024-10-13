// CardComponent.stories.tsx
import { Meta, StoryFn } from "@storybook/react";
import CenteredTemplate from "../../stories/CenteredTemplate";
import { action } from "@storybook/addon-actions";
import InfoIcon from "@mui/icons-material/Info"; // Importa un ícono de MUI
import CardComponent, { CardComponentProps } from ".";

// URL de imagen de placeholder
const placeholderImage =
  "https://via.placeholder.com/300x140.png?text=Card+Image";

export default {
  title: "Components/CardComponent",
  component: CardComponent,
  argTypes: {
    title: {
      control: "text",
      description: "Título de la tarjeta",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Título" },
      },
    },
    description: {
      control: "text",
      description: "Descripción de la tarjeta",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Descripción" },
      },
    },
    imageUrl: {
      control: "text",
      description: "URL de la imagen de la tarjeta",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    icon: {
      control: false, // React.ReactNode no puede ser controlado directamente
      description: "Ícono que se muestra en la tarjeta",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    buttonText: {
      control: "text",
      description: "Texto del botón en la tarjeta",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    onClick: {
      action: "button-click",
      description: "Función que se ejecuta al hacer clic en el botón",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Componente de tarjeta reutilizable construido con Material-UI que muestra una imagen o un ícono, título, descripción y un botón opcional.",
      },
    },
  },
} as Meta<CardComponentProps>;

const Template: StoryFn<CardComponentProps> = (args) => (
  <CenteredTemplate>
    <CardComponent {...args} />
  </CenteredTemplate>
);

// Historias

// 1. Default: Solo título y descripción
export const Default = Template.bind({});
Default.args = {
  title: "Tarjeta Predeterminada",
  description: "Esta es una descripción predeterminada para la tarjeta.",
};
Default.storyName = "Default";
Default.parameters = {
  docs: {
    storyDescription: "Tarjeta con solo título y descripción.",
  },
};

// 2. With Image: Título, descripción e imagen
export const WithImage = Template.bind({});
WithImage.args = {
  title: "Tarjeta con Imagen",
  description: "Esta tarjeta incluye una imagen.",
  imageUrl: placeholderImage,
};
WithImage.storyName = "With Image";
WithImage.parameters = {
  docs: {
    storyDescription:
      "Tarjeta que muestra una imagen junto con el título y la descripción.",
  },
};

// 3. With Icon: Título, descripción e ícono
export const WithIcon = Template.bind({});
WithIcon.args = {
  title: "Tarjeta con Ícono",
  description: "Esta tarjeta incluye un ícono en lugar de una imagen.",
  icon: <InfoIcon fontSize="large" color="primary" />, // Usa un ícono de MUI
};
WithIcon.storyName = "With Icon";
WithIcon.parameters = {
  docs: {
    storyDescription:
      "Tarjeta que muestra un ícono en lugar de una imagen junto con el título y la descripción.",
  },
};

// 4. With Button: Título, descripción y botón
export const WithButton = Template.bind({});
WithButton.args = {
  title: "Tarjeta con Botón",
  description: "Esta tarjeta incluye un botón.",
  buttonText: "Acción",
  onClick: action("Botón clicado"),
};
WithButton.storyName = "With Button";
WithButton.parameters = {
  docs: {
    storyDescription: "Tarjeta que incluye un botón con texto personalizable.",
  },
};

// 5. With Image and Button: Todas las propiedades
export const WithImageAndButton = Template.bind({});
WithImageAndButton.args = {
  title: "Tarjeta Completa",
  description: "Esta tarjeta incluye una imagen y un botón.",
  imageUrl: placeholderImage,
  buttonText: "Realizar Acción",
  onClick: action("Botón clicado"),
};
WithImageAndButton.storyName = "With Image and Button";
WithImageAndButton.parameters = {
  docs: {
    storyDescription:
      "Tarjeta que incluye una imagen y un botón con texto personalizado.",
  },
};

// 6. With Icon and Button: Título, descripción, ícono y botón
export const WithIconAndButton = Template.bind({});
WithIconAndButton.args = {
  title: "Tarjeta con Ícono y Botón",
  description: "Esta tarjeta incluye un ícono y un botón.",
  icon: <InfoIcon fontSize="large" color="secondary" />,
  buttonText: "Detalles",
  onClick: action("Botón 'Detalles' clicado"),
};
WithIconAndButton.storyName = "With Icon and Button";
WithIconAndButton.parameters = {
  docs: {
    storyDescription:
      "Tarjeta que incluye un ícono y un botón con texto personalizado.",
  },
};

// 7. Button Variations: Diferentes textos en el botón
export const ButtonVariations = Template.bind({});
ButtonVariations.args = {
  title: "Tarjeta con Variaciones de Botón",
  description: "Esta tarjeta muestra diferentes textos en el botón.",
  buttonText: "Ver Más",
  onClick: action("Botón 'Ver Más' clicado"),
};
ButtonVariations.storyName = "Button Variations";
ButtonVariations.parameters = {
  docs: {
    storyDescription:
      "Tarjeta con un botón que muestra texto diferente según la necesidad.",
  },
};

// 8. Interactive Controls: Permite al usuario manipular las propiedades
export const Interactive = Template.bind({});
Interactive.args = {
  title: "Tarjeta Interactiva",
  description: "Usa los controles para personalizar esta tarjeta.",
  imageUrl: placeholderImage,
  icon: <InfoIcon fontSize="large" color="inherit" />, // Puedes dejar esto opcional
  buttonText: "Click Aquí",
  onClick: action("Botón clicado"),
};
Interactive.storyName = "Interactive Controls";
Interactive.parameters = {
  docs: {
    storyDescription:
      "Tarjeta que permite interactuar con todas sus propiedades mediante controles de Storybook.",
  },
};
