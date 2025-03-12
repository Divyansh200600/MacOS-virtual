"use client"; // Ensure it runs only on the client

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Battery, Wifi, Volume2 } from "lucide-react";
import { useStore } from "./store/useStore";

interface MenuBarProps {
  onLogout: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({ onLogout }) => {
  const currentUser = useStore((state) => state.currentUser);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Update time every second to avoid hydration issues
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="h-8 bg-black/20 backdrop-blur-xl flex items-center px-4 text-white"
    >
      <div className="flex-1 flex items-center space-x-4">
        <span className="font-semibold">MacOS</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Window</span>
        <span>Help</span>
      </div>

      <div className="flex items-center space-x-4">
        <Battery className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <span>{currentTime}</span> {/* ✅ Hydration-safe time */}
        {currentUser && (
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-6 h-6 rounded-full cursor-pointer"
            onClick={onLogout}
          />
        )}
      </div>
    </motion.div>
  );
};
