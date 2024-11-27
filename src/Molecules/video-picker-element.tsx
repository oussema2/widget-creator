import { Checkbox } from "@/components/ui/checkbox";
import { Pause } from "@/icons/pause";
import { PlayCircle } from "@/icons/play-circle";

const VideoPickerElement = ({
  options,
  playVideo,
  pauseVideo,
  isVideoPlaying,
  pushVideo,
  removeVideo,
  isChecked,
}: {
  options: any;
  isChecked: boolean;
  pauseVideo: () => void;
  playVideo: () => void;
  pushVideo: () => void;
  removeVideo: () => void;
  isVideoPlaying: boolean;
}) => {
  return (
    <div className="flex-1 h-auto group rounded-[10px] relative">
      <div className="absolute top-[16px] left-[16px] p-[4px] bg-[white] rounded-sm">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(check) => {
            if (check) {
              pushVideo();
            } else {
              removeVideo();
            }
          }}
        />
      </div>
      <div className="absolute group-hover:block hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {isVideoPlaying ? (
          <div
            onClick={() => {
              pauseVideo();
            }}
          >
            <Pause />
          </div>
        ) : (
          <div onClick={() => playVideo()}>
            <PlayCircle />
          </div>
        )}
      </div>

      {isVideoPlaying ? (
        <video
          onClick={() => pauseVideo()}
          playsInline
          autoPlay
          muted={false}
          src={`${options.video_url}`}
          className="w-full h-full object-cover min-h-[400px] min-w-[200px]"
        />
      ) : (
        <img
          onClick={() => playVideo()}
          src={`${options.thumbnail}`}
          className="w-full h-full object-cover cursor-pointer min-h-[400px] min-w-[250px]"
        />
      )}
    </div>
  );
};

export default VideoPickerElement;
