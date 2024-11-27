import { Slider } from "@/components/ui/slider";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AppDispatch } from "@/redux/app/store";
import {
  selectBrandLoading,
  selectSelectedVideo,
  selectWidget,
} from "@/redux/features/widget/widgetSelectors";
import {
  setVideoCaptionBackgroundColor,
  setVideoCaptionColor,
  setVideoCaptionSize,
  setVideoCaptionTemplate,
} from "@/redux/features/widget/widgetSlice";
import {
  CaptionTemplate,
  CaptionTemplateAttributes,
} from "@/redux/types/widget.types";
import { EditColor } from "@/widget/icons/edit-color";
import { useState } from "react";
//@ts-ignore
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";

const CptionsStyles = () => {
  const caption = useSelector(selectSelectedVideo).caption;
  const brand = useSelector(selectWidget).brand;
  const [displaySketch, setDisplaySketch] = useState(false);
  const [displayBackgroundSketch, setDisplayBackgroundSketch] = useState(false);

  const colorRef = useClickOutside<HTMLDivElement>(() =>
    setDisplaySketch(false)
  );

  const backgroundColorRef = useClickOutside<HTMLDivElement>(() =>
    setDisplayBackgroundSketch(false)
  );
  const brandLoading = useSelector(selectBrandLoading);
  const dispatch = useDispatch<AppDispatch>();
  if (brandLoading) {
    return <p>Loading</p>;
  }
  return (
    <div className="w-full flex flex-col flex-wrap bg-white rounded-sm items-start mb-6 justify-start mt-4 gap-4">
      {/* <AliTemplate /> */}
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <div className="w-full flex flex-row items-center justify-center gap-[16px]">
          {" "}
          <p>Caption Size</p>
          <p>({caption.size[0]})</p>
        </div>
        <Slider
          onValueChange={(v) => dispatch(setVideoCaptionSize(v))}
          defaultValue={caption.size}
          max={100}
          step={1}
        />
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-8 mt-4">
        <div className="flex flex-row w-full items-center justify-start  gap-4">
          <p>Caption Template</p>
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          {Object.entries(CaptionTemplateAttributes).map((item) => (
            <div
              onClick={() =>
                dispatch(setVideoCaptionTemplate(item[0] as CaptionTemplate))
              }
              className={`p-[8px] rounded-sm min-w-[70px] flex flex-row items-center justify-center ${
                item[0] === caption.template
                  ? "border border-solid border-blue-600"
                  : ""
              }`}
            >
              <p>{item[1]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-8 mt-4">
        <div className="flex flex-row w-full items-center justify-start  gap-4">
          <p>Caption color</p>
          <div
            style={{ backgroundColor: caption.color }}
            className="w-[40px] h-[40px] rounded-full shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] "
          ></div>
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          {Object.keys(brand.color).map((key) => (
            <div
              onClick={() => dispatch(setVideoCaptionColor(brand.color[key]))}
              style={{ backgroundColor: brand.color[key] }}
              className="w-[40px] cursor-pointer shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] h-[40px] rounded-sm "
            ></div>
          ))}
          <div className="relative">
            {" "}
            <div
              onClick={() => setDisplaySketch(true)}
              className="w-[40px] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] cursor-pointer h-[40px] rounded-sm flex flex-row items-center justify-center"
            >
              <EditColor />
            </div>
            {displaySketch && (
              <div
                ref={colorRef}
                className="absolute bg-white left-full bottom-0 flex flex-col items-start justify-start"
              >
                <SketchPicker
                  color={caption.color}
                  onChangeComplete={(e: any) =>
                    dispatch(setVideoCaptionColor(e.hex))
                  }
                />
              </div>
            )}
          </div>
          {/* */}
          {/* <ColorPicker
            color={color}
            onChange={(e) => {
              setColor(e);
              dispatch(setVideoCaptionColor(e.hex));
            }}
          /> */}
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-8 mt-4">
        <div className="flex flex-row w-full items-center justify-start  gap-4">
          <p>Caption Background</p>
          <div
            style={{ backgroundColor: caption.backgroundColor }}
            className="w-[40px] h-[40px] rounded-full shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] "
          ></div>
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          {Object.keys(brand.color).map((key) => (
            <div
              onClick={() =>
                dispatch(setVideoCaptionBackgroundColor(brand.color[key]))
              }
              style={{ backgroundColor: brand.color[key] }}
              className="w-[40px] cursor-pointer shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] h-[40px] rounded-sm "
            ></div>
          ))}
          <div className="relative">
            {" "}
            <div
              onClick={() => setDisplayBackgroundSketch(true)}
              className="w-[40px] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] cursor-pointer h-[40px] rounded-sm flex flex-row items-center justify-center"
            >
              <EditColor />
            </div>
            {displayBackgroundSketch && (
              <div
                ref={backgroundColorRef}
                className="absolute bg-white left-full bottom-0 flex flex-col items-start justify-start"
              >
                <SketchPicker
                  color={caption.backgroundColor}
                  onChangeComplete={(e: any) =>
                    dispatch(setVideoCaptionBackgroundColor(e.hex))
                  }
                />
              </div>
            )}
          </div>
          {/* */}
          {/* <ColorPicker
            color={color}
            onChange={(e) => {
              setColor(e);
              dispatch(setVideoCaptionColor(e.hex));
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CptionsStyles;
