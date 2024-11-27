import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppDispatch } from "@/redux/app/store";
import {
  selectVideoIndex,
  selectWidget,
} from "@/redux/features/widget/widgetSelectors";
import {
  setVideoCategory,
  setVideoQuestion,
  setVideoQuote,
  setVideoRecorderJob,
  setVideoRecorderName,
} from "@/redux/features/widget/widgetSlice";
import { useDispatch, useSelector } from "react-redux";

const VideoDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedVideo = useSelector(selectVideoIndex);
  const data = useSelector(selectWidget);
  return (
    <div className="flex flex-col items-start justify-start gap-[32px] mt-[12px]">
      <div className="flex flex-col gap-[16px]  justify-start items-start">
        <Label htmlFor="video-name">Recorder Name</Label>
        <Input
          onChange={(e) => dispatch(setVideoRecorderName(e.target.value))}
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
          onChange={(e) => dispatch(setVideoRecorderJob(e.target.value))}
          type="text"
          name="recorder-post"
          className="border-[black]"
          placeholder="Enter widget title"
          value={data.videos[selectedVideo].recorder.job || ""}
        />
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
  );
};

export default VideoDetails;
