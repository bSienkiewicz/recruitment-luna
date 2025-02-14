import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { RouterProvider } from "react-router-dom";
import AppProvider from "./layout/SocketProvider.tsx";
import Spinner from "./components/ui/Spinner.tsx";
import { router } from "./pages/_router.tsx";
import { HelmetProvider } from "react-helmet-async";

library.add(fas);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppProvider>
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </AppProvider>
    </HelmetProvider>
  </React.StrictMode>
);
