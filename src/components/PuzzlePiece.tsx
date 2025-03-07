import React from 'react';

interface PuzzlePieceProps {
  id: number;
  currentIndex: number;
  correctIndex: number;
  imageUrl: string;
  size: number;
  rows: number;
  cols: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}

export const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  id,
  currentIndex,
  imageUrl,
  size,
  rows,
  cols,
  onDragStart,
  onDrop
}) => {
  const pieceWidth = size / cols;
  const pieceHeight = size / rows;
  
  const originalX = (id % cols) * pieceWidth;
  const originalY = Math.floor(id / cols) * pieceHeight;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative cursor-move"
      style={{
        width: `${pieceWidth}px`,
        height: `${pieceHeight}px`,
      }}
      draggable
      onDragStart={(e) => onDragStart(e, currentIndex)}
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop(e, currentIndex)}
    >
      <div 
        className="absolute w-full h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: `-${originalX}px -${originalY}px`,
          backgroundSize: `${size}px ${size}px`,
          clipPath: `path("M ${pieceWidth * 0.1},0 
            C ${pieceWidth * 0.1},0 ${pieceWidth * 0.35},0 ${pieceWidth * 0.45},0 
            C ${pieceWidth * 0.6},0 ${pieceWidth * 0.55},${pieceHeight * 0.15} ${pieceWidth * 0.7},${pieceHeight * 0.2} 
            C ${pieceWidth * 0.85},${pieceHeight * 0.25} ${pieceWidth},${pieceHeight * 0.35} ${pieceWidth},${pieceHeight * 0.45} 
            L ${pieceWidth},${pieceHeight * 0.55} 
            C ${pieceWidth},${pieceHeight * 0.65} ${pieceWidth * 0.85},${pieceHeight * 0.75} ${pieceWidth * 0.7},${pieceHeight * 0.8} 
            C ${pieceWidth * 0.55},${pieceHeight * 0.85} ${pieceWidth * 0.6},${pieceHeight} ${pieceWidth * 0.45},${pieceHeight} 
            L ${pieceWidth * 0.1},${pieceHeight} 
            L 0,${pieceHeight} 
            L 0,0 
            Z")`,
        }}
      />
    </div>
  );
};