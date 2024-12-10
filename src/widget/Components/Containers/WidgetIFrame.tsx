import { Quote } from "@/icons";
import { getAspectRatioDimensions, getPositionAttribute } from "@/lib/utils";
import AliTemplate from "@/Organisms/captions-templates/ali-template";
import MaltaTemplate from "@/Organisms/captions-templates/malta-template";
import UmiTemplate from "@/Organisms/captions-templates/umi-template";
import { useState } from "react";

const WidgetIFrame = ({ options }: { options: any }) => {
  //   const [isCostumePlayerShowed, setIsCostumePlayerShowed] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  console.log(options);
  const video = options.videos[0];
  return (
    <div
      style={{
        backgroundColor: options.frameColor || "red",
        width: `${options.dimensions.width}px`,
        height: `${options.dimensions.height}px`,
      }}
      className={`w-[350px] flex flex-col items-center justify-center cursor-pointer relative rounded-[16px] px-[12px] py-[24px] `}
    >
      <style>
        {`
        video::cue {
          font-size: ${video.caption.size}px;
          color: ${video.caption.color};
          background: ${video.caption.backgroundColor};
          padding: 5px;
          border-radius: 5px;
        }
      `}
      </style>
      <div className="my-[24px] flex-[0.15] relative pl-[16px] overflow-hidden ">
        <div className="absolute left-0 top-0 h-full w-1 bg-[white] rounded-[8px]" />
        <p
          style={{
            fontFamily: options.font.family,
            fontStyle: options.font.style,
            fontSize: 26,
          }}
        >
          {" "}
          {video.question ? video.question : "Video Question..."}
        </p>
      </div>
      <div className="w-full overflow-hidden  flex-[0.75]  relative flex flex-row items-center justify-center">
        {" "}
        <div
          style={{
            ...getAspectRatioDimensions(options.aspectRatio),
            // height: `${options.dimensions.height / 2}px`,
          }}
          className="relative rounded-[16px] h-full   w-full  aspect-[9/16]  overflow-hidden bg-black"
        >
          {video.caption && video.caption.url && isVideoPlaying && (
            // <track
            //   ref={trackRef}
            //   src={UPLOAD_URL + video.caption.url}
            //   kind="subtitles"
            //   srcLang="en"
            //   label="English"
            //   default
            // />
            <div className="absolute bottom-24 left-0 w-full z-[100]">
              {video.caption.template === "ALI" && <AliTemplate />}
              {video.caption.template === "UMI" && <UmiTemplate />}
              {video.caption.template === "MALTA" && <MaltaTemplate />}
            </div>
          )}
          <video
            crossOrigin="anonymous"
            src={`${video.source}`}
            controls
            onPlay={() => setIsVideoPlaying(true)}
            onEnded={() => setIsVideoPlaying(false)}
            style={{
              objectPosition: `${video.videoPosition}% ${video.videoPosition}%`,
            }}
            className=" rounded-[16px] h-full object-cover w-full  "
          >
            Your browser does not support the video tag.
          </video>
        </div>
        {video.quote && (
          <div className="w-full absolute bottom-[15%] left-0 p-[16px]">
            <div className="w-full h-full flex flex-row items-start ">
              <div className="h-full w-[24px] flex flex-col items-start justify-start">
                <Quote fill="white" size={24} />
              </div>
              <div className="h-full flex flex-row items-center justify-center w-full">
                <p
                  style={{
                    fontFamily: options.font.family,
                    fontStyle: options.font.style,
                  }}
                  className="w-full text-center text-white text-[18px] font-semibold"
                >
                  {video.quote}
                </p>
              </div>
              <div className="h-full w-[24px] flex flex-col items-end justify-end">
                <Quote fill="white" size={24} rotation={180} />
              </div>
            </div>
          </div>
        )}
        <div
          style={{ ...getPositionAttribute(options.logo.position) }}
          className="absolute "
        >
          <img width={"50px"} height={"50px"} src={options.logo.url} />
        </div>
      </div>
      <div className="w-full  flex-[0.1]  py-[16px] z-290 flex flex-col items-start justify-between gap-[16px]">
        {video.recorder.name && video.recorder.job && (
          <div className="w-full flex flex-row items-center justify-start gap-[16px]">
            <div className="rounded-full w-[36px] flex flex-row items-center justify-center h-[36px] border border-solid border-[white]">
              <p
                style={{
                  fontFamily: options.font.family,
                  fontStyle: options.font.style,
                }}
                className="text-white text-[18px] font-semibold"
              >
                {video.recorder.name[0]}
              </p>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p
                style={{
                  fontFamily: options.font.family,
                  fontStyle: options.font.style,
                }}
                className="text-white text-[16px] font-semibold"
              >
                {video.recorder.name}
              </p>
              <p
                style={{
                  fontFamily: options.font.family,
                  fontStyle: options.font.style,
                }}
                className="text-white text-[14px] font-normal"
              >
                {video.recorder.job}
              </p>
            </div>
          </div>
        )}
        {typeof options.callToAction === "object" && options.callToAction ? (
          <div className="w-full rounded-[48px] px-[16x] flex flex-row items-center justify-center  bg-[white]">
            {options.callToAction.title ? (
              <p
                style={{
                  fontFamily: options.font.family,
                  fontStyle: options.font.style,
                }}
                className="text-black"
              >
                {options.callToAction?.title}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WidgetIFrame;
