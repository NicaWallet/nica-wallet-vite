import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../pages/DashboardLayout";
import WelcomePage from "../pages/WelcomePage";

/**
 * AppRoutes component defines the main routing structure for the application.
 * It uses React Router to map different paths to their respective components.
 *
 * Routes:
 * - `*`: Renders the `NotFoundPage` for any undefined routes.
 * - `/`: Renders the `LandingPage`.
 * - `/auth/login`: Renders the `Login` component.
 * - `/auth/register`: Renders the `Register` component.
 * - `/welcome`: Renders the `WelcomePage` within the `DashboardLayout`.
 *
 * Note: Additional routes for the dashboard module are commented out and can be enabled as needed.
 *
 * @returns {JSX.Element} The routing structure of the application.
 */
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* NOT FOUND */}
        <Route path="*" element={<NotFoundPage />} />

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth module */}
        {/* Login page */}
        <Route path="/auth/login" element={<Login />} />

        {/* Register page */}
        <Route path="/auth/register" element={<Register />} />

        {/* Dashboard module (rutas privadas) */}
        <Route element={<DashboardLayout />}>
          {/* Welcome page */}
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Dashboard page */}
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          {/* <Route path="/transactions" element={<TransactionsPage />} /> */}
          {/* <Route path="/accounts" element={<AccountsPage />} /> */}
          {/* <Route path="/reports" element={<ReportsPage />} /> */}
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
