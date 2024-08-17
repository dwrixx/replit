// src/App.tsx
import React, { useState } from "react";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import AIImageGenerator from "./components/AIImageGenerator";

interface BoardItem {
  id: string;
  type: "image" | "text" | "video";
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const App: React.FC = () => {
  const [boardItems, setBoardItems] = useState<BoardItem[]>([]);
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  const addBoardItem = (item: BoardItem) => {
    setBoardItems([...boardItems, item]);
  };

  const updateBoardItem = (id: string, updates: Partial<BoardItem>) => {
    setBoardItems(
      boardItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    );
  };

  const deleteBoardItem = (id: string) => {
    setBoardItems(boardItems.filter((item) => item.id !== id));
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addBoardItem({
          id: Date.now().toString(),
          type: "image",
          content: e.target?.result as string,
          position: { x: 0, y: 0 },
          size: { width: 200, height: 200 },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddText = () => {
    addBoardItem({
      id: Date.now().toString(),
      type: "text",
      content: "New Text",
      position: { x: 0, y: 0 },
      size: { width: 200, height: 100 },
    });
  };

  const handleAddVideo = () => {
    const videoUrl = prompt("Enter YouTube video URL:");
    if (videoUrl) {
      addBoardItem({
        id: Date.now().toString(),
        type: "video",
        content: videoUrl,
        position: { x: 0, y: 0 },
        size: { width: 320, height: 180 },
      });
    }
  };

  const handleSaveBoard = () => {
    // Implement save functionality here
    console.log("Saving board:", boardItems);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header
        onUploadImage={handleUploadImage}
        onAddText={handleAddText}
        onAddVideo={handleAddVideo}
        onAddAIImage={() => setShowAIGenerator(true)}
        onSaveBoard={handleSaveBoard}
      />
      <div className="flex-1 overflow-hidden">
        <Canvas
          items={boardItems}
          onUpdateItem={updateBoardItem}
          onDeleteItem={deleteBoardItem}
        />
      </div>
      {showAIGenerator && (
        <AIImageGenerator
          onClose={() => setShowAIGenerator(false)}
          onGenerate={(imageUrl) => {
            addBoardItem({
              id: Date.now().toString(),
              type: "image",
              content: imageUrl,
              position: { x: 0, y: 0 },
              size: { width: 200, height: 200 },
            });
            setShowAIGenerator(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
