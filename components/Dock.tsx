import React from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, 
  Globe, 
  Mail, 
  Calendar, 
  Settings, 
  Music, 
  Image, 
  Terminal 
} from 'lucide-react';
import { useStore } from './store/useStore';

export const Dock: React.FC = () => {
  const addWindow = useStore((state) => state.addWindow);

  const dockItems = [
    { 
      icon: <Folder className="w-8 h-8" />, 
      label: 'Finder',
      content: (
        <div className="flex h-full">
          <div className="w-48 bg-gray-100 p-2 space-y-2">
            <div className="flex items-center space-x-2 p-2 hover:bg-blue-100 rounded cursor-pointer">
              <Folder className="w-4 h-4" />
              <span>Documents</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-blue-100 rounded cursor-pointer">
              <Image className="w-4 h-4" />
              <span>Pictures</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-blue-100 rounded cursor-pointer">
              <Music className="w-4 h-4" />
              <span>Music</span>
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Folder className="w-8 h-8 text-gray-600" />
                  </div>
                  <span className="text-sm">Folder {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    { 
      icon: <Globe className="w-8 h-8" />, 
      label: 'Safari',
      content: (
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-2 p-2 bg-gray-100">
            <input 
              type="text" 
              defaultValue="https://www.google.com"
              className="flex-1 px-3 py-1 rounded border border-gray-300"
            />
          </div>
          <iframe 
            src="https://www.google.com"
            className="flex-1 w-full"
            title="Safari Browser"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      )
    },
    { 
      icon: <Mail className="w-8 h-8" />, 
      label: 'Mail',
      content: (
        <div className="flex h-full">
          <div className="w-48 bg-gray-100 p-2 space-y-2">
            <div className="p-2 hover:bg-blue-100 rounded cursor-pointer">Inbox</div>
            <div className="p-2 hover:bg-blue-100 rounded cursor-pointer">Sent</div>
            <div className="p-2 hover:bg-blue-100 rounded cursor-pointer">Drafts</div>
            <div className="p-2 hover:bg-blue-100 rounded cursor-pointer">Trash</div>
          </div>
          <div className="flex-1 p-4">
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <div className="font-medium">Email Subject {i + 1}</div>
                  <div className="text-sm text-gray-500">From: user{i + 1}@example.com</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    { 
      icon: <Calendar className="w-8 h-8" />, 
      label: 'Calendar',
      content: (
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium p-2">{day}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => (
              <div key={i} className="aspect-square border rounded flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      icon: <Settings className="w-8 h-8" />, 
      label: 'Settings',
      content: (
        <div className="flex h-full">
          <div className="w-48 bg-gray-100 p-2 space-y-2">
            <div className="p-2 hover:bg-blue-100 rounded cursor-pointer">General</div>
            <div className="p-2 hover:bg-blue-100 rounded cursor-pointer">Desktop</div>
            <div className="p-2 hover:bg-blue-100 rounded cursor-pointer">Security</div>
            <div className="p-2 hover:bg-blue-100 rounded cursor-pointer">Network</div>
          </div>
          <div className="flex-1 p-4">
            <h2 className="text-xl font-medium mb-4">System Preferences</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Theme</label>
                <select className="w-full p-2 border rounded">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Auto</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Background</label>
                <select className="w-full p-2 border rounded">
                  <option>Mountain</option>
                  <option>Ocean</option>
                  <option>Forest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      icon: <Terminal className="w-8 h-8" />, 
      label: 'Terminal',
      content: (
        <div className="bg-black text-green-400 p-4 font-mono h-full">
          <div>Welcome to Terminal</div>
          <div>user@macOS:~$ _</div>
        </div>
      )
    }
  ];

  const handleClick = (label: string, content: React.ReactNode) => {
    addWindow({
      id: `${label}-${Date.now()}`,
      title: label,
      content,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100, y: 100 },
      size: { width: 800, height: 600 }
    });
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2"
    >
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-2 flex space-x-2">
        {dockItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center cursor-pointer text-white hover:bg-white/20 transition-colors"
            onClick={() => handleClick(item.label, item.content)}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};