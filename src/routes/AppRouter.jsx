import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import PublicRoute from "./PublicRoute";
import Home from "../pages/Home/Home";
import NotFound from "../components/NotFound";
import MainLayout from "../components/MainLayout";
import Error from "../components/Error";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/StudentDashboard/Dashboard";
import AdminDashboard from "../pages/AdminDashboard/Dashboard";
import TutorDashboard from "../pages/TutorDashboard/TutorDashboard.JSX";
import BookedSession from "../pages/StudentDashboard/BookedSession";
import ViewBookedSession from "../pages/StudentDashboard/BookedSession";
import CreateNote from "../pages/StudentDashboard/CreateNote";
import ManageNotes from "../pages/StudentDashboard/ManageNotes";
import ViewAllMaterials from "../pages/StudentDashboard/ViewAllMaterials";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import ManageSessions from "../pages/AdminDashboard/ManageSessions";
import ManageMaterials from "../pages/AdminDashboard/ManageMaterials";
import CreateStudySession from "../pages/TutorDashboard/CreateStudySession";
import ViewAllStudySessions from "../pages/TutorDashboard/ViewAllStudySessions";
import UploadMaterials from "../pages/TutorDashboard/UploadMaterials";
import AllMaterialsPage from "../pages/TutorDashboard/AllMaterialsPage";
import LoginHistory from "../components/LoginHistory";
import Announce from "../pages/AdminDashboard/Announce";
import SessionDetails from "../components/SessionDetails";
import Payment from "../pages/Payment/Payment";
import BookedSessionDetails from "../pages/StudentDashboard/BookedSessionDetails";
import Announcements from "../components/Announcements";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QiuyPJz3G5zjZ10NaXwIaVaMthWdOdVQiQT0vFewJtqthgUyHVcUEuOe8w1kkApvV3tPicL7x7uR64X349fat0600XuL0ToRY"
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },

      // Public Routes
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/announcements",
        element: (
          <PublicRoute>
            <Announcements />
          </PublicRoute>
        ),
      },

      // Private Routes with Rolebased Access
      {
        path: "/session-details/:id",
        element: (
          <PrivateRoute>
            <SessionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/view-booked-session/:id",
        element: (
          <PrivateRoute>
            <BookedSessionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <RoleBasedRoute allowedRoles={["admin", "tutor", "student"]} />
          </PrivateRoute>
        ),
        children: [
          {
            path: "admin",
            element: <AdminDashboard />,
            children: [
              {
                path: "/dashboard/admin",
                element: <ManageUsers />,
              },
              {
                path: "manage-sessions",
                element: <ManageSessions />,
              },
              {
                path: "manage-materials",
                element: <ManageMaterials />,
              },
              {
                path: "login-history",
                element: <LoginHistory />,
              },
              {
                path: "announce",
                element: <Announce />,
              },
            ],
          },
          {
            path: "tutor",
            element: <TutorDashboard />,
            children: [
              {
                path: "/dashboard/tutor",
                element: <CreateStudySession />,
              },
              {
                path: "view-sessions",
                element: <ViewAllStudySessions />,
              },
              {
                path: "upload-materials",
                element: <UploadMaterials />,
              },
              {
                path: "view-materials",
                element: <AllMaterialsPage />,
              },
              {
                path: "login-history",
                element: <LoginHistory />,
              },
            ],
          },
          {
            path: "student",
            element: <Dashboard />,
            children: [
              {
                path: "/dashboard/student",
                element: <ViewBookedSession />,
              },
              {
                path: "create-note",
                element: <CreateNote />,
              },
              {
                path: "manage-notes",
                element: <ManageNotes />,
              },
              {
                path: "view-materials",
                element: <ViewAllMaterials />,
              },
              {
                path: "login-history",
                element: <LoginHistory />,
              },
            ],
          },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
