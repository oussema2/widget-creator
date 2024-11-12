import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isInitialObject } from "@/lib/typeCheks";
import VideoPickerElement from "@/Molecules/video-picker-element";
import { AppDispatch } from "@/redux/app/store";
import {
  selectInitialWidget,
  selectLoadingError,
} from "@/redux/features/initialwidget/initialwidgetSelectors";
import {
  setDescription,
  setTitle,
} from "@/redux/features/initialwidget/initialwidgetSlice";
import { createInitialWidget } from "@/redux/features/initialwidget/initialwidgetThunks";
import { setInitialWidget } from "@/redux/features/widget/widgetSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const InitiateWidgetForm = () => {
  const initialwidget = useSelector(selectInitialWidget);
  const { loading } = useSelector(selectLoadingError);
  const navigate = useNavigate();
  const [videos, setvideos] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://api.thecliquify.co/api/brand-kit/entity/1/video-voices"
      );
      if (response) {
        console.log(response.data.data);
        setvideos(response.data.data);
      }
    })();
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = () => {
    dispatch(createInitialWidget({ ...initialwidget })).then((result) => {
      if (createInitialWidget.fulfilled.match(result)) {
        if (isInitialObject(result.payload)) {
          setInitialWidget({
            description: result.payload.description,
            _id: result.payload._id,
            title: result.payload.title,
            videos: result.payload.videos,
            brand: {},
            color: "",
            font: { family: "", style: "", url: "" },
            frameColor: "",
            logo: { position: "Top-Left", url: "" },
            position: "Right",
            type: "PopUp",
            callToAction: null,
          });
        }
        // Navigate to a different route after successful API call
        navigate(`/widget/${result.payload._id}/details`); // Change to the desired route
      }
    });
  };
  return (
    <div className="flex flex-col items-start justify-center gap-6">
      <Input
        className="text-white"
        value={initialwidget.title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
        placeholder="Enter Widget Name..."
      />
      <Textarea
        className="text-white"
        value={initialwidget.description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
        placeholder="Enter Widget Description"
      />
      <Dialog>
        <DialogTrigger className="text-white">Choose Videos</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Videos</DialogTitle>
          </DialogHeader>
          {/* <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div> */}
          <div className="w-full flex flex-row items-center justify-start gap-[16px] flex-wrap">
            {videos.map((video) => (
              <VideoPickerElement options={video} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Button onClick={() => handleSubmit()}>
        {loading ? "loading" : "Submit"}
      </Button>
    </div>
  );
};

export default InitiateWidgetForm;
