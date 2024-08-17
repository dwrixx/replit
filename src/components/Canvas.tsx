// src/components/Canvas.tsx
import React, { useState } from 'react';
import YouTubeEmbed from './YouTubeEmbed';

interface CanvasProps {
  embeds: Array<{
    id: number;
    videoUrl: string;
    position: { x: number; y: number };
    size: { width: string; height: string };
  }>;
  onEmbedChange: (
    id: number,
    position: { x: number; y: number },
    size: { width: string; height: string }
  ) => void;
}

const Canvas: React.FC<CanvasProps> = ({ embeds, onEmbedChange }) => {
  return (
    <div className="relative w-full h-full bg-gray-100 border border-gray-300">
      {embeds.map((embed) => (
        <YouTubeEmbed
          key={embed.id}
          videoUrl={embed.videoUrl}
          position={embed.position}
          size={embed.size}
          onPositionChange={(position) => onEmbedChange(embed.id, position, embed.size)}
          onSizeChange={(size) => onEmbedChange(embed.id, embed.position, size)}
        />
      ))}
    </div>
  );
};

export default Canvas;
