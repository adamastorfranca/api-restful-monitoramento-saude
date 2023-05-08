import { createBrowserRouter } from "react-router-dom";
import { Home } from "../components/home/Home";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);