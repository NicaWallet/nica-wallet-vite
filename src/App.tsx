import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.css";
import AppRoutes from "./routes/routes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/themes";
import "./i18n";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
