import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* NOT FOUND */}
        <Route path="*" element={<NotFoundPage/>} />

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTH MODULE */}
        {/* <Route path="/auth/login" element={<></>} /> */}
        {/* <Route path="/auth/register" element={<Register />} /> */}
        {/* <Route path="/auth/forgot-password" element={<ForgotPassword />} /> */}
        {/* <Route path="/auth/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
