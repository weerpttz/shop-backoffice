import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Loader from "../common/Loader";

const Routes = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <div>555</div>,
    },
    {
      path: "/healthcheck",
      element: <div>Website is online!</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <div></div>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return loading? (<Loader />) : (<RouterProvider router={router} />);
};

export default Routes;