// src/App.tsx
import React, { useState } from "react";
import Canvas from "./components/Canvas";
import SettingsPanel from "./components/SettingsPanel";
import BoardSelector from "./components/BoardSelector";

interface Embed {
  id: number;
  videoUrl: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface Board {
  id: number;
  name: string;
  embeds: Embed[];
}

const App: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([
    { id: 1, name: "Board 1", embeds: [] },
  ]);
  const [currentBoardId, setCurrentBoardId] = useState(1);

  const handleAddEmbed = (videoUrl: string) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === currentBoardId
          ? {
              ...board,
              embeds: [
                ...board.embeds,
                {
                  id: Date.now(),
                  videoUrl,
                  position: {
                    x: board.embeds.length * 50,
                    y: board.embeds.length * 50,
                  },
                  size: { width: 560, height: 315 },
                },
              ],
            }
          : board,
      ),
    );
  };

  const handleNewBoard = (name: string) => {
    const newBoard = {
      id: Date.now(),
      name,
      embeds: [],
    };
    setBoards([...boards, newBoard]);
    setCurrentBoardId(newBoard.id);
  };

  const handleEmbedChange = (
    embedId: number,
    position: { x: number; y: number },
    size: { width: number; height: number },
  ) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === currentBoardId
          ? {
              ...board,
              embeds: board.embeds.map((embed) =>
                embed.id === embedId ? { ...embed, position, size } : embed,
              ),
            }
          : board,
      ),
    );
  };

  const handleBoardChange = (boardId: number) => {
    setCurrentBoardId(boardId);
  };

  const currentBoard = boards.find((board) => board.id === currentBoardId);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">YouTube Board App</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 p-4 bg-white shadow-md overflow-y-auto">
          <SettingsPanel
            onAddEmbed={handleAddEmbed}
            onNewBoard={handleNewBoard}
          />
          <BoardSelector
            boards={boards}
            currentBoardId={currentBoardId}
            onBoardChange={handleBoardChange}
          />
        </div>
        <div className="w-3/4 p-4">
          {currentBoard && (
            <Canvas
              embeds={currentBoard.embeds}
              onEmbedChange={handleEmbedChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
