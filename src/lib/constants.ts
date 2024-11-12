export const API_URL = "https://widget-backend.vercel.app/api";
// export const API_URL = "http://localhost:4444/api";
import {
  LogoPosition,
  WidgetType,
  WidgetPosition,
} from "@/redux/types/widget.types";

export type AbsolutePosition = {
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  top?: number | string;
};

export type PositionAttribute = Record<LogoPosition, AbsolutePosition>;
export type WidgetPositionAttribute = Record<WidgetPosition, string>;
export type WidgetTypeAttribute = Record<WidgetType, string>;

export const POSITION_ATTRIBUTES: PositionAttribute = {
  "Bottom-Center": { bottom: 16, left: "calc(50% - 25px)" },
  "Bottom-Left": { bottom: 16, left: 16 },
  "Bottom-Right": { bottom: 16, right: 16 },
  "Top-Center": { top: 16, left: "calc(50% - 25px)" },
  "Top-Left": { top: 16, left: 16 },
  "Top-Right": { top: 16, right: 16 },
};

export const WIDGET_POSTITIONS_ATTRIBUTES: WidgetPositionAttribute = {
  Left: "left",
  Right: "right",
};

export const WIDGET_TYPE: WidgetTypeAttribute = {
  Iframe: "Iframe",
  Modal: "Modal",
  PopUp: "PopUp",
  Story: "Story",
};

export type IconProps = {
  fill?: string;
  size?: number;
};
