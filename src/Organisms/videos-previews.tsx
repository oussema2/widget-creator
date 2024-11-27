import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { areObjectsEqual } from "@/lib/utils";
import VideoElement from "@/Molecules/video-element";
import { AppDispatch } from "@/redux/app/store";
import {
  selectOldData,
  selectSelectedVideo,
  selectVideoIndex,
  selectWidget,
} from "@/redux/features/widget/widgetSelectors";
import {
  setSelectedVideo,
  setVideoPosition,
} from "@/redux/features/widget/widgetSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import AspectRatioSelect from "./aspect-ratio-select";
const VideosPreviews = () => {
  const widgetData = useSelector(selectWidget);
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const oldData = useSelector(selectOldData);
  const selectedVideo = useSelector(selectVideoIndex);
  const video = useSelector(selectSelectedVideo);
  if (!widgetData) {
    return <p>Loading</p>;
  }
  return (
    <div className="min-w-[550px] w-[350px] bg-gray-100 border-l-solid border-l border-l-gray-500 h-screen p-[12px]  overflow-y-scroll ">
      <div className="flex flex-col items-center justify-start gap-[16px]">
        {/* {widgetData.videos.map((video, index) => ( */}
        <VideoElement
          selectedVideo={selectedVideo}
          frameColor={widgetData.frameColor}
          font={widgetData.font}
          logo={widgetData.logo.url}
          position={widgetData.logo.position}
          isSelected={true}
          {...widgetData.videos[selectedVideo]}
          callToAction={widgetData.callToAction}
          selectVideo={() => dispatch(setSelectedVideo(selectedVideo))}
          key={selectedVideo}
        />
        {/* ))} */}
      </div>
      <div className="w-full flex flex-row items-center justify-center px-[48px] mt-8">
        {" "}
        <Slider
          onValueChange={(value) => dispatch(setVideoPosition(value))}
          value={[...widgetData.videos[selectedVideo].videoPosition]}
          defaultValue={[...widgetData.videos[selectedVideo].videoPosition]}
          min={0}
          max={100}
          step={1}
        />
      </div>
      <div className="w-full flex flex-row items-center justify-center px-[48px] mt-8">
        <AspectRatioSelect
          aspectRatio={widgetData.videos[selectedVideo].aspectRatio}
        />
      </div>

      {location.pathname.split("/")[3] === "publish" && (
        <div>
          <Link target="_blank" to={`/preview/${params.id}`}>
            <Button
              disabled={!areObjectsEqual(widgetData, oldData)}
              className="mt-4 w-full rounded-full"
            >
              preview
            </Button>
          </Link>

          {!areObjectsEqual(widgetData, oldData) && (
            <p>Submit Changes to see previw</p>
          )}
        </div>
      )}
      <Link to={`/trim/${video.id}`}>
        <Button
          // disabled={!areObjectsEqual(widgetData, oldData)}
          className="mt-4 w-full rounded-full"
        >
          Trim
        </Button>
      </Link>
    </div>
  );
};

export default VideosPreviews;
