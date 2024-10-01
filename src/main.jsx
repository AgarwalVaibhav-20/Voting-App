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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/home", element: <Home /> },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "voting",
        element: <VotingUser />,
      },
      {
        path:"profile",
        element:<Profile/>
      },
      {
        path:"editprofile",
        element:<EditProfile/>
      },
      {
        path:"login",
        element:<LoginForm/>
      },
      {
        path:"help&support",
        element:<HelpSupport/>
      }
      ,{
        path:"faqpage",
        element:<FAQPage/>
      }
      ,{
        path:"admin",
        element:<AdminDashboard/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
