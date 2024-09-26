import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import DashboardLayout from "../pages/DashboardLayout";

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
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Register page */}
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* Dashboard module (rutas privadas) */}
        <Route element={<DashboardLayout />}>
          {/* Welcome page */}
          <Route path="/welcome" element={<>
          <h1>
            Hola esta es la pagina de bienvenida</h1></>} />

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
