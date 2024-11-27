import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppDispatch } from "@/redux/app/store";
import { selectVideoIndex } from "@/redux/features/widget/widgetSelectors";
import { setSelectedVideo } from "@/redux/features/widget/widgetSlice";
import { Video } from "@/redux/types/widget.types";

import { useDispatch, useSelector } from "react-redux";

const VideosBreadCurmb = ({ videos }: { videos: Video[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedVideo = useSelector(selectVideoIndex);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {videos.map((_: Video, index: number) => (
          <div key={index} className="flex flex-row items-center justify-start">
            <BreadcrumbItem
              className="cursor-pointer"
              onClick={() => dispatch(setSelectedVideo(index))}
            >
              <BreadcrumbLink
                className={`${
                  index === selectedVideo
                    ? "text-[black] font-medium"
                    : "text-gray font-normal"
                }`}
              >
                Video {index + 1}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < videos.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default VideosBreadCurmb;
