import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import AIImageGenerator from "./components/AIImageGenerator";
import BoardSelector from "./components/BoardSelector";
import SettingsPanel from "./components/SettingsPanel";
import VideoModal from "./components/VideoModal"; // New import

interface BoardItem {
  id: string;
  type: "image" | "text" | "video";
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface Board {
  id: number;
  name: string;
  items: BoardItem[];
}

const App: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([
    { id: 1, name: "Board 1", items: [] },
  ]);
  const [currentBoardId, setCurrentBoardId] = useState(1);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false); // New state

  const currentBoard = boards.find((board) => board.id === currentBoardId);

  const addBoardItem = useCallback(
    (item: BoardItem) => {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === currentBoardId
            ? { ...board, items: [...board.items, item] }
            : board,
        ),
      );
    },
    [currentBoardId],
  );

  const updateBoardItem = useCallback(
    (id: string, updates: Partial<BoardItem>) => {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === currentBoardId
            ? {
                ...board,
                items: board.items.map((item) =>
                  item.id === id ? { ...item, ...updates } : item,
                ),
              }
            : board,
        ),
      );
    },
    [currentBoardId],
  );

  const deleteBoardItem = useCallback(
    (id: string) => {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === currentBoardId
            ? {
                ...board,
                items: board.items.filter((item) => item.id !== id),
              }
            : board,
        ),
      );
    },
    [currentBoardId],
  );

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addBoardItem({
          id: Date.now().toString(),
          type: "image",
          content: e.target?.result as string,
          position: { x: 50, y: 50 },
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
      position: { x: 50, y: 50 },
      size: { width: 200, height: 100 },
    });
  };

  const handleAddVideo = (videoUrl: string) => {
    addBoardItem({
      id: Date.now().toString(),
      type: "video",
      content: videoUrl,
      position: { x: 50, y: 50 },
      size: { width: 320, height: 180 },
    });
    setShowVideoModal(false); // Close the modal after adding
  };

  const handleSaveBoard = () => {
    console.log("Saving board:", currentBoard);
    // Implement actual save functionality here
  };

  const handleNewBoard = (name: string) => {
    const newBoard: Board = {
      id: Date.now(),
      name,
      items: [],
    };
    setBoards([...boards, newBoard]);
    setCurrentBoardId(newBoard.id);
  };

  const handleBoardChange = (boardId: number) => {
    setCurrentBoardId(boardId);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header
        onUploadImage={handleUploadImage}
        onAddText={handleAddText}
        onAddVideo={() => setShowVideoModal(true)} // Modified to open modal
        onAddAIImage={() => setShowAIGenerator(true)}
        onSaveBoard={handleSaveBoard}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
          <BoardSelector
            boards={boards}
            currentBoardId={currentBoardId}
            onBoardChange={handleBoardChange}
          />
          <SettingsPanel onNewBoard={handleNewBoard} />
        </div>
        <div className="flex-1 overflow-hidden">
          <Canvas
            items={currentBoard?.items || []}
            onUpdateItem={updateBoardItem}
            onDeleteItem={deleteBoardItem}
          />
        </div>
      </div>
      {showAIGenerator && (
        <AIImageGenerator
          onClose={() => setShowAIGenerator(false)}
          onGenerate={(imageUrl) => {
            addBoardItem({
              id: Date.now().toString(),
              type: "image",
              content: imageUrl,
              position: { x: 50, y: 50 },
              size: { width: 200, height: 200 },
            });
            setShowAIGenerator(false);
          }}
        />
      )}
      {showVideoModal && (
        <VideoModal
          onClose={() => setShowVideoModal(false)}
          onAddVideo={handleAddVideo}
        />
      )}
    </div>
  );
};

export default App;
