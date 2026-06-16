import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import "./index.css";
import { AppInitializer } from "./components/auth/AppInitializer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppInitializer>
    <RouterProvider router={router} />
    </AppInitializer>
  </StrictMode>,
);
