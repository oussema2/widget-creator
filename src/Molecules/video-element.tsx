import { Button } from "@/components/ui/button";
import { Quote } from "@/icons";
import { POSITION_ATTRIBUTES } from "@/lib/constants";
import { AppDispatch } from "@/redux/app/store";
import { initiateCallToAction } from "@/redux/features/widget/widgetSlice";
import { FontType, LogoPosition, Video } from "@/redux/types/widget.types";
import { FC } from "react";
import { useDispatch } from "react-redux";

type VideoElementProps = Video & {
  isSelected: boolean;
  selectVideo: () => void;
  position: LogoPosition;
  logo: string;
  font: FontType;
  frameColor: string;
};

const VideoElement: FC<VideoElementProps> = ({
  callToAction,
  source,
  isSelected,
  selectVideo,
  question,
  quote,
  recorder,
  position,
  logo,
  font,
  frameColor,
  thumbnail,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      onClick={() => selectVideo()}
      style={{ backgroundColor: frameColor || "red" }}
      className={`w-full min-h-[600px] cursor-pointer relative rounded-[16px] px-[12px] py-[24px] ${
        isSelected ? "border-[5px] border-solid border-blue-500" : ""
      }`}
    >
      <div className="my-[24px] relative pl-[16px] overflow-hidden ">
        <div className="absolute left-0 top-0 h-full w-1 bg-[white] rounded-[8px]" />
        <p
          style={{
            fontFamily: font.family,
            fontStyle: font.style,
            fontSize: 26,
          }}
        >
          {" "}
          {question ? question : "Video Question..."}
        </p>
      </div>
      <div className="w-full max-h-[400px] h-[400px] relative">
        {" "}
        <div style={POSITION_ATTRIBUTES[position]} className="absolute ">
          <img width={"50px"} height={"50px"} src={logo} />
        </div>
        <video
          src={source}
          poster={thumbnail}
          className=" rounded-[16px]   w-full object-cover max-h-full h-full"
        />
        {quote && (
          <div className="w-full h-[150px] absolute bottom-[16px] left-0 p-[16px]">
            <div className="w-full h-full flex flex-row items-start ">
              <div className="h-full w-[24px] flex flex-col items-start justify-start">
                <Quote fill="white" size={24} />
              </div>
              <div className="h-full flex flex-row items-center justify-center w-full">
                <p
                  style={{ fontFamily: font.family, fontStyle: font.style }}
                  className="w-full text-center text-white text-[18px] font-semibold"
                >
                  {quote}
                </p>
              </div>
              <div className="h-full w-[24px] flex flex-col items-end justify-end">
                <Quote fill="white" size={24} rotation={180} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full  py-[16px] h-full z-290 flex flex-col items-start justify-between gap-[16px]">
        <div className="w-full gap-[16px] flex flex-col items-start justify-start">
          {" "}
        </div>
        {recorder.name && recorder.job && (
          <div className="w-full flex flex-row items-center justify-start gap-[16px]">
            <div className="rounded-full w-[36px] flex flex-row items-center justify-center h-[36px] border border-solid border-[white]">
              <p
                style={{ fontFamily: font.family, fontStyle: font.style }}
                className="text-white text-[18px] font-semibold"
              >
                {recorder.name[0]}
              </p>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p
                style={{ fontFamily: font.family, fontStyle: font.style }}
                className="text-white text-[16px] font-semibold"
              >
                {recorder.name}
              </p>
              <p
                style={{ fontFamily: font.family, fontStyle: font.style }}
                className="text-white text-[14px] font-normal"
              >
                {recorder.job}
              </p>
            </div>
          </div>
        )}
        {typeof callToAction === "object" && callToAction ? (
          <div className="w-full rounded-[48px] px-[16x] flex flex-row items-center justify-center  bg-[white]">
            {callToAction.title ? (
              <p
                style={{ fontFamily: font.family, fontStyle: font.style }}
                className="text-black"
              >
                {callToAction?.title}
              </p>
            ) : (
              <p
                style={{ fontFamily: font.family, fontStyle: font.style }}
                className="text-gray-500"
              >
                Enter Label
              </p>
            )}
          </div>
        ) : (
          <Button
            onClick={() => dispatch(initiateCallToAction())}
            className="w-full rounded-[48px] px-[16x] text-black bg-[white]"
          >
            + Call to Action
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoElement;
