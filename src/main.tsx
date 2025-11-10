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
import Trim from "./Pages/trim.tsx";
import Publish from "./Pages/widget/Pages/publish.tsx";
import WidgetEntry from "./widget/Components/Widget.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Create />,
  },
  {
    path: "/trim/:id",
    element: <Trim />,
  },
  {
    path: "/preview/:id",
    element: <WidgetEntry />,
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
console.log("entry project");
const root = document.getElementById("root");
if (root && root.getAttribute("data-entry-type") === "Dashboard") {
  console.log("entered 111");
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
} else if (root && root.getAttribute("data-entry-type") === "Widget") {
  console.log("entered 222332");

  createRoot(root).render(
    <StrictMode>
      <WidgetEntry />
    </StrictMode>
  );
}

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <WidgetEntry />
//   </StrictMode>
// );
