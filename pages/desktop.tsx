import { Dock } from '../components/Dock';
import { MenuBar } from '../components/MenuBar';
import { WindowManager } from '../components/WindowManager';
import { useStore } from '../components/store/useStore';  

const Desktop: React.FC = () => {
  const logout = useStore((state) => state.logout);

  return (
    <div 
      className="h-screen w-full bg-cover bg-center relative overflow-hidden"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1472152083436-a6eede6efad9?auto=format&fit=crop&q=80)',
        backgroundSize: 'cover'
      }}
    >
      <MenuBar onLogout={logout} />
      <WindowManager />
      <Dock />
    </div>
  );
};

export default Desktop;  // ✅ Changed to default export
