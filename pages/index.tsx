import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { Power, RefreshCcw, Moon } from "lucide-react";

import Wallpaper from "../assets/images/login.jpg";
import Hacker from '../assets/images/hacker.png';
import Developer from '../assets/images/developer.png';
export default function Login() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [password, setPassword] = useState("Pookie");
  const [loading, setLoading] = useState(false);
  const [sleepMode, setSleepMode] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setLoading(true);
    setTimeout(() => {
      router.push(`/desktop?user=${selectedUser}`);
    }, 2000);
  };

  const handleSleep = () => {
    setSleepMode(true);
  };

  const handleWakeUp = () => {
    setSleepMode(false);
  };

  const handleShutdown = () => {
    window.close();
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="relative h-screen w-screen bg-black">
      {/* Sleep Mode */}
      {sleepMode && (
        <div
          className="absolute inset-0 bg-black flex items-center justify-center text-gray-400 text-lg cursor-pointer"
          onClick={handleWakeUp}
        >
          Click to wake up
        </div>
      )}

      {/* Background Wallpaper */}
      <Image src={Wallpaper} layout="fill" objectFit="cover" alt="macOS Wallpaper" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center space-y-6"
      >
        {/* User Selection */}
        {!selectedUser ? (
          <div className="flex space-x-12">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedUser("hacker")}
            >
              <Image src={Hacker} width={90} height={90} className="rounded-full" alt="Hacker" />
              <h2 className="text-white text-lg mt-2">Hacker</h2>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedUser("developer")}
            >
              <Image src={Developer} objectFit="cover"  width={90} height={90} className="rounded-full" alt="Developer" />
              <h2 className="text-white text-lg mt-2">Developer</h2>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <Image
              src={selectedUser === "hacker" ? Hacker : Developer}
              width={90}
              height={90}
              className="rounded-full"
              alt={selectedUser}
            />
            <h2 className="text-white text-2xl font-semibold mt-2">{selectedUser}</h2>

            {/* Password Input */}
            <form onSubmit={handleLogin} className="flex flex-col items-center mt-4">
              <input
                className="bg-gray-800 text-white text-lg text-center p-2 rounded-lg w-64 outline-none focus:ring-2 focus:ring-blue-400 transition"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="mt-4 text-white text-sm opacity-80 hover:opacity-100"
              >
                → Log in
              </motion.button>
            </form>

            {/* Loading Bar */}
            {loading && (
              <div className="absolute bottom-20 w-48 h-1 bg-gray-700">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  className="h-full bg-white"
                ></motion.div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

     {/* Bottom Buttons with macOS icons */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="absolute bottom-10 flex justify-center space-x-12 w-full"
>
  {/* Shut Down */}
  <motion.button
    whileHover={{ scale: 1.1, filter: "brightness(1.3)" }}
    whileTap={{ scale: 0.9 }}
    onClick={handleShutdown}
    className="text-white text-sm opacity-80 hover:opacity-100 flex flex-col items-center"
  >
    <Power
      size={30}
      className="text-white drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
    />
    <span className="mt-1 text-yellow-400 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]">Shut Down</span>
  </motion.button>

  {/* Restart */}
  <motion.button
    whileHover={{ scale: 1.1, filter: "brightness(1.3)" }}
    whileTap={{ scale: 0.9 }}
    onClick={handleRestart}
    className="text-white text-sm opacity-80 hover:opacity-100 flex flex-col items-center"
  >
    <RefreshCcw
      size={30}
      className="text-white drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
    />
    <span className="mt-1 text-yellow-400 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]">Restart</span>
  </motion.button>

  {/* Sleep */}
  <motion.button
    whileHover={{ scale: 1.1, filter: "brightness(1.3)" }}
    whileTap={{ scale: 0.9 }}
    onClick={handleSleep}
    className="text-white text-sm opacity-80 hover:opacity-100 flex flex-col items-center"
  >
    <Moon
      size={30}
      className="text-white drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
    />
    <span className="mt-1 text-yellow-400 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]">Sleep</span>
  </motion.button>
</motion.div>

    </div>
  );
}
