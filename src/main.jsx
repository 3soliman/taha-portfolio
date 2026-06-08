import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContentProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ContentProvider>
    </BrowserRouter>
  </StrictMode>
);
