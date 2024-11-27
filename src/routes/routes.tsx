import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../pages/DashboardLayout";
import WelcomePage from "../pages/WelcomePage";
import { AdminPanel } from "../pages/AdminPanel";
import PasswordRecovery from "../pages/PasswordRecovery";
import { UsersPage } from "../pages/UsersPage";
import { RolesPage } from "../pages/RolesPage";
import { BudgetPage } from "../pages/BudgetPage";
import { GoalsPage } from "../pages/GoalsPage";
import { TransactionsPage } from "../pages/TransactionsPage";
import { InvestmentsPage } from "../pages/InvestmentsPage";
import { BillsPage } from "../pages/BillsPage";
import { ProfilePage } from "../pages/ProfilePage";
import PasswordReset from "../pages/PasswordReset";
import { TransactionHistoryPage } from "../pages/TransactionHistoryPage";
import { ClassificationPage } from "../pages/ClassificationPage";
import { SubcategoryPage } from "../pages/SubcategoryPage";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthRoute from "../components/AuthRoute";
import { ChangePassword } from "../pages/ChangePassword";
import { ProfileEdit } from "../pages/ProfileEdit";
import { CategoryPage } from "../pages/CategoriesPage";
import DashboardPage from "../pages/DashboardPage";
import SettingsPage from "../pages/SettingsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/password-recovery" element={<PasswordRecovery />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Rutas protegidas */}
        <Route element={<AuthRoute />}>
          <Route element={<DashboardLayout />}>
            {/* Rutas de bienvenida y dashboard */}
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Rutas financieras */}
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/transactions-overview" element={<TransactionsPage />} />
            <Route path="/transactions-categories" element={<CategoryPage />} />
            <Route path="/transactions-sub-categories" element={<SubcategoryPage />} />
            <Route path="/transactions-classification" element={<ClassificationPage />} />
            <Route path="/transactions-history" element={<TransactionHistoryPage />} />
            <Route path="/investments" element={<InvestmentsPage />} />
            <Route path="/bills" element={<BillsPage />} />

            {/* Rutas analíticas */}
            <Route path="/statistics" element={<div>Statistics</div>} />
            <Route path="/trends" element={<div>Trends</div>} />

            {/* Soporte */}
            <Route path="/support" element={<div>Support</div>} />

            {/* Configuración */}
            <Route path="/settings" element={<SettingsPage />} />

            {/* Seguridad */}
            <Route path="/security" element={<div>Security</div>} />

            {/* Perfil */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/profile/change-password" element={<ChangePassword />} />

            {/* Admin Panel protegido */}
            <Route path="/admin-panel" element={<ProtectedRoute allowedRoles={["Admin"]} />}>
              <Route index element={<AdminPanel />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="roles" element={<RolesPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
