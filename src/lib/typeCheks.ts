import { CallToAction, Widget } from "@/redux/types/widget.types";

export function isInitialObject(obj: any): obj is Widget {
  return (
    typeof obj.id === "string" &&
    typeof obj.title === "string" &&
    typeof obj.description === "string"
  );
}
export function isCallToAction(obj: any): obj is CallToAction {
  return typeof obj.title === "string" && typeof obj.link === "string";
}
