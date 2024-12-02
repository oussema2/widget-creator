// Ensure this is an ES module (if using `type="module"` in the script tag)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WidgetEntry from "./Components/Widget";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WidgetEntry />
  </StrictMode>
);
