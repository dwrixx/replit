import React, { useState } from "react";
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
  canvasSize: { width: number; height: number };
}

const Canvas: React.FC<CanvasProps> = ({
  items,
  onUpdateItem,
  onDeleteItem,
  canvasSize,
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const renderItem = (item: BoardItem) => {
    switch (item.type) {
      case "image":
        return (
          <img
            src={item.content}
            alt=""
            className="w-full h-full object-contain"
          />
        );
      case "text":
        return (
          <div className="w-full h-full p-2 bg-white text-black overflow-auto">
            <div
              dangerouslySetInnerHTML={{ __html: item.content }}
              contentEditable
              onBlur={(e) =>
                onUpdateItem(item.id, { content: e.currentTarget.innerHTML })
              }
              className="w-full h-full outline-none"
            />
          </div>
        );
      case "video":
        return (
          <div className="w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                item.content,
              )}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
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
    <div
      className="relative bg-gray-200 overflow-auto"
      style={{
        width: `${canvasSize.width}px`,
        height: `${canvasSize.height}px`,
      }}
    >
      {items.map((item) => (
        <Rnd
          key={item.id}
          size={{ width: item.size.width, height: item.size.height }}
          position={{ x: item.position.x, y: item.position.y }}
          onDragStart={() => setActiveItem(item.id)}
          onDragStop={(e, d) => {
            onUpdateItem(item.id, { position: { x: d.x, y: d.y } });
            setActiveItem(null);
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            onUpdateItem(item.id, {
              size: {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
              },
              position,
            });
          }}
          bounds="parent"
          className={`bg-white shadow-lg ${
            activeItem === item.id ? "z-50" : "z-10"
          }`}
          dragHandleClassName="drag-handle"
        >
          <div className="w-full h-full relative">
            <div className="drag-handle absolute top-0 left-0 right-0 h-6 bg-gray-200 cursor-move flex items-center justify-between px-2">
              <span className="text-xs font-bold text-gray-700">
                {item.type.toUpperCase()}
              </span>
              <button
                onClick={() => onDeleteItem(item.id)}
                className="bg-red-500 text-white p-1 text-xs rounded"
              >
                ×
              </button>
            </div>
            <div className="mt-6 h-[calc(100%-1.5rem)]">{renderItem(item)}</div>
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default Canvas;
