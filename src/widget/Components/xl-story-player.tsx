import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "../icons/arrows";
const XlStoryPlayer = ({
  closeModal,
  currentIndex,
  setCurrentIndex,
  handleNext,
  handlePrev,
  videos,
}: {
  closeModal: () => void;
  currentIndex: number;
  setCurrentIndex: (v: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
  videos: any[];
}) => {
  const [videoWidth, setvideoWidth] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const firstRender = useRef(true);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setHasMounted(true), 1000);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
  });

  useEffect(() => {
    if (videoRefs.current && videoRefs.current[0]) {
      setvideoWidth(videoRefs.current[0].offsetWidth);
    }
  }, []);
  useEffect(() => {
    // Play the current video when the index changes
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.play();
    }

    // Pause all other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
        video.currentTime = 0; // Reset video time
      }
    });
  }, [currentIndex]);
  return (
    <div
      onClick={() => closeModal()}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "80",
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
          borderRadius: 999999,
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
          borderRadius: 999999,
          backgroundColor: "white",
        }}
      >
        <Arrow rotation={180} />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          position: "relative",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "64px",
            position: "absolute",
            top: "calc(50% - 325px)",
            // left: "calc(50% - 175px)",
          }}
          // initial={{ x: window.innerWidth / 2 - videoWidth / 2 }}
          animate={{
            x:
              window.innerWidth / 2 -
              videoWidth / 2 -
              currentIndex * videoWidth,
          }}
          transition={{
            stiffness: 100,
            duration: hasMounted ? 1 : 0,
          }}
        >
          {videos.map((video, index) => (
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              style={{
                width: "350px",
                height: "650px",
                minWidth: "350px",
                maxWidth: "350px",
                position: "relative",
                borderRadius: "16px",
              }}
              initial={{ scale: currentIndex === index ? 1.2 : 1 }}
              animate={{
                scale: currentIndex === index ? 1.2 : 1, // Scale animation
              }}
              transition={{ stiffness: 100, duration: 1 }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "32px",
                  top: 32,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "16px",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "normal",
                    lineHeight: "20px",
                  }}
                >
                  {video.recorder.name}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    lineHeight: "14px",
                  }}
                >
                  {video.recorder.job}
                </p>
              </div>
              {currentIndex !== index && (
                <div
                  style={{
                    borderRadius: "16px",

                    position: "absolute",
                    width: "350px",
                    height: "650px",
                    minWidth: "350px",
                    maxWidth: "350px",
                    top: "0",
                    left: "0",
                    zIndex: 9999,
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                ></div>
              )}
              <video
                onEnded={handleNext} // Trigger next video when this one ends
                ref={(el) => {
                  if (el) {
                    videoRefs.current[index] = el;
                  }
                }} // Store the video reference
                src={video.source}
                key={index}
                playsInline
                style={{
                  borderRadius: "16px",

                  width: "350px",
                  height: "650px",
                  minWidth: "350px",
                  maxWidth: "350px",
                  objectFit: "cover",
                }}
              ></video>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default XlStoryPlayer;
