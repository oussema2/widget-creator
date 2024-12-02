// Ensure this is an ES module (if using `type="module"` in the script tag)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WidgetEntry from "./Components/Widget";

// Interface for expected attributes in the <script> tag
interface WidgetAttributes {
  widgetId?: string;
  theme?: string;
}

// Function to safely get attributes from the script tag
const getWidgetAttributes = (script: HTMLScriptElement): WidgetAttributes => {
  return {
    widgetId: script.getAttribute("data-widget-id") || undefined,
    theme: script.getAttribute("data-theme") || "light", // Default to 'light' theme
  };
};

// Main function to initialize the widget
const initializeWidget = (): void => {
  const scriptTag = document.getElementById(
    "widget-id"
  ) as HTMLScriptElement | null;

  if (!scriptTag) {
    console.error('Widget script tag with ID "widget-id" not found.');
    return;
  }

  const { widgetId, theme } = getWidgetAttributes(scriptTag);

  const rootElementId = "root"; // Target div ID
  const rootElement = document.getElementById(rootElementId);

  if (!rootElement) {
    console.error(`Root element with ID "${rootElementId}" not found.`);
    return;
  }

  if (!widgetId) {
    console.error(
      'Widget ID is not provided in the "data-widget-id" attribute.'
    );
    return;
  }

  // Render the widget content
  rootElement.innerHTML = `
    <div style="padding: 20px; border: 1px solid #ddd; background-color: ${
      theme === "dark" ? "#333" : "#fff"
    }; color: ${theme === "dark" ? "#fff" : "#000"};">
      <h3>Widget Loaded</h3>
      <p>Widget ID: ${widgetId}</p>
      <p>Theme: ${theme}</p>
    </div>
  `;
};

// Initialize the widget on script load
initializeWidget();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WidgetEntry />
  </StrictMode>
);
