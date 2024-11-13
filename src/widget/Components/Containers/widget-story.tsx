import { useState } from "react";
import { SaveSmile } from "../../icons/save-smile";
import MiniStoryPlayer from "../mini-story-player";
import XlStoryPlayer from "../xl-story-player";

const WidgetStory = ({ options }: { options: any }) => {
  const [isCostumePlayerShowed, setIsCostumePlayerShowed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    if (currentIndex !== options.videos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div
      className="widget"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "1000",
      }}
    >
      <div style={{ position: "relative", width: "50px", height: "50px" }}>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "24px",
            height: "24px",
            padding: "16px",
            borderRadius: "9999px",
            backgroundColor: "rgb(0, 51, 255)",
            zIndex: 9999,
          }}
        >
          {" "}
          <SaveSmile />
        </div>
        <div style={{ position: "absolute", bottom: "16px", right: "16px" }}>
          {isCostumePlayerShowed ? (
            <XlStoryPlayer
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              handleNext={handleNext}
              handlePrev={handlePrev}
              videos={options.videos}
              closeModal={() => setIsCostumePlayerShowed(false)}
              key="first"
            />
          ) : (
            <MiniStoryPlayer
              currentIndex={currentIndex}
              handleNext={handleNext}
              handlePrev={handlePrev}
              videos={options.videos}
              key="second"
              setIsCostumePlayerShowed={() => setIsCostumePlayerShowed(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetStory;
