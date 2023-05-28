import { createBrowserRouter } from "react-router-dom";
import { Home } from "../components/home/Home";
import { Imc } from "../components/imc/Imc";
import { Paths } from "../utils/paths";
import { Login } from "../components/login/Login";
import { Timer } from "../components/timer/Timer";
import { Stopwatch } from "../components/stopwatch/Stopwatch";
import { FatPercentage } from "../components/fat-percentage/FatPercentage";
import { CaloricExpenditure } from "../components/caloric-expenditure/CaloricExpenditure";
import { Workouts } from "../components/workouts/Workouts";
import { Register } from "../components/register/Register";
import { Workout } from "../components/workouts/Workout";

export const appRoutes = createBrowserRouter([
  {
    path: Paths.HOME,
    element: <Home />,
  },
  {
    path: Paths.REGISTER,
    element: <Register />,
  },
  {
    path: Paths.LOGIN,
    element: <Login />,
  },
  {
    path: Paths.WORKOUTS,
    element: <Workouts />,
  },
  {
    path: Paths.WORKOUT,
    element: <Workout />,
  },
  {
    path: Paths.TIMER,
    element: <Timer />,
  },
  {
    path: Paths.STOPWATCH,
    element: <Stopwatch />,
  },
  {
    path: Paths.IMC,
    element: <Imc />,
  },
  {
    path: Paths.FAT_PERCENTAGE,
    element: <FatPercentage />,
  },
  {
    path: Paths.CALORIC_EXPENDITURE,
    element: <CaloricExpenditure />,
  },
]);