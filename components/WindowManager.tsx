import React from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { useStore } from './store/useStore';

export const WindowManager: React.FC = () => {
  const windows = useStore((state) => state.windows);
  const updateWindow = useStore((state) => state.updateWindow);
  const removeWindow = useStore((state) => state.removeWindow);
  const bringToFront = useStore((state) => state.bringToFront);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {windows.map((window) => (
          <Rnd
            key={window.id}
            default={{
              x: window.position.x,
              y: window.position.y,
              width: window.size.width,
              height: window.size.height
            }}
            style={{ 
              zIndex: window.zIndex,
              display: window.isMinimized ? 'none' : 'block',
              width: window.isMaximized ? '100%' : undefined,
              height: window.isMaximized ? 'calc(100% - 28px)' : undefined,
              transform: window.isMaximized ? 'translate(0, 28px)' : undefined
            }}
            disableDragging={window.isMaximized}
            enableResizing={!window.isMaximized}
            onDragStart={() => bringToFront(window.id)}
            onResizeStart={() => bringToFront(window.id)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full h-full bg-white/80 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="h-8 bg-gray-200/80 flex items-center px-4 space-x-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => removeWindow(window.id)}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                  />
                  <button
                    onClick={() => updateWindow(window.id, { isMinimized: true })}
                    className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                  />
                  <button
                    onClick={() => updateWindow(window.id, { isMaximized: !window.isMaximized })}
                    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                  />
                </div>
                <div className="flex-1 text-center text-sm font-medium">
                  {window.title}
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                {window.content}
              </div>
            </motion.div>
          </Rnd>
        ))}
      </AnimatePresence>
    </div>
  );
};