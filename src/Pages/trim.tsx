import api from "@/api";
import { Button } from "@/components/ui/button";
import { UPLOAD_URL } from "@/lib/constants";
import TrimComponent from "@/Organisms/trim-component";
import { Video } from "@/redux/types/widget.types";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
export type ResizableStatePros = {
  width: number;
  left: number;
  duration: number;
  baseDuration: number;
  start: number;
  end: number;
  gap: number;
  secondPerGap: number;
  baseLeft: number;
  currentTime: number;
};

const Trim = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const params = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [resizableState, setResizableState] = useState<ResizableStatePros>({
    width: 0,
    left: 0,
    duration: 10,
    baseDuration: 10,
    end: 10,
    gap: 0,
    start: 0,
    secondPerGap: 5,
    baseLeft: 0,
    currentTime: 0,
  });
  const trackRef = useRef(null);
  useEffect(() => {
    (async () => {
      const response = await api.get(`/videos/${params.id}`);
      if (response) {
        setVideo(response.data);
        const videoData = response.data;
        setResizableState({
          ...resizableState,
          duration: videoData.duration,
          start: videoData.start,
          end: videoData.end,
          baseDuration: videoData.baseDuration,
        });
      }
    })();
  }, []);
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.currentTime = resizableState.currentTime;
  }, [resizableState.currentTime]);

  const handleSaveTrim = async () => {
    const response = await api.put(`/videos/trim/${params.id}`, {
      duration: resizableState.duration,
      end: resizableState.end,
      start: resizableState.start,
    });
    if (response) {
      console.log(response.data);
    }
  };

  if (!video) {
    return <p>Loading !!!!</p>;
  }
  return (
    <div className="w-full max-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-h-[50%] flex flex-row items-center justify-center p-[24px]">
        <video
          ref={videoRef}
          crossOrigin="anonymous"
          src={`${video.source}`}
          controls
          className=" rounded-[16px] max-h-[400px] max-w-[100%] w-full  object-contain   "
        >
          {video.caption && video.caption.url && (
            <track
              ref={trackRef}
              src={UPLOAD_URL + video.caption.url}
              kind="subtitles"
              srcLang="en"
              label="English"
              default
            />
          )}
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="w-full flex-1 flex flex-row items-center justify-center py-[24px] px-[24px]">
        <TrimComponent
          resizableState={resizableState}
          setResizableState={setResizableState}
          video={video}
        />
      </div>

      <div className="flex flex-col items-center justify-start">
        <p>CurrentTime : {resizableState.currentTime.toFixed(1)}</p>
      </div>
      <div className="w-full flex flex-row items-center justify-center">
        <Button onClick={() => handleSaveTrim()}>Save</Button>
      </div>
    </div>
  );
};

export default Trim;
