import React from 'react';
import { BookOpen, MessageCircle, Upload, Clock, Bookmark } from 'lucide-react';
import { Link } from '../components/Router';

interface DashboardProps {
  darkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ darkMode }) => {
  // Mock data for recent activities
  const recentActivities = [
    { id: 1, type: 'chat', title: 'Physics concept questions', time: '2 hours ago' },
    { id: 2, type: 'material', title: 'Math formulas flashcards', time: '1 day ago' },
    { id: 3, type: 'upload', title: 'History notes PDF', time: '2 days ago' },
  ];

  // Mock data for saved materials
  const savedMaterials = [
    { id: 1, title: 'Calculus Cheat Sheet', type: 'summary' },
    { id: 2, title: 'French Vocabulary', type: 'flashcards' },
    { id: 3, title: 'Chemistry Formulas', type: 'notes' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'chat': return <MessageCircle size={18} />;
      case 'material': return <BookOpen size={18} />;
      case 'upload': return <Upload size={18} />;
      default: return <MessageCircle size={18} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome to EduMax AI</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link 
          to="/chat" 
          className={`
            p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md 
            flex flex-col items-center text-center
            ${darkMode 
              ? 'bg-indigo-900 hover:bg-indigo-800 text-white' 
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900'
            }
          `}
        >
          <MessageCircle size={48} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI Chat Assistant</h3>
          <p className="text-sm opacity-80">Ask questions and get instant explanations from our AI tutor</p>
        </Link>
        
        <Link 
          to="/study-materials" 
          className={`
            p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md 
            flex flex-col items-center text-center
            ${darkMode 
              ? 'bg-blue-900 hover:bg-blue-800 text-white' 
              : 'bg-blue-50 hover:bg-blue-100 text-blue-900'
            }
          `}
        >
          <BookOpen size={48} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">Study Materials</h3>
          <p className="text-sm opacity-80">Generate summaries, flashcards, and practice quizzes</p>
        </Link>
        
        <Link 
          to="/upload" 
          className={`
            p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md 
            flex flex-col items-center text-center
            ${darkMode 
              ? 'bg-teal-900 hover:bg-teal-800 text-white' 
              : 'bg-teal-50 hover:bg-teal-100 text-teal-900'
            }
          `}
        >
          <Upload size={48} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">Upload Content</h3>
          <p className="text-sm opacity-80">Process your notes, PDFs, and images for AI-powered learning</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`
          p-6 rounded-lg shadow-sm 
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
        `}>
          <div className="flex items-center mb-4">
            <Clock size={20} className="mr-2" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <ul className="space-y-3">
            {recentActivities.map(activity => (
              <li 
                key={activity.id} 
                className={`
                  flex items-center p-3 rounded-md
                  ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                  transition-colors duration-200
                `}
              >
                <span className={`
                  p-2 rounded-full mr-3
                  ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
                `}>
                  {getActivityIcon(activity.type)}
                </span>
                <div className="flex-1">
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm opacity-70">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`
          p-6 rounded-lg shadow-sm 
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
        `}>
          <div className="flex items-center mb-4">
            <Bookmark size={20} className="mr-2" />
            <h2 className="text-xl font-semibold">Saved Materials</h2>
          </div>
          <ul className="space-y-3">
            {savedMaterials.map(material => (
              <li 
                key={material.id} 
                className={`
                  flex items-center p-3 rounded-md
                  ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                  transition-colors duration-200
                `}
              >
                <BookOpen size={20} className="mr-3" />
                <div className="flex-1">
                  <h3 className="font-medium">{material.title}</h3>
                  <p className="text-sm opacity-70">{material.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;