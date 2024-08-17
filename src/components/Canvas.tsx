import React, { useState, useCallback, useMemo } from "react";
import { Rnd } from "react-rnd";

interface BoardItem {
  id: string;
  type: "image" | "text" | "video";
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface CanvasProps {
  items: BoardItem[];
  onUpdateItem: (id: string, updates: Partial<BoardItem>) => void;
  onDeleteItem: (id: string) => void;
  canvasSize: { width: number; height: number };
  headerHeight: number;
}

const Canvas: React.FC<CanvasProps> = ({
  items,
  onUpdateItem,
  onDeleteItem,
  canvasSize,
  headerHeight,
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(items.length);

  const bringToFront = useCallback(
    (id: string) => {
      setMaxZIndex((prevMax) => {
        const newZIndex = prevMax + 1;
        onUpdateItem(id, { zIndex: newZIndex });
        return newZIndex;
      });
    },
    [onUpdateItem],
  );

  const renderItem = useCallback(
    (item: BoardItem) => {
      switch (item.type) {
        case "image":
          return (
            <img
              src={item.content}
              alt=""
              className="w-full h-full object-contain"
              draggable={false}
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
                onClick={(e) => e.stopPropagation()}
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
    },
    [onUpdateItem],
  );

  const getYouTubeVideoId = useCallback((url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }, []);

  const memoizedItems = useMemo(() => items, [items]);

  return (
    <div
      className="relative bg-gray-200 overflow-auto"
      style={{
        width: `${canvasSize.width}px`,
        height: `${canvasSize.height}px`,
      }}
    >
      {memoizedItems.map((item) => (
        <Rnd
          key={item.id}
          size={{ width: item.size.width, height: item.size.height }}
          position={{ x: item.position.x, y: item.position.y }}
          onDragStart={() => {
            setActiveItem(item.id);
            bringToFront(item.id);
          }}
          onDrag={(e, d) => {
            // Update position in real-time for smoother dragging
            onUpdateItem(item.id, { position: { x: d.x, y: d.y } });
          }}
          onDragStop={() => {
            setActiveItem(null);
          }}
          onResizeStart={() => {
            setActiveItem(item.id);
            bringToFront(item.id);
          }}
          onResize={(e, direction, ref, delta, position) => {
            // Update size in real-time for smoother resizing
            onUpdateItem(item.id, {
              size: {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
              },
              position,
            });
          }}
          onResizeStop={() => {
            setActiveItem(null);
          }}
          bounds="parent"
          className={`bg-white shadow-lg ${
            activeItem === item.id ? "ring-2 ring-blue-500" : ""
          }`}
          style={{
            zIndex: item.zIndex,
            transition: "none", // Remove transition for instant updates
          }}
          dragHandleClassName="drag-handle"
          enableUserSelectHack={false}
          resizeHandleStyles={{
            bottomRight: { cursor: "se-resize" },
            bottomLeft: { cursor: "sw-resize" },
            topRight: { cursor: "ne-resize" },
            topLeft: { cursor: "nw-resize" },
          }}
        >
          <div
            className="w-full h-full relative group"
            onClick={() => bringToFront(item.id)}
          >
            <div className="drag-handle absolute top-0 left-0 right-0 h-6 bg-gray-200 cursor-move flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-xs font-bold text-gray-700">
                {item.type.toUpperCase()}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(item.id);
                }}
                className="bg-red-500 text-white p-1 text-xs rounded hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="w-full h-full overflow-hidden pt-6">
              {renderItem(item)}
            </div>
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default Canvas;
