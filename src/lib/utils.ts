import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";
import { Dimensions } from "@/redux/types/widget.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const areObjectsEqual = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
export const md5 = (str: string) => {
  const md5Hash = CryptoJS.MD5(str).toString();
  return md5Hash;
};

export const getVideoDimensions = async (src: string): Promise<Dimensions> => {
  const video = document.createElement("video");
  video.src = src;

  // Wait for the video metadata to load
  await new Promise((resolve) => {
    video.onloadedmetadata = resolve;
  });
  // Return video dimensions
  return {
    width: video.videoWidth,
    height: video.videoHeight,
  };
};

export function scaleVideoDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth = 280,
  maxHeight = 500
) {
  const aspectRatio = originalWidth / originalHeight;

  let newWidth = originalWidth;
  let newHeight = originalHeight;

  if (originalWidth > maxWidth) {
    newWidth = maxWidth;
    newHeight = newWidth / aspectRatio;
  }

  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = newHeight * aspectRatio;
  }

  return { width: Math.round(newWidth), height: Math.round(newHeight) };
}
export function convertToWebVTT(segments: any[]) {
  let vtt = "WEBVTT\n\n";
  segments.forEach((segment, index) => {
    const start = formatTime(segment.start);
    const end = formatTime(segment.end);
    vtt += `${index + 1}\n${start} --> ${end}\n${segment.text}\n\n`;
  });
  return vtt;
}

function formatTime(milliseconds: number): string {
  const totalSeconds = milliseconds / 1000;
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = (totalSeconds % 60).toFixed(3); // Preserve milliseconds
  const [sec, ms] = s.split("."); // Separate seconds and milliseconds
  const formattedSec = String(sec).padStart(2, "0"); // Ensure 2 digits for seconds
  const formattedMs = (ms || "000").padEnd(3, "0"); // Ensure 3 digits for milliseconds
  return `${h}:${m}:${formattedSec}.${formattedMs}`;
}
export function displayMillisecond(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000); // Total seconds (rounded)
  const hours = Math.floor(totalSeconds / 3600); // Hours
  const minutes = Math.floor((totalSeconds % 3600) / 60); // Minutes
  let seconds = totalSeconds % 60; // Seconds

  // Check if there are milliseconds and round seconds
  const remainingMilliseconds = milliseconds % 1000;
  if (remainingMilliseconds >= 500) {
    // If the remaining milliseconds are >= 500, round up
    seconds++;
  }

  // Format the time
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Return the time, including hours only if necessary
  if (hours > 0) {
    const formattedHours = String(hours).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

export function secondsToTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedMinutes =
    hours > 0 ? String(minutes).padStart(2, "0") : minutes;
  const formattedSeconds = String(secs).padStart(2, "0");

  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
}

export const findPerfectSecondsPerGap = (
  width: number,
  minGapWidth: number,
  duration: number
) => {
  if (duration * minGapWidth < width) {
    return 1;
  }
  let secondsPerGap = 2;
  while ((duration / secondsPerGap) * minGapWidth > width) {
    secondsPerGap++;
  }
  return secondsPerGap;
};

export const getEndDuration = (segments: any[]) => {
  let max = -1;
  for (let i = 0; i < segments.length; i++) {
    const curr = segments[i];
    if (curr.end > max) {
      max = curr.end;
    }
  }
  return max;
};

export function getWordDimensions(
  word: string,
  fontSize: number,
  fontFamily: string = "Arial"
): { width: number; height: number } {
  // Create a canvas
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to create 2D canvas context.");
  }

  // Set the font
  context.font = `${fontSize}px ${fontFamily}`;

  // Measure the word
  const metrics = context.measureText(word);

  // Width of the word
  const width = metrics.width;

  // Approximate height using baseline metrics (for the tallest letter in the word)
  const height =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  return { width, height };
}
