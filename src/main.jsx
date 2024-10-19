import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Component/Home.jsx";
import VotingUser from "./Component/VotingUser.jsx";
import Dashboard from "./Component/Dashboard/Dashboard.jsx";
import Profile from "./Component/Profile.jsx"
import EditProfile from "./Component/EditProfile.jsx";
import LoginForm from "./Component/LoginForm.jsx";
import HelpSupport from "./Component/HelpSupport.jsx";
import FAQPage from "./Component/FAQPage.jsx";
import AdminDashboard from "./Component/AdminDashboard.jsx";
import RegistrationForm from "./Component/RegistrationForm.jsx";
import VerifyUser from "./Component/VerifyUser.jsx";
import { AuthState } from "./context/AuthState.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "dashboard",
        element: <ProtectedRoute element={<Dashboard />} allowedRoles={['admin', 'voter', 'GUEST']} />,
      },
      {
        path: "voting",
        element: <ProtectedRoute element={<VotingUser />} allowedRoles={['voter']} />,
      },
      {
        path: "profile",
        element: <ProtectedRoute element={<Profile />} allowedRoles={['admin', 'voter']} />,
      },
      {
        path: "editprofile",
        element: <ProtectedRoute element={<EditProfile />} allowedRoles={['admin', 'voter']} />,
      },
      {
        path: "login",
        element: <ProtectedRoute element={<LoginForm />} allowedRoles={['GUEST']} />,
      },
      {
        path: "Sign-up",
        element: <ProtectedRoute element={<RegistrationForm />} allowedRoles={['GUEST']} />,
      },
      {
        path: "verify",
        element: <VerifyUser /> 
      },
      {
        path: "help&support",
        element: <ProtectedRoute element={<HelpSupport />} allowedRoles={['admin', 'voter']} />,
      },
      {
        path: "faqpage",
        element: <ProtectedRoute element={<FAQPage />} allowedRoles={['admin', 'voter', 'GUEST']} />,
      },
      {
        path: "admin",
        element: <ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthState>
    <RouterProvider router={router} />
    {/* <App /> */}
    </AuthState>
  </StrictMode>
);
