import { selectSelectedVideo } from "@/redux/features/widget/widgetSelectors";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AliTemplate = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { segments, backgroundColor, color, size } =
    useSelector(selectSelectedVideo).caption;
  useEffect(() => {
    let time = 0;
    let wordTime = 0;
    let timeouts: any[] = [];
    for (let i = 0; i < segments.length; i++) {
      const currPhrase = segments[i];
      time = currPhrase.start;
      const phraseTimer = setTimeout(() => {
        setCurrentPhraseIndex(i);
      }, time);
      timeouts.push(phraseTimer);
      for (let j = 0; j < currPhrase.words.length; j++) {
        const currword = currPhrase.words[j];
        wordTime = currword.start;
        const wordTimer = setTimeout(() => {
          setCurrentWordIndex(j);
        }, wordTime);
        timeouts.push(wordTimer);
      }
    }
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: backgroundColor,
        fontWeight: "bolder",
        fontStyle: "italic",
        fontSize: size[0],
      }}
    >
      {segments.map((phrase, phraseIndex) => (
        <motion.div
          key={phraseIndex}
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentPhraseIndex === phraseIndex ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            position:
              phraseIndex === currentPhraseIndex ? "relative" : "absolute",
            top: 0,
            left: 0,
          }}
          className="text-center"
        >
          {phrase.words.map((word: any, wordIndex: number) => (
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: currentWordIndex >= wordIndex ? 1 : 0.3,
              }}
              transition={{ duration: 0.2 }}
              style={{ marginRight: "5px", color: color }}
            >
              {word.word}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default AliTemplate;
