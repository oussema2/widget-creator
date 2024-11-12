import {
  selectVideoIndex,
  selectWidget,
} from "@/redux/features/widget/widgetSelectors";
import { useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/app/store";
import {
  setCallToActionLink,
  setCallToActionTitle,
  setRemoveCallToAction,
  setSelectedVideo,
  setVideoCategory,
  setVideoQuestion,
  setVideoQuote,
  setVideoRecorderJob,
  setVideoRecorderName,
  setWidgetDescription,
  setWidgetTitle,
} from "@/redux/features/widget/widgetSlice";
import { updateWidget } from "@/redux/features/widget/widgetThunks";
import { Button } from "@/components/ui/button";
import { isCallToAction } from "@/lib/typeCheks";
import { useNavigate } from "react-router-dom";
import VideosBreadCurmb from "@/Molecules/videos-breadcrumb";

const Details = () => {
  const data = useSelector(selectWidget);
  const navigate = useNavigate();
  const selectedVideo = useSelector(selectVideoIndex);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="h-full overflow-y-auto w-full p-[32px] ">
      <div className="w-full flex flex-col gap-[32px] items-start justify-start">
        <div className="flex flex-col gap-[16px]  justify-start items-start">
          <Label htmlFor="title">Widget Title</Label>
          <Input
            onChange={(e) => dispatch(setWidgetTitle(e.target.value))}
            type="text"
            name="title"
            className="border-[black]"
            placeholder="Enter widget title"
            value={data.title || ""}
          />
        </div>
        <div className="flex flex-col gap-[16px]  justify-start items-start">
          <Label htmlFor="description">Widget Description</Label>
          <Input
            onChange={(e) => dispatch(setWidgetDescription(e.target.value))}
            type="text"
            name="description"
            className="border-[black]"
            placeholder="Enter widget title"
            value={data.description || ""}
          />
        </div>
      </div>
      {data.callToAction && isCallToAction(data.callToAction) ? (
        <div className="flex flex-col w-full relative items-start justify-start gap-[32px] mt-[16px]">
          <p>Video Call To Action (link)</p>{" "}
          <div className="flex flex-col gap-[16px]  justify-start items-start">
            <Label htmlFor="calltoaction-title">Button Label</Label>
            <Input
              onChange={(e) => dispatch(setCallToActionTitle(e.target.value))}
              type="text"
              name="calltoaction-title"
              className="border-[black]"
              placeholder="Enter video title"
              value={data.callToAction?.title || ""}
            />
          </div>
          <div className="flex flex-col gap-[16px]  justify-start items-start">
            <Label htmlFor="calltoaction-link">Link</Label>
            <Input
              onChange={(e) => dispatch(setCallToActionLink(e.target.value))}
              type="text"
              name="calltoaction-link"
              className="border-[black]"
              placeholder="Enter widget Link"
              value={data.callToAction?.link || ""}
            />
          </div>
          <Button
            className="absolute top-0 right-0"
            onClick={() => dispatch(setRemoveCallToAction())}
          >
            Remove
          </Button>
        </div>
      ) : null}
      <div className="mt-8">
        {selectedVideo > -1 ? (
          <div className="flex w-full flex-col items-start justify-center mt-[48px] gap-[32px]">
            <VideosBreadCurmb videos={data.videos} />
            <div className="flex flex-col items-start justify-start gap-[32px] mt-[12px]">
              <p>Video Recorder Info</p>{" "}
              <div className="flex flex-col gap-[16px]  justify-start items-start">
                <Label htmlFor="video-name">Recorder Name</Label>
                <Input
                  onChange={(e) =>
                    dispatch(setVideoRecorderName(e.target.value))
                  }
                  type="text"
                  name="video-name"
                  className="border-[black]"
                  placeholder="Enter video title"
                  value={data.videos[selectedVideo].recorder.name || ""}
                />
              </div>
              <div className="flex flex-col gap-[16px]  justify-start items-start">
                <Label htmlFor="recorder-post">Recorder Post</Label>
                <Input
                  onChange={(e) =>
                    dispatch(setVideoRecorderJob(e.target.value))
                  }
                  type="text"
                  name="recorder-post"
                  className="border-[black]"
                  placeholder="Enter widget title"
                  value={data.videos[selectedVideo].recorder.job || ""}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[32px] mt-[12px]">
              <p>Video content Information</p>
              <div className="flex flex-col gap-[16px]  justify-start items-start">
                <Label htmlFor="video-category">Category</Label>
                <Input
                  onChange={(e) => dispatch(setVideoCategory(e.target.value))}
                  type="text"
                  name="video-category"
                  className="border-[black]"
                  placeholder="Enter widget title"
                  value={data.videos[selectedVideo].category || ""}
                />
              </div>
              <div className="flex flex-col gap-[16px]  justify-start items-start">
                <Label htmlFor="video-quote">Video Quote</Label>
                <Input
                  onChange={(e) => dispatch(setVideoQuote(e.target.value))}
                  type="text"
                  name="video-quote"
                  className="border-[black]"
                  placeholder="Enter widget title"
                  value={data.videos[selectedVideo].quote || ""}
                />
              </div>
              <div className="flex flex-col gap-[16px]  justify-start items-start">
                <Label htmlFor="video-question">Video Question</Label>
                <Input
                  onChange={(e) => dispatch(setVideoQuestion(e.target.value))}
                  type="text"
                  name="video-question"
                  className="border-[black]"
                  placeholder="Enter widget title"
                  value={data.videos[selectedVideo].question || ""}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-[48px] w-full flex flex-row items-center justify-center">
            <p className="">Choose Video To add Options to it</p>
          </div>
        )}
        <div className="flex flex-row items-center justify-between w-full mt-6">
          <Button
            disabled={selectedVideo === 0}
            onClick={() => dispatch(setSelectedVideo(selectedVideo - 1))}
          >
            Prev
          </Button>
          <Button
            disabled={selectedVideo === data.videos.length - 1}
            onClick={() => dispatch(setSelectedVideo(selectedVideo + 1))}
          >
            Next
          </Button>
        </div>
      </div>
      <Button
        className="mt-4"
        onClick={() => {
          dispatch(updateWidget(data)).then((result) => {
            if (updateWidget.fulfilled.match(result)) {
              navigate(`/widget/${result.payload._id}/appearance`);
            }
          });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Details;
