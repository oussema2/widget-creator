import { Button } from "@/components/ui/button";
import { displayMillisecond } from "@/lib/utils";
import { AppDispatch } from "@/redux/app/store";
import {
  selectCaptionState,
  selectSelectedVideo,
  selectVideoIndex,
  selectWidget,
} from "@/redux/features/widget/widgetSelectors";
import {
  fetchCaptions,
  fetchProgress,
  generateCaption,
} from "@/redux/features/widget/widgetThunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CptionsStyles from "../caption-styles";

const VideoCaption = () => {
  const { isGenerationEnd, loading, progress, isGenerating } =
    useSelector(selectCaptionState);
  const dispatch = useDispatch<AppDispatch>();
  const selectedVideo = useSelector(selectVideoIndex);
  const video = useSelector(selectSelectedVideo);
  const widget = useSelector(selectWidget);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (video.caption && video.caption.id && isGenerating) {
      intervalId = setInterval(() => {
        dispatch(fetchProgress({ captionId: video.caption.id }));
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [video.caption, dispatch, isGenerating]);

  useEffect(() => {
    if (isGenerationEnd && video.caption.id) {
      dispatch(
        fetchCaptions({
          caption: video.caption,
          videoId: video.id,
        })
      );
    }
  }, [isGenerationEnd, dispatch]);

  const handleGenerateCaption = () => {
    dispatch(
      generateCaption({
        videoUrl: widget.videos[selectedVideo].source,
      })
    );
  };
  return (
    <div className="w-full min-h-[500px] flex flex-col items-center justify-start">
      {video.caption && video.caption.segments && video.caption.segments ? (
        <div>
          <CptionsStyles />
          <div className="w-full h-full flex gap-[16px] flex-col items-start justify-start">
            {video.caption.segments.map((segment: any) => (
              <div className="w-full flex-col gap-4 py-[10px] px-[16px] flex items-start justify-start bg-blue-100 rounded-md ">
                <div className="px-[8px] py-[4px] rounded-3xl bg-blue-300 flex flex-row items-center justify-center gap-2">
                  <p className="text-[12px] font-medium">
                    {" "}
                    {displayMillisecond(segment.start)}
                  </p>{" "}
                  -{" "}
                  <p className="text-[12px] font-medium">
                    {" "}
                    {displayMillisecond(segment.start)}
                  </p>
                </div>
                <div>
                  {" "}
                  <p className="text-[16px]">{segment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Button disabled={loading} onClick={() => handleGenerateCaption()}>
          {loading ? `loading ${progress}%` : "Generate Caption"}
        </Button>
      )}
    </div>
  );
};

export default VideoCaption;
