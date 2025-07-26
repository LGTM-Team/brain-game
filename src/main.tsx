import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { AuthProvider } from "./contexts/AuthContext"; // ← 경로 확인 필요

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>
);