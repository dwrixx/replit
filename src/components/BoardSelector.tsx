// src/components/BoardSelector.tsx
import React from "react";

interface BoardSelectorProps {
  boards: Array<{ id: number; name: string }>;
  currentBoardId: number;
  onBoardChange: (boardId: number) => void;
}

const BoardSelector: React.FC<BoardSelectorProps> = ({
  boards,
  currentBoardId,
  onBoardChange,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">Boards</h3>
      <ul className="space-y-2">
        {boards.map((board) => (
          <li key={board.id}>
            <button
              className={`w-full text-left p-2 rounded ${
                board.id === currentBoardId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => onBoardChange(board.id)}
            >
              {board.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardSelector;
