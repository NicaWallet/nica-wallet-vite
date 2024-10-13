import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppRoutes from "./routes/routes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/themes";
import "./i18n";

/**
 * The main App component that sets up the theme and routes for the application.
 *
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
