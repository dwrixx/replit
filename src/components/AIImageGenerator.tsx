import React, { useState } from "react";

const HF_API = import.meta.env.VITE_HF_API;

interface AIImageGeneratorProps {
  onGenerate: (imageUrl: string, position: { x: number; y: number }) => void;
  onClose: () => void;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({
  onGenerate,
  onClose,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
          headers: {
            Authorization: `Bearer ${HF_API}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      // Generate random position within the canvas
      const position = {
        x: Math.random() * 800, // Adjust based on your canvas size
        y: Math.random() * 600, // Adjust based on your canvas size
      };

      onGenerate(imageUrl, position);
      setPrompt(""); // Clear the prompt after generation
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter image description"
          className="flex-grow p-2 border border-gray-300 rounded text-black"
        />
        <button
          onClick={generateImage}
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate"}
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AIImageGenerator;
