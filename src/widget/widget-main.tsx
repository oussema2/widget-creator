import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WidgetEntry from "./Components/Widget";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WidgetEntry />
  </StrictMode>
);
