import React, { useState, useEffect } from 'react';
import { PuzzlePiece } from './components/PuzzlePiece';
import { Toast } from './components/Toast';

const PUZZLE_SIZE = 400;

function App() {
  const [pieces, setPieces] = useState<number[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [gridSize, setGridSize] = useState({ rows: 3, cols: 3 });

  const fetchRandomImage = () => {
    setIsLoading(true);
    const randomId = Math.floor(Math.random() * 1000);
    const newImageUrl = `https://picsum.photos/seed/${randomId}/800/800`;
    setImageUrl(newImageUrl);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const initializePuzzle = () => {
    const totalPieces = gridSize.rows * gridSize.cols;
    const initialPieces = Array.from({ length: totalPieces }, (_, i) => i);
    shuffleArray(initialPieces);
    setPieces(initialPieces);
    setShowToast(false);
  };

  useEffect(() => {
    if (!isLoading && imageUrl) {
      initializePuzzle();
    }
  }, [isLoading, imageUrl, gridSize]);

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedPiece(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedPiece === null) return;

    const newPieces = [...pieces];
    const draggedPieceValue = newPieces[draggedPiece];
    newPieces[draggedPiece] = newPieces[dropIndex];
    newPieces[dropIndex] = draggedPieceValue;
    
    setPieces(newPieces);
    setDraggedPiece(null);

    const isCorrect = newPieces.every((piece, index) => piece === index);
    if (isCorrect) {
      setShowToast(true);
    }
  };

  const handleNewPuzzle = () => {
    fetchRandomImage();
  };

  const handleGridSizeChange = (size: number) => {
    setGridSize({ rows: size, cols: size });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="animate-spin">
        <span className="material-icons text-3xl text-green-400">
          extension
        </span>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center">
      <div className="mb-4 flex items-center gap-4">
        <span className="material-icons text-gray-600">
          grid_on
        </span>
        <select
          value={gridSize.rows}
          onChange={(e) => handleGridSizeChange(Number(e.target.value))}
          className="bg-white border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <option value="2">2 x 2</option>
          <option value="3">3 x 3</option>
          <option value="4">4 x 4</option>
          <option value="5">5 x 5</option>
        </select>
      </div>
      
      <div 
        className="grid gap-0.5 bg-gray-200 p-2 shadow-xl"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, ${PUZZLE_SIZE/gridSize.cols}px)`,
          width: PUZZLE_SIZE + 16,
        }}
      >
        {pieces.map((pieceId, index) => (
          <PuzzlePiece
            key={index}
            id={pieceId}
            currentIndex={index}
            correctIndex={pieceId}
            imageUrl={imageUrl}
            size={PUZZLE_SIZE}
            rows={gridSize.rows}
            cols={gridSize.cols}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        ))}
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={initializePuzzle}
          className="px-6 py-2 rounded-full hover:bg-gray-200 transition-colors shadow-md flex items-center"
        >
          Shuffle
        </button>
        <button
          onClick={handleNewPuzzle}
          className="px-6 py-2 bg-green-400 text-white rounded-full hover:bg-green-600 transition-colors shadow-md flex items-center"
        >
          New
        </button>
      </div>

      <Toast
        message="🎉 Congratulations! You've completed the puzzle!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default App;