import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Error404 from "../404";
import ModuleDetails from "./ModuleDetails/ModuleDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error404 />,
  },
  {
    path: "/module/:id",
    element: <ModuleDetails />,
  },
]);