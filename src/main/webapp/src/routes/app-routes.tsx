import { createBrowserRouter } from "react-router-dom";
import { Home } from "../components/home/Home";
import { Imc } from "../components/imc/Imc";
import { Paths } from "../utils/paths";

export const appRoutes = createBrowserRouter([
  {
    path: Paths.HOME,
    element: <Home />,
  },
  {
    path: Paths.IMC,
    element: <Imc />,
  },
]);