// src/components/AIImageGenerator.tsx
import React, { useState } from "react";

interface AIImageGeneratorProps {
  onClose: () => void;
  onGenerate: (imageUrl: string) => void;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({
  onClose,
  onGenerate,
}) => {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    // In a real application, you would call an AI image generation API here
    // For this example, we'll just use a placeholder image
    const placeholderImage =
      "https://via.placeholder.com/300x300.png?text=AI+Generated+Image";
    onGenerate(placeholderImage);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Generate AI Image</h2>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter image description"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Generate Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIImageGenerator;
