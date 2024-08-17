// src/components/SettingsPanel.tsx
import React, { useState } from "react";

interface SettingsPanelProps {
  onAddEmbed: (videoUrl: string) => void;
  onNewBoard: (name: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onAddEmbed,
  onNewBoard,
}) => {
  const [inputUrl, setInputUrl] = useState("");
  const [newBoardName, setNewBoardName] = useState("");

  const handleAddEmbed = () => {
    if (inputUrl.trim()) {
      onAddEmbed(inputUrl);
      setInputUrl("");
    }
  };

  const handleNewBoard = () => {
    if (newBoardName.trim()) {
      onNewBoard(newBoardName);
      setNewBoardName("");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Settings</h3>
      <div className="mb-4">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddEmbed}
          className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Add Video
        </button>
      </div>
      <div>
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Enter new board name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleNewBoard}
          className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          New Board
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
