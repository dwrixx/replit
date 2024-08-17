// src/App.tsx
import React, { useState } from "react";
import Canvas from "./components/Canvas";
import SettingsPanel from "./components/SettingsPanel";

interface Embed {
  id: number;
  videoUrl: string;
  position: { x: number; y: number };
  size: { width: string; height: string };
}

interface Board {
  id: number;
  embeds: Embed[];
}

const App: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([{ id: 1, embeds: [] }]);
  const [currentBoardId, setCurrentBoardId] = useState(1);

  const handleAddEmbed = (videoUrl: string) => {
    setBoards((boards) =>
      boards.map((board) =>
        board.id === currentBoardId
          ? {
              ...board,
              embeds: [
                ...board.embeds,
                {
                  id: Date.now(),
                  videoUrl,
                  position: { x: 50, y: 50 },
                  size: { width: "560px", height: "315px" },
                },
              ],
            }
          : board,
      ),
    );
  };

  const handleNewBoard = () => {
    const newBoard = {
      id: Date.now(),
      embeds: [],
    };
    setBoards([...boards, newBoard]);
    setCurrentBoardId(newBoard.id);
  };

  const handleEmbedChange = (
    embedId: number,
    position: { x: number; y: number },
    size: { width: string; height: string },
  ) => {
    setBoards((boards) =>
      boards.map((board) =>
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

  const currentBoard = boards.find((board) => board.id === currentBoardId);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4">
        <SettingsPanel
          onAddEmbed={handleAddEmbed}
          onNewBoard={handleNewBoard}
        />
      </div>
      <div className="w-3/4">
        {currentBoard && (
          <Canvas
            embeds={currentBoard.embeds}
            onEmbedChange={handleEmbedChange}
          />
        )}
      </div>
    </div>
  );
};

export default App;
