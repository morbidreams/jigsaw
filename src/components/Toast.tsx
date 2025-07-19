import React, { useEffect } from "react";
interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 mt-1 flex items-center gap-2 bg-green-400 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-up">
      <p className="text-xs">{message}</p>
    </div>
  );
};
