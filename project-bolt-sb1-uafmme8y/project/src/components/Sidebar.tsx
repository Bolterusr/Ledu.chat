import React from 'react';
import { BookOpen, MessageCircle, FileText, Home, Upload, X } from 'lucide-react';
import { Link, useRouter } from './Router';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { currentPath } = useRouter();

  const menuItems = [
    { path: '/', icon: <Home size={20} />, text: 'Dashboard' },
    { path: '/chat', icon: <MessageCircle size={20} />, text: 'AI Chat' },
    { path: '/study-materials', icon: <BookOpen size={20} />, text: 'Study Materials' },
    { path: '/upload', icon: <Upload size={20} />, text: 'Upload Files' },
  ];

  return (
    <div 
      className={`
        fixed md:relative h-full z-10 transition-all duration-300 ease-in-out
        dark:bg-gray-800 dark:text-white bg-white text-gray-800
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 w-0 md:w-20'}
        shadow-lg border-r dark:border-gray-700 border-gray-200
      `}
    >
      <div className="flex justify-between items-center h-16 px-4 border-b dark:border-gray-700 border-gray-200">
        <h2 className={`font-bold text-lg transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}>
          EduMax
        </h2>
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-md md:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`
                  flex items-center py-3 px-4 rounded-md transition-colors
                  ${currentPath === item.path 
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;