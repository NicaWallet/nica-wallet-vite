import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// Initialize the React application and render it into the root element
createRoot(document.getElementById("root")!).render(
  // Enable strict mode for highlighting potential problems in the application
  <StrictMode>
    {/* Provide internationalization support to the application */}
    <I18nextProvider i18n={i18n}>
      {/* Render the main application component */}
      <App />
    </I18nextProvider>
  </StrictMode>
);
