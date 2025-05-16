import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import StudyMaterials from './pages/StudyMaterials';
import FileUpload from './pages/FileUpload';
import { Routes, Route } from './components/Router';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <header className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-800'}`}>
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className={`mr-4 p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">EduMax AI</h1>
          </div>
          
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>
        
        <main className={`flex-1 p-6 overflow-auto ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Routes>
            <Route path="/" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/chat" element={<Chat darkMode={darkMode} />} />
            <Route path="/study-materials" element={<StudyMaterials darkMode={darkMode} />} />
            <Route path="/upload" element={<FileUpload darkMode={darkMode} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;