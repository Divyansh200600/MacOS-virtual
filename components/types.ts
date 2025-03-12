export interface User {
  username: string;
  avatar: string;
}

export interface Window {
  id: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}