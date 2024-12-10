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
  dummyVideo,
  pushVideo,
  removeVideo,
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
  const [projects, seTprojects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const navigate = useNavigate();
  const [videos, setvideos] = useState<any[]>([]);
  const [playedVideoIndex, setplayedVideoIndex] = useState(-1);
  // useEffect(() => {
  //   (async () => {
  //     if (!selectedProject) {
  //       return;
  //     }

  //     const response = await axios.get(
  //       `https://api.thecliquify.co/api/video-projects/c4ca4238a0b923820dcc509a6f75849b/8613985ec49eb8f757ae6439e879bb2a`
  //     );
  //     if (response) {
  //       console.log(response.data.data);
  //       setvideos(response.data.data);
  //     }
  //   })();
  // }, [selectedProject]);
  useEffect(() => {
    if (!selectedProject) {
      return;
    }
    const [project] = projects.filter((proj) => proj.id === selectedProject);
    setvideos(project.upload_videos);
  }, [selectedProject]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://api.thecliquify.co/api/video-projects/c4ca4238a0b923820dcc509a6f75849b"
      );
      if (response) {
        console.log(response.data.data);
        seTprojects(response.data.data);
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
            id: result.payload.id,
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
            dimensions: { height: 0, width: 0 },
          });
        }
        // Navigate to a different route after successful API call
        navigate(`/widget/${result.payload.id}/details`); // Change to the desired route
      }
    });
  };
  console.log(initialwidget);
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
        <DialogContent
          className={
            " max-h-[80%] !h-[80%] max-w-[80%] flex flex-col items-start justify-start"
          }
        >
          <DialogHeader className="!h-[60px]">
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
          <div className="flex flex-row items-start justify-start h-[90%] w-full">
            <div className="w-[250px] flex flex-col items-start justify-start overflow-y-auto h-full">
              {projects.map((project, index) => (
                <div
                  onClick={() => setSelectedProject(project.id)}
                  key={index}
                  className={`w-full px-[16px] py-[8px] rounded-md ${
                    selectedProject === project.id ? "bg-[black]" : ""
                  }`}
                >
                  <p
                    className={`${
                      selectedProject === project.id
                        ? "text-[white]"
                        : "text-black"
                    }`}
                  >
                    {project.title}
                  </p>
                </div>
              ))}
            </div>
            {selectedProject ? (
              <div className="w-full overflow-y-auto h-full flex flex-row  px-[16px] items-center justify-start gap-[16px] flex-wrap">
                {videos
                  .filter((vid) => vid.duration > 0)
                  .map((video, index) => (
                    <VideoPickerElement
                      key={index}
                      isChecked={
                        initialwidget.videos.filter(
                          (videoX) => videoX.source === video.video_url
                        ).length > 0
                      }
                      pushVideo={async () =>
                        dispatch(
                          pushVideo({
                            ...dummyVideo,
                            source: video.video_url,
                            thumbnail: video.thumbnail,
                            dimensions: {
                              height: video.height,
                              width: video.width,
                            },
                            start: 0,
                            end: video.duration,
                            duration: video.duration,
                            baseDuration: video.duration,
                            recorder: { job: "", name: "" },
                          })
                        )
                      }
                      removeVideo={() => dispatch(removeVideo(video.video_url))}
                      pauseVideo={() => setplayedVideoIndex(-1)}
                      isVideoPlaying={index === playedVideoIndex}
                      playVideo={() => setplayedVideoIndex(index)}
                      options={video}
                    />
                  ))}
              </div>
            ) : (
              <div className="w-full h-full flex flex-row items-center justify-center">
                <p>Select Project</p>
              </div>
            )}
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
