// src/components/Canvas.tsx
import React from "react";
import { Rnd } from "react-rnd";

interface BoardItem {
  id: string;
  type: "image" | "text" | "video";
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface CanvasProps {
  items: BoardItem[];
  onUpdateItem: (id: string, updates: Partial<BoardItem>) => void;
  onDeleteItem: (id: string) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  items,
  onUpdateItem,
  onDeleteItem,
}) => {
  const renderItem = (item: BoardItem) => {
    switch (item.type) {
      case "image":
        return (
          <img
            src={item.content}
            alt=""
            className="w-full h-full object-cover"
          />
        );
      case "text":
        return (
          <div className="w-full h-full p-2 bg-white text-black">
            {item.content}
          </div>
        );
      case "video":
        return (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(item.content)}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        );
      default:
        return null;
    }
  };

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="w-full h-full bg-gray-700 relative">
      {items.map((item) => (
        <Rnd
          key={item.id}
          size={{ width: item.size.width, height: item.size.height }}
          position={{ x: item.position.x, y: item.position.y }}
          onDragStop={(e, d) =>
            onUpdateItem(item.id, { position: { x: d.x, y: d.y } })
          }
          onResizeStop={(e, direction, ref, delta, position) =>
            onUpdateItem(item.id, {
              size: { width: ref.style.width, height: ref.style.height },
              position,
            })
          }
          className="bg-white shadow-lg"
        >
          <div className="w-full h-full relative">
            {renderItem(item)}
            <button
              onClick={() => onDeleteItem(item.id)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs"
            >
              ×
            </button>
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default Canvas;
