import React, { useState } from "react";

interface SettingsPanelProps {
  onNewBoard: (name: string) => void;
  onFontChange: (font: string) => void;
  onFontSizeChange: (size: number) => void;
  onCanvasSizeChange: (width: number, height: number) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onNewBoard,
  onFontChange,
  onFontSizeChange,
  onCanvasSizeChange,
}) => {
  const [newBoardName, setNewBoardName] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [canvasWidth, setCanvasWidth] = useState(1920);
  const [canvasHeight, setCanvasHeight] = useState(1080);

  const handleNewBoard = () => {
    if (newBoardName.trim()) {
      onNewBoard(newBoardName);
      setNewBoardName("");
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    setFontSize(newSize);
    onFontSizeChange(newSize);
  };

  const handleCanvasSizeChange = () => {
    onCanvasSizeChange(canvasWidth, canvasHeight);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md text-white">
      <h3 className="text-lg font-bold mb-4">Settings</h3>

      {/* New Board Section */}
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">New Board</h4>
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Enter new board name"
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleNewBoard}
          className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Create New Board
        </button>
      </div>

      {/* Font Settings */}
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Font Settings</h4>
        <select
          onChange={(e) => onFontChange(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier">Courier</option>
        </select>
        <div className="mt-2">
          <label className="block text-sm font-medium mb-1">Font Size</label>
          <input
            type="range"
            min="8"
            max="72"
            value={fontSize}
            onChange={handleFontSizeChange}
            className="w-full"
          />
          <span>{fontSize}px</span>
        </div>
      </div>

      {/* Canvas Size Settings */}
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Canvas Size</h4>
        <div className="flex space-x-2">
          <input
            type="number"
            value={canvasWidth}
            onChange={(e) => setCanvasWidth(parseInt(e.target.value))}
            placeholder="Width"
            className="w-1/2 p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            value={canvasHeight}
            onChange={(e) => setCanvasHeight(parseInt(e.target.value))}
            placeholder="Height"
            className="w-1/2 p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <button
          onClick={handleCanvasSizeChange}
          className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Apply Canvas Size
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
