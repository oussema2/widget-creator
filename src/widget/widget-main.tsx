import store from "@/redux/app/store";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import WidgetEntry from "./Components/Widget";

createRoot(document.getElementById("cliquify-widget")!).render(
  <StrictMode>
    <Provider store={store}>
      <WidgetEntry />
    </Provider>
  </StrictMode>
);
