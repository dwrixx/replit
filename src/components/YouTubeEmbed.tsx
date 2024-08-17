// src/components/YouTubeEmbed.tsx
import React, { useState } from "react";
import { Rnd } from "react-rnd";

interface YouTubeEmbedProps {
  id: number;
  videoUrl: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  onFocus: (id: number) => void;
  isFocused: boolean;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  id,
  videoUrl,
  position,
  size,
  onPositionChange,
  onSizeChange,
  onFocus,
  isFocused,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId?.indexOf("&");
    return ampersandPosition !== -1
      ? videoId?.substring(0, ampersandPosition)
      : videoId;
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStart={() => setIsDragging(true)}
      onDragStop={(e, d) => {
        setIsDragging(false);
        onPositionChange({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onSizeChange({
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
        onPositionChange(position);
      }}
      bounds="parent"
      className={`${
        isFocused ? "z-10 shadow-lg" : "z-0 shadow-md"
      } transition-shadow duration-200 ease-in-out`}
      onMouseDown={() => onFocus(id)}
    >
      <div
        className={`w-full h-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <div className="w-full h-8 bg-gray-200 flex items-center justify-between px-2 cursor-move">
          <span className="text-sm font-semibold truncate">
            YouTube Video {id}
          </span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={(e) => {
              e.stopPropagation();
              onSizeChange({ width: 560, height: 315 });
            }}
          >
            Reset Size
          </button>
        </div>
        <iframe
          className="w-full h-[calc(100%-2rem)]"
          src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(videoUrl)}`}
          title={`YouTube video ${id}`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Rnd>
  );
};

export default YouTubeEmbed;
