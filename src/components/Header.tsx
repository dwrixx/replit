import React from "react";

interface HeaderProps {
  onUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddText: () => void;
  onAddVideo: () => void;
  onAddAIImage: () => void;
  onSaveBoard: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onUploadImage,
  onAddText,
  onAddVideo,
  onAddAIImage,
  onSaveBoard,
}) => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-400">Flux Board</h1>
        <div className="flex space-x-2">
          <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
            Upload Image
            <input
              type="file"
              className="hidden"
              onChange={onUploadImage}
              accept="image/*"
            />
          </label>
          <button
            onClick={onAddText}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Add Text
          </button>
          <button
            onClick={onAddVideo}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Add Video
          </button>
          <button
            onClick={onAddAIImage}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
          >
            Add AI Image
          </button>
          <button
            onClick={onSaveBoard}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Save Board
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
