import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./layout/Navbar.tsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { RouterProvider } from "react-router-dom";
import AppWrapper from "./layout/AppWrapper.tsx";
import Spinner from "./components/Spinner.tsx";
import { router } from "./routes/router.tsx";

library.add(fas);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper>
      <Navbar />
      <div className="flex-1 container mx-auto px-5 py-10 relative h-svh overflow-auto">
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </AppWrapper>
  </React.StrictMode>
);
