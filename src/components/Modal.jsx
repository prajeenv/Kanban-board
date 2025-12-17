import { useEffect, useState, useRef } from 'react';

function Modal({ isOpen, onClose, title, children }) {
  const [size, setSize] = useState({ width: 448, height: 'auto' }); // 448px = max-w-md
  const [isResizing, setIsResizing] = useState(false);
  const [minHeight, setMinHeight] = useState(200);
  const modalRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const hasResized = useRef(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        // Clear any text selection
        window.getSelection()?.removeAllRanges();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Capture the initial height as minimum height after modal renders
      setTimeout(() => {
        if (modalRef.current) {
          const rect = modalRef.current.getBoundingClientRect();
          setMinHeight(rect.height);
        }
      }, 0);
    } else {
      // Clear selection when modal closes
      window.getSelection()?.removeAllRanges();
      // Reset size when modal closes
      setSize({ width: 448, height: 'auto' });
      setMinHeight(200); // Reset to default
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    hasResized.current = true;

    const MIN_WIDTH = 448; // Match the default opening width

    const rect = modalRef.current.getBoundingClientRect();
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
    };

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      let newWidth = startPos.current.width;
      let newHeight = startPos.current.height;

      if (direction.includes('right')) {
        newWidth = Math.max(MIN_WIDTH, startPos.current.width + deltaX);
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(minHeight, startPos.current.height + deltaY);
      }

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Reset the flag after a short delay to allow click events to be ignored
      setTimeout(() => {
        hasResized.current = false;
      }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    // Don't close if we just finished resizing
    if (hasResized.current) {
      return;
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl overflow-hidden relative flex flex-col"
        style={{
          width: size.width,
          height: size.height === 'auto' ? 'auto' : size.height,
          maxHeight: '90vh',
          maxWidth: '90vw',
          minWidth: '448px',
          minHeight: minHeight + 'px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {children}
        </div>

        {/* Resize handles */}
        <div
          onMouseDown={(e) => handleResizeStart(e, 'right')}
          className="absolute top-0 right-0 w-2 h-full cursor-ew-resize hover:bg-blue-500 transition-colors bg-gray-200 opacity-50 hover:opacity-100"
          style={{ right: 0 }}
        />
        <div
          onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize hover:bg-blue-500 transition-colors bg-gray-200 opacity-50 hover:opacity-100"
          style={{ bottom: 0 }}
        />
        <div
          onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize hover:bg-blue-500 transition-colors bg-gray-300 opacity-50 hover:opacity-100 rounded-tl-lg"
          style={{ bottom: 0, right: 0 }}
        />
      </div>
    </div>
  );
}

export default Modal;
