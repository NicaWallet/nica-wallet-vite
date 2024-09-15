import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* NOT FOUND */}
        <Route path="*" element={<NotFoundPage/>} />

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth module */}
        {/* Login page  */}
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Register page */}
        <Route path="/auth/register" element={<RegisterPage />} /> 
      </Routes>
    </Router>
  );
};

export default AppRoutes;
