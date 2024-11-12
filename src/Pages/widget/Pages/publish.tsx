import { Button } from "@/components/ui/button";
import { WIDGET_POSTITIONS_ATTRIBUTES, WIDGET_TYPE } from "@/lib/constants";
import { AppDispatch } from "@/redux/app/store";
import {
  selectScriptDisplayed,
  selectWidget,
} from "@/redux/features/widget/widgetSelectors";
import {
  setWidgetLayout,
  setWidgetPosition,
  showScript,
} from "@/redux/features/widget/widgetSlice";
import { updateWidget } from "@/redux/features/widget/widgetThunks";
import { WidgetPosition, WidgetType } from "@/redux/types/widget.types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Publish = () => {
  const widget = useSelector(selectWidget);
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const scripDisplayed = useSelector(selectScriptDisplayed);
  const navigate = useNavigate();
  return (
    <div className="w-full p-[32px]">
      <div className="w-full flex flex-col items-start justify-start gap-[48px]">
        <p>Widget Settings</p>
        <div className=" flex flex-col items-start justify-start gap-[16px]">
          <p>Widget Position</p>
          <div className="flex flex-row items-center flex-wrap justify-start gap-[16px] ">
            {Object.entries(WIDGET_POSTITIONS_ATTRIBUTES).map((position) => (
              <div
                style={{ boxSizing: "border-box" }}
                onClick={() =>
                  dispatch(setWidgetPosition(position[0] as WidgetPosition))
                }
                className={`${
                  position[0] === widget.position
                    ? "border-[blue] border-solid border-[3px]"
                    : ""
                } bg-[#e2dfd8] cursor-pointer  px-[16px] w-auto py-[8px]  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-[6px]`}
                key={position[1]}
              >
                <p className="w-full">{position[0]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex flex-col items-start justify-start gap-[16px]">
          <p>Widget Layout</p>
          <div className="flex flex-row items-center flex-wrap justify-start gap-[16px] ">
            {Object.entries(WIDGET_TYPE).map((type) => (
              <div
                style={{ boxSizing: "border-box" }}
                onClick={() => dispatch(setWidgetLayout(type[0] as WidgetType))}
                className={`${
                  type[0] === widget.type
                    ? "border-[blue] border-solid border-[3px]"
                    : ""
                } bg-[#e2dfd8] cursor-pointer  px-[16px] w-auto py-[8px]  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-[6px]`}
                key={type[1]}
              >
                <p className="w-full">{type[0]}</p>
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={() => {
            dispatch(updateWidget(widget)).then((result) => {
              if (updateWidget.fulfilled.match(result)) {
                navigate(`/widget/${result.payload._id}/publish`);
              }
            });
          }}
        >
          Submit
        </Button>
      </div>
      <div className="w-full mt-[48px] flex flex-col items-start justify-start">
        <Button onClick={() => dispatch(showScript())}>Generate</Button>
      </div>
      {scripDisplayed && (
        <div className="mt-[48px] flex flex-col items-start justify-start gap-5">
          {" "}
          <p>Script to insert in your application </p>
          <p>{` <link
      rel="stylesheet"
      href="https://oussema2.github.io/cliquify-widget/build/static/css/my-widget.css"
    />`}</p>
          <p>{`  <script
      id="widget-id"
      data-widget-id="${params.id}"
      async
      src="https://oussema2.github.io/cliquify-widget/build/static/js/my-widget.js"
    ></script>`}</p>
        </div>
      )}
    </div>
  );
};

export default Publish;
