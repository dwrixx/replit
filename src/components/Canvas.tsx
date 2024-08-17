// src/components/Canvas.tsx
import React, { useState } from "react";
import YouTubeEmbed from "./YouTubeEmbed";

interface CanvasProps {
  embeds: Array<{
    id: number;
    videoUrl: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }>;
  onEmbedChange: (
    id: number,
    position: { x: number; y: number },
    size: { width: number; height: number },
  ) => void;
}

const Canvas: React.FC<CanvasProps> = ({ embeds, onEmbedChange }) => {
  const [focusedId, setFocusedId] = useState<number | null>(null);

  const handleFocus = (id: number) => {
    setFocusedId(id);
  };

  return (
    <div
      className="relative w-full h-full bg-gray-100 border border-gray-300 overflow-hidden"
      onMouseDown={() => setFocusedId(null)}
    >
      {embeds.map((embed) => (
        <YouTubeEmbed
          key={embed.id}
          id={embed.id}
          videoUrl={embed.videoUrl}
          position={embed.position}
          size={embed.size}
          onPositionChange={(position) =>
            onEmbedChange(embed.id, position, embed.size)
          }
          onSizeChange={(size) => onEmbedChange(embed.id, embed.position, size)}
          onFocus={handleFocus}
          isFocused={focusedId === embed.id}
        />
      ))}
    </div>
  );
};

export default Canvas;
