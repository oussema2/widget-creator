import { ReactElement, useEffect, useState } from "react";

import { WidgetType } from "@/redux/types/widget.types";
import axios from "axios";
import WidgetPopUp from "./Containers/widget-popup";
import WidgetStory from "./Containers/widget-story";
import WidgetWithModal from "./Containers/widget-with-modal";
import { useParams } from "react-router-dom";
const WidgetEntry = () => {
  const [widgetData, setwidgetData] = useState<any>();
  const params = useParams();
  useEffect(() => {
    (async () => {
      const element = document.getElementById("widget-id");

      const attribute = element
        ? element.getAttribute("data-widget-id")
        : params.id;
      const response = await axios.get(
        `https://widget-backend.vercel.app/api/widgets/${attribute}`
      );
      if (response.data) {
        setwidgetData(response.data);
      }
    })();
  }, []);

  const Components: Record<WidgetType, ReactElement> = {
    Modal: <WidgetWithModal options={widgetData} />,
    PopUp: <WidgetPopUp options={widgetData} />,
    Story: <WidgetStory options={widgetData} />,
    Iframe: <WidgetStory options={widgetData} />,
  };
  if (!widgetData) {
    return null;
  }
  if (!widgetData && !widgetData.videos) {
    return null;
  }
  if (!Components[widgetData.type as WidgetType]) {
    return null;
  }

  return Components[widgetData.type as WidgetType];
};

export default WidgetEntry;
