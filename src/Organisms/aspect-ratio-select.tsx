import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Crop, Landscape, Portrait, Square } from "@/icons";
import { AspectRatio, AspectRatioData } from "@/lib/constants";
import { AppDispatch } from "@/redux/app/store";
import { setVideoAspectRatio } from "@/redux/features/widget/widgetSlice";
import { useDispatch } from "react-redux";
export const AspectRatios: AspectRatioData = {
  Crop: {
    aspectRatioTitle: "4:5",
    aspectRatioValue: 4 / 5,
    icon: <Crop />,
    title: "Crop",
  },
  Landscape: {
    aspectRatioTitle: "16:9",
    aspectRatioValue: 16 / 9,
    icon: <Landscape />, // Use the correct React component
    title: "Landscape",
  },
  Portrait: {
    aspectRatioTitle: "9:16",
    aspectRatioValue: 9 / 16,
    icon: <Portrait />, // Use the correct React component
    title: "Portrait",
  },
  Square: {
    aspectRatioTitle: "1:1",
    aspectRatioValue: 1 / 1,
    icon: <Square />, // Use the correct React component
    title: "Square",
  },
};

const AspectRatioSelect = ({ aspectRatio }: { aspectRatio: AspectRatio }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Select
      onValueChange={(v: AspectRatio) => dispatch(setVideoAspectRatio(v))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={aspectRatio} />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(AspectRatios).map((key: string) => (
          <SelectItem value={AspectRatios[key as AspectRatio].title}>
            <div className="flex flex-row items-center justify-start ">
              {" "}
              <div className="min-w-[40px]">
                {" "}
                {AspectRatios[key as AspectRatio].icon}{" "}
              </div>
              <p>{AspectRatios[key as AspectRatio].aspectRatioTitle}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AspectRatioSelect;
