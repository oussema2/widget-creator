import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { AppDispatch } from "@/redux/app/store";
import {
  selectBrandLoading,
  selectWidget,
} from "@/redux/features/widget/widgetSelectors";
import {
  setFont,
  setFrameColor,
  setLogo,
  setLogoPosittion,
} from "@/redux/features/widget/widgetSlice";
import { updateWidget } from "@/redux/features/widget/widgetThunks";
import { logoPositions } from "@/redux/types/widget.types";

import { SelectGroup, SelectValue } from "@radix-ui/react-select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Appearance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const widget = useSelector(selectWidget);
  const navigate = useNavigate();
  const brandLoading = useSelector(selectBrandLoading);

  if (brandLoading) {
    return <p>Loading</p>;
  }
  return (
    <div className="w-full h-screen overflow-y-auto flex flex-col items-start justify-start p-[32px] gap-[48px] ">
      <div className="flex flex-col  h-full items-start justify-start gap-[24px]">
        <p>Logo Options</p>
        <div className="flex flex-col items-stare justify-start gap-[16px]">
          <p>Choose Logo</p>
          <div className="flex flex-row items-center flex-wrap justify-start gap-[16px] ">
            {widget.brand.logo &&
              widget.brand.logo.map((el: any, index: number) => (
                <div
                  key={index}
                  className={`cursor-pointer ${
                    widget.logo.url === el.image
                      ? "border-[blue] border-solid border-[3px]"
                      : ""
                  }`}
                  onClick={() => dispatch(setLogo(el.image))}
                >
                  {" "}
                  <img
                    className="w-[60px] h-[60px] pointer-events-none"
                    src={el.image}
                    key={index}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-stare justify-start gap-[16px]">
          <p>Position</p>
          <div className="flex flex-row items-center flex-wrap justify-start gap-[16px] ">
            {" "}
            {logoPositions.map((entry) => (
              <div
                style={{ boxSizing: "border-box" }}
                onClick={() => dispatch(setLogoPosittion(entry.value))}
                className={`${
                  entry.value === widget.logo.position
                    ? "border-[blue] border-solid border-[3px]"
                    : ""
                } bg-[#e2dfd8] cursor-pointer  px-[16px] w-auto py-[8px]  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-[6px]`}
                key={entry.value}
              >
                <p className="w-full">{entry.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-[24px]">
        <p>Typography</p>
        <div className="flex flex-col items-stare justify-start gap-[16px]">
          <p>Font</p>
          <div className="flex flex-row items-center flex-wrap justify-start gap-[16px] ">
            {widget.brand.fonts ? (
              <Select
                onValueChange={(e) => {
                  const [font] = widget.brand.fonts.filter(
                    (font: any) => font.family === e
                  );
                  dispatch(
                    setFont({
                      family: font.family,
                      style: font.style,
                      url: font.file,
                    })
                  );
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectLabel>Choose Font</SelectLabel>
                    {widget.brand.fonts.map((font: any, index: number) => (
                      <SelectItem
                        key={index}
                        style={{ fontFamily: font.family }}
                        value={font.family}
                      >
                        {font.family}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-[24px]">
        <p>Brand Color</p>
        <div className="flex flex-col items-stare justify-start gap-[16px]">
          <div className="flex flex-row items-center flex-wrap justify-start gap-[16px] ">
            {widget.brand.color &&
              Object.entries(widget.brand.color).map(
                (el: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`cursor-pointer ${
                        widget.frameColor === el.image
                          ? "border-[blue] border-solid border-[3px]"
                          : ""
                      }`}
                      onClick={() => dispatch(setFrameColor(el[1]))}
                    >
                      <div
                        style={{ backgroundColor: el[1] }}
                        className="w-[50px] h-[50px]"
                      />
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          dispatch(updateWidget(widget)).then((result) => {
            if (updateWidget.fulfilled.match(result)) {
              navigate(`/widget/${result.payload.id}/publish`);
            }
          });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Appearance;
