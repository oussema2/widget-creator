import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Create from "./Pages/create.tsx";
import InitiateWidget from "./Pages/initiate-widget.tsx";
import Widget from "./Pages/widget/index.tsx";
import Appearance from "./Pages/widget/Pages/appearance.tsx";
import BrandSettings from "./Pages/widget/Pages/brand-settings.tsx";
import Details from "./Pages/widget/Pages/details.tsx";
import store from "./redux/app/store.ts";
import Publish from "./Pages/widget/Pages/publish.tsx";
import WidgetMain from "./widget/widget-main.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Create />,
  },
  {
    path: "/preview/:id",
    element: <WidgetMain />,
  },
  {
    path: "/initiate",
    element: <InitiateWidget />,
  },
  {
    path: "/widget/:id",
    element: <Widget />,
    children: [
      { path: "appearance", element: <Appearance /> },
      { path: "brand-settings", element: <BrandSettings /> },
      { path: "details", element: <Details /> },
      { path: "publish", element: <Publish /> },
    ],
  },
]);

createRoot(document.getElementById("cliquify-widget")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
