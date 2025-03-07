import React from 'react';

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({ isOpen, onClose, onRestart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-4">🎉 Congratulations! 🎉</h2>
        <p className="text-center mb-6">You've completed the puzzle!</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onRestart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};