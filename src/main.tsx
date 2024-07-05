import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./layout/Navbar.tsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./routes/Dashboard.tsx";
import Error404 from "./404.tsx";

library.add(
  fas
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex flex-col h-svh">
      <Navbar />
      
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
