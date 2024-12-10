import { ReactElement, useEffect, useState } from "react";

import { WidgetType } from "@/redux/types/widget.types";
import axios from "axios";
import WidgetPopUp from "./Containers/widget-popup";
import WidgetStory from "./Containers/widget-story";
import WidgetWithModal from "./Containers/widget-with-modal";
import { useParams } from "react-router-dom";
import { API_URL } from "@/lib/constants";
import WidgetIFrame from "./Containers/WidgetIFrame";
const WidgetEntry = () => {
  // Interface for expected attributes in the <script> tag

  const [widgetData, setwidgetData] = useState<any>();
  const params = useParams();
  console.log("runned wwww ");
  useEffect(() => {
    (async () => {
      const element = document.getElementById("widget-id");

      const attribute = element
        ? element.getAttribute("data-widget-id")
        : params.id;
      const response = await axios.get(`${API_URL}/widgets/${attribute}`);
      if (response.data) {
        setwidgetData(response.data);
      }
    })();
  }, []);

  const Components: Record<WidgetType, ReactElement> = {
    Modal: <WidgetWithModal options={widgetData} />,
    PopUp: <WidgetPopUp options={widgetData} />,
    Story: <WidgetStory options={widgetData} />,
    Iframe: <WidgetIFrame options={widgetData} />,
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
