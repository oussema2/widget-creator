import { Video } from "@/redux/types/widget.types";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Arrow, Dash } from "../icons";
import { VIDEO_URL } from "@/lib/constants";

const MiniStoryPlayer = ({
  setIsCostumePlayerShowed,
  videos,
  handleNext,
  handlePrev,
  currentIndex,
}: {
  setIsCostumePlayerShowed: () => void;
  videos: Video[];
  handleNext: () => void;
  handlePrev: () => void;
  currentIndex: number;
}) => {
  const [videoWidth, setVideoWidth] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    if (videoRefs.current && videoRefs.current[0]) {
      setVideoWidth(videoRefs.current[0].offsetWidth);
    }
  }, []);

  const handleVideoEnded = () => {
    if (currentIndex < videos.length - 1) {
      handleNext();
    }
  };

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.play();
    }
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex]);

  return (
    <div
      onClick={() => setIsCostumePlayerShowed()}
      style={{
        width: "250px",
        height: "400px",
        border: "5px solid rgb(0, 51, 255)",
        borderRadius: "15px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        style={{
          position: "absolute",
          cursor: "pointer",
          padding: "8px",
          left: 10,
          zIndex: 100,
          top: "50%",
          borderRadius: "50%",
          backgroundColor: "white",
        }}
      >
        <Arrow />
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        style={{
          position: "absolute",
          padding: "8px",
          right: 10,
          zIndex: 100,
          cursor: "pointer",
          top: "50%",
          borderRadius: "50%",
          backgroundColor: "white",
        }}
      >
        <Arrow rotation={180} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "20px",
          backgroundColor: "rgb(0, 51, 255)",
          position: "absolute",
          top: "16px",
          right: "16px",
          borderRadius: "4px",
          zIndex: 90,
        }}
      >
        <Dash />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
          initial={{ x: 0 }}
          animate={{
            x: -currentIndex * videoWidth,
          }}
          transition={{
            stiffness: 100,
            duration: 0.6,
          }}
        >
          {videos.map((src: any, index: number) => (
            <motion.video
              onEnded={handleVideoEnded}
              key={index}
              ref={(el) => {
                if (el) {
                  videoRefs.current[index] = el;
                }
              }}
              src={VIDEO_URL + src.source}
              playsInline
              autoPlay
              muted
              style={{
                width: "110%",
                height: "110%",
                borderRadius: "16px",
                objectFit: "cover",
              }}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: currentIndex === index ? 1 : 0.6 }}
            />
          ))}
        </motion.div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "18px", color: "white", fontWeight: "bold" }}>
          Hello
        </p>
      </div>
    </div>
  );
};

export default MiniStoryPlayer;
