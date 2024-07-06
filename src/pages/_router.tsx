import { createBrowserRouter, Outlet } from "react-router-dom";
import Error404 from "./404";
import ModuleDetails from "./ModuleDetails";
import Dashboard from "./Dashboard";
import Navbar from "../layout/Navbar";
import { Toaster } from "react-hot-toast";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/module/:id",
        element: <ModuleDetails />,
      },
    ],
  },
]);

function AppWrapper() {
  return (
    <div className="flex flex-col h-svh w-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-5 py-10 relative h-svh overflow-auto">
        <Outlet />
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1E1E1E",
            color: "#fff",
            border: "1px solid #282828",
            paddingRight: "2rem",
            paddingLeft: "2rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          },
          success: {
            iconTheme: {
              primary: "#33D999",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}
