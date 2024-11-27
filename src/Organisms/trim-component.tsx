import { findPerfectSecondsPerGap, secondsToTime } from "@/lib/utils";
import { ResizableStatePros } from "@/Pages/trim";
import { Video } from "@/redux/types/widget.types";
import { useEffect, useRef } from "react";

const MIN_GAP_WIDTH = 100;

const TrimComponent = ({
  resizableState,
  setResizableState,
}: {
  video: Video;
  resizableState: ResizableStatePros;
  setResizableState: (v: ResizableStatePros) => void;
}) => {
  const rightResizerRef = useRef<HTMLDivElement | null>(null);
  const leftResizerRef = useRef<HTMLDivElement | null>(null);
  const resizableRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!resizableRef.current) return;
    if (!containerRef.current) return;
    const styles = window.getComputedStyle(resizableRef.current);
    let resizableWidth = parseFloat(styles.width);
    const resizableLeft = parseFloat(styles.left);
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const onMouseMoveLeftResize = (e: MouseEvent) => {
      if (!resizableRef.current) return;
      const x = e.clientX - resizableLeft;
      const newWidth = resizableWidth - x + containerLeft;
      const newLeft = resizableLeft + x - containerLeft;
      if (newLeft < 0 || MIN_GAP_WIDTH >= newWidth) return;
      resizableRef.current.style.width = `${newWidth}px`;
      resizableRef.current.style.left = `${newLeft}px`;
      setResizableState({
        ...resizableState,
        width: newWidth,
        duration: (newWidth / resizableState.gap) * resizableState.secondPerGap,
        left: newLeft,
        start: (newLeft / resizableState.gap) * resizableState.secondPerGap,
      });
    };
    const onMouseMoveRightResize = (e: MouseEvent) => {
      if (!resizableRef.current) return;
      const x = e.clientX - resizableWidth;
      const newWidth = resizableWidth + x - containerLeft - resizableLeft;
      const newEnd =
        resizableState.start +
        (newWidth / resizableState.gap) * resizableState.secondPerGap;

      if (
        newWidth > containerWidth ||
        MIN_GAP_WIDTH >= newWidth ||
        newEnd > resizableState.baseDuration + 0.1
      )
        return;
      resizableRef.current.style.width = `${newWidth}px`;
      setResizableState({ ...resizableState, width: newWidth });
      setResizableState({
        ...resizableState,
        width: newWidth,
        duration: (newWidth / resizableState.gap) * resizableState.secondPerGap,
        end: newEnd,
      });
    };
    const onMouseUpLeftResize = (_: MouseEvent) => {
      if (resizableRef.current) {
        resizableWidth = resizableRef.current.getBoundingClientRect().width;
      }
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };
    const onMouseUpRightResize = (_: MouseEvent) => {
      if (resizableRef.current) {
        resizableWidth = resizableRef.current.getBoundingClientRect().width;
      }
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };
    const onMouseDownLeftResize = (_: MouseEvent) => {
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };
    const onMouseDownRightResize = (_: MouseEvent) => {
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };
    if (leftResizerRef) {
      leftResizerRef.current?.addEventListener(
        "mousedown",
        onMouseDownLeftResize
      );
    }
    if (rightResizerRef) {
      rightResizerRef.current?.addEventListener(
        "mousedown",
        onMouseDownRightResize
      );
    }
  }, [rightResizerRef, resizableState]);
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current?.offsetWidth;

      const perfectSecondsPerGap = findPerfectSecondsPerGap(
        width,
        MIN_GAP_WIDTH,
        resizableState.baseDuration
      );
      setResizableState({
        ...resizableState,
        width: width,
        gap: width / (resizableState.baseDuration / perfectSecondsPerGap),
        baseLeft: containerRef.current.offsetLeft,
        secondPerGap: perfectSecondsPerGap,
      });
    }
  }, [containerRef.current]);
  console.log(resizableState);
  const handleCurrentTimeChange = (e: any) => {
    if (!containerRef.current) {
      return;
    }
    console.log(e.clientX);
    const pos = e.clientX - containerRef.current.offsetLeft;
    const xToGap = pos / resizableState.gap;
    const time = xToGap * resizableState.secondPerGap;
    setResizableState({ ...resizableState, currentTime: time });
  };
  return (
    <div className="w-full">
      <TimeMarker
        secondsPerGap={resizableState.secondPerGap}
        duration={resizableState.baseDuration}
        gap={resizableState.gap}
      />
      <div
        onClick={(e) => handleCurrentTimeChange(e)}
        ref={containerRef}
        style={{ backgroundImage: "url(/sound_wave.jpg)" }}
        className="relative h-[60px] bg-center bg-contain w-full  "
      >
        <div
          style={{
            left:
              resizableState.gap *
              (resizableState.currentTime / resizableState.secondPerGap),
          }}
          className="w-[10px] h-[90%] rounded-md bg-[red] absolute top-[5%]"
        />
        <div
          ref={resizableRef}
          style={{
            width:
              (resizableState.duration / resizableState.secondPerGap) *
              resizableState.gap,
            left:
              resizableState.gap *
              (resizableState.start / resizableState.secondPerGap),
          }}
          className="border-solid rounded-md border-[black] border-[3px] absolute top-0   h-full w-full"
        >
          <div className="w-full h-full relative">
            <div
              ref={leftResizerRef}
              className="h-[70%] w-[9px] top-1/2 -translate-y-1/2 bg-blue-600 absolute left-[1px] rounded-md cursor-col-resize "
            ></div>
            <div
              ref={rightResizerRef}
              className="h-[70%] w-[9px] top-1/2 -translate-y-1/2 bg-blue-600 absolute right-[1px] rounded-md cursor-col-resize "
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrimComponent;

export const TimeMarker = ({
  gap,
  duration,
  secondsPerGap,
}: {
  gap: number;
  duration: number;
  secondsPerGap: number;
}) => {
  return (
    <div className="w-full py-[8px]">
      <div className="w-full flex flex-row items-center justify-evenly">
        {Array(Math.round(duration / secondsPerGap))
          .fill(1)
          .map((_, index) => (
            <div style={{ width: gap }} key={index}>
              <p>{secondsToTime(index * secondsPerGap)}</p>
            </div>
          ))}
        <div>{secondsToTime(duration)}</div>
      </div>
    </div>
  );
};
