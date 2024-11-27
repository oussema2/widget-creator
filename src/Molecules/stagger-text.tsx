import React from "react";
import { motion } from "framer-motion";

interface StaggerTextProps {
  text: string; // The text to animate
  fontSize: string; // Optional: font size
  color?: string; // Optional: text color
  width: number;
  height: number;
}

const StaggerText: React.FC<StaggerTextProps> = ({
  text,
  fontSize,
  color = "black",
  height,
  width,
}) => {
  // Split the text into an array of characters
  const letters = text.split("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.06, // Delay between each letter animation
      },
    },
  };
  const letterVariants = {
    hidden: { display: "none" },
    visible: { display: "block", transition: { duration: 0 } },
  };

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        fontSize,
        width: width,
        height: height,
        color,
        overflow: "hidden", // Prevent overflow during animation
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-start"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ marginRight: letter === " " ? "8px" : "0", color: color }} // Add spacing for spaces
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default StaggerText;
