import React, { useState } from "react";

interface VideoModalProps {
  onClose: () => void;
  onAddVideo: (videoUrl: string) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ onClose, onAddVideo }) => {
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl.trim()) {
      onAddVideo(videoUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Video</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-800"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoModal;
