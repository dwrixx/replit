// src/components/YouTubeEmbed.tsx
import React from 'react';
import { Rnd } from 'react-rnd';

interface YouTubeEmbedProps {
  videoUrl: string;
  position: { x: number; y: number };
  size: { width: string; height: string };
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: string; height: string }) => void;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoUrl,
  position,
  size,
  onPositionChange,
  onSizeChange,
}) => {
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId?.indexOf('&');
    return ampersandPosition !== -1 ? videoId?.substring(0, ampersandPosition) : videoId;
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => onPositionChange({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        onSizeChange({ width: ref.style.width, height: ref.style.height });
        onPositionChange(position);
      }}
      className="border border-gray-300 bg-white shadow-md"
    >
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(videoUrl)}`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      />
    </Rnd>
  );
};

export default YouTubeEmbed;
