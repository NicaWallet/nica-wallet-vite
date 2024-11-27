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
import { StatisticsPage } from "../pages/StatisticsPage";
import { TrendsPage } from "../pages/TrendsPage";
import { SupportPage } from "../pages/SupportPage";
import { SecurityPage } from "../pages/SecurityPage";

/**
 * AppRoutes component defines the routing structure for the application.
 * It uses React Router to manage both public and protected routes.
 *
 * Public Routes:
 * - "/" - LandingPage
 * - "/auth/login" - Login
 * - "/auth/register" - Register
 * - "/auth/password-recovery" - PasswordRecovery
 * - "/reset-password" - PasswordReset
 * - "*" - NotFoundPage
 *
 * Protected Routes (requires authentication):
 * - "/welcome" - WelcomePage
 * - "/dashboard" - DashboardPage
 * - "/budget" - BudgetPage
 * - "/goals" - GoalsPage
 * - "/transactions-overview" - TransactionsPage
 * - "/transactions-categories" - CategoryPage
 * - "/transactions-sub-categories" - SubcategoryPage
 * - "/transactions-classification" - ClassificationPage
 * - "/transactions-history" - TransactionHistoryPage
 * - "/investments" - InvestmentsPage
 * - "/bills" - BillsPage
 * - "/support" - Support
 * - "/settings" - SettingsPage
 * - "/security" - Security
 * - "/profile" - ProfilePage
 * - "/profile/edit" - ProfileEdit
 * - "/profile/change-password" - ChangePassword
 *
 * Admin Protected Routes (requires Admin role):
 * - "/statistics" - StatisticsPage
 * - "/trends" - Trends
 * - "/admin-panel" - AdminPanel
 *   - "/admin-panel/users" - UsersPage
 *   - "/admin-panel/roles" - RolesPage
 *
 * The component uses nested routes for better organization and role-based access control.
 */
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
            <Route
              path="/transactions-overview"
              element={<TransactionsPage />}
            />
            <Route path="/transactions-categories" element={<CategoryPage />} />
            <Route
              path="/transactions-sub-categories"
              element={<SubcategoryPage />}
            />
            <Route
              path="/transactions-classification"
              element={<ClassificationPage />}
            />
            <Route
              path="/transactions-history"
              element={<TransactionHistoryPage />}
            />
            <Route path="/investments" element={<InvestmentsPage />} />
            <Route path="/bills" element={<BillsPage />} />

            {/* Soporte */}
            <Route path="/support" element={<SupportPage />} />

            {/* Configuración */}
            <Route path="/settings" element={<SettingsPage />} />

            {/* Seguridad */}
            <Route path="/security" element={<SecurityPage/>} />

            {/* Perfil */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route
              path="/profile/change-password"
              element={<ChangePassword />}
            />

            {/* Rutas protegidas con roles de Admin */}
            {[
              { path: "/statistics", element: <StatisticsPage /> },
              { path: "/trends", element: <TrendsPage /> },
              {
                path: "/admin-panel",
                children: [
                  { index: true, element: <AdminPanel /> },
                  { path: "users", element: <UsersPage /> },
                  { path: "roles", element: <RolesPage /> },
                ],
              },
            ].map(({ path, element, children }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute allowedRoles={["Admin"]} />}
              >
                {element && <Route index element={element} />}
                {children?.map(
                  ({ path: childPath, index, element: childElement }) => (
                    <Route
                      key={childPath || "index"}
                      path={childPath}
                      index={index}
                      element={childElement}
                    />
                  )
                )}
              </Route>
            ))}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
