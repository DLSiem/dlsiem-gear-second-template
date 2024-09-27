import Counter from "./features/counter/Counter";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout, NotFoundPage } from "./components";

import { Signin, Signup } from "./features/auth";

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
