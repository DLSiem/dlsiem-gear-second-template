import Counter from "./features/counter/Counter";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout, NotFoundPage } from "./components";

import { Signin, Signup, ProtectedRoutes } from "./features/auth";
import { Dashboard } from "./features/users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Counter />,
      },
      {
        path: "about",
        element: <div>About</div>,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
      {
        path: "auth",
        children: [
          {
            path: "signin",
            element: <Signin />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
