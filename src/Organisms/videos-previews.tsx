import { Button } from "@/components/ui/button";
import { areObjectsEqual } from "@/lib/utils";
import VideoElement from "@/Molecules/video-element";
import { AppDispatch } from "@/redux/app/store";
import {
  selectOldData,
  selectVideoIndex,
  selectWidget,
} from "@/redux/features/widget/widgetSelectors";
import { setSelectedVideo } from "@/redux/features/widget/widgetSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
const VideosPreviews = () => {
  const widgetData = useSelector(selectWidget);
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const oldData = useSelector(selectOldData);
  const selectedVideo = useSelector(selectVideoIndex);
  console.log(location.pathname.split("/")[3]);
  if (!widgetData) {
    return <p>Loading</p>;
  }
  return (
    <div className="min-w-[350px] w-[350px] bg-gray-100 border-l-solid border-l border-l-gray-500 h-screen p-[12px]  overflow-y-scroll ">
      <div className="flex flex-col items-center justify-start gap-[16px]">
        {/* {widgetData.videos.map((video, index) => ( */}
        <VideoElement
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
      {location.pathname.split("/")[3] === "publish" && (
        <Link target="_blank" to={`/preview/${params.id}`}>
          <Button
            disabled={!areObjectsEqual(widgetData, oldData)}
            className="mt-4 w-full rounded-full"
          >
            preview
          </Button>
        </Link>
      )}
      {!areObjectsEqual(widgetData, oldData) && (
        <p>Submit Changes to see previw</p>
      )}
    </div>
  );
};

export default VideosPreviews;
