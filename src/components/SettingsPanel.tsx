// src/components/SettingsPanel.tsx
import React, { useState } from "react";

interface SettingsPanelProps {
  onAddEmbed: (videoUrl: string) => void;
  onNewBoard: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onAddEmbed,
  onNewBoard,
}) => {
  const [inputUrl, setInputUrl] = useState("");

  const handleAddEmbed = () => {
    onAddEmbed(inputUrl);
    setInputUrl("");
  };

  return (
    <div className="p-4 bg-gray-200 border border-gray-300">
      <h3 className="text-lg font-bold mb-4">Settings</h3>
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleAddEmbed}
        className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
      >
        Add Video
      </button>
      <button
        onClick={onNewBoard}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        New Board
      </button>
    </div>
  );
};

export default SettingsPanel;
