import React from "react";
import { motion } from "framer-motion";
import { POSITION_ATTRIBUTES } from "../main-widget-utils";
import { Close } from "../icons";

interface CostumPlayerProps {
  closePlayer: () => void;
  url: string;
  logoPosition: keyof typeof POSITION_ATTRIBUTES;
  logo: string;
  frameColor: string;
}

const CostumPlayer: React.FC<CostumPlayerProps> = ({
  closePlayer,
  url,
  logoPosition,
  logo,
  frameColor,
}) => {
  console.log(url);
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "relative",
      }}
    >
      <div
        onClick={() => closePlayer()}
        style={{
          position: "absolute",
          padding: "16px",
          borderRadius: "999px",
          backgroundColor: "black",
          right: -16,
          top: -16,
          zIndex: 999,
          cursor: "pointer",
        }}
      >
        <Close />
      </div>
      <div
        style={{
          width: "350px",
          height: "550px",
          border: `5px solid ${frameColor}`,
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <div>
          <img
            alt="logo"
            src={logo}
            style={{
              ...POSITION_ATTRIBUTES[logoPosition],
              width: 50,
              height: 50,
              position: "absolute",
            }}
          />
        </div>
        <video
          style={{
            width: "105%",
            height: "105%",
            objectFit: "cover",
            borderRadius: "15px",
          }}
          autoPlay
          loop
          playsInline
          muted
          src={url}
        />
      </div>
    </motion.div>
  );
};

export default CostumPlayer;
