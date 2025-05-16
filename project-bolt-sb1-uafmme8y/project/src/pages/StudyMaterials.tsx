import React, { useState } from 'react';
import { BookOpen, List, Search, Plus, ArrowRight, X, Download } from 'lucide-react';

interface StudyMaterialsProps {
  darkMode: boolean;
}

// Material type definitions
interface Material {
  id: number;
  title: string;
  type: 'summary' | 'flashcards' | 'notes' | 'quiz';
  subject: string;
  date: string;
  content: any; // This would be more specific in a real app
}

const StudyMaterials: React.FC<StudyMaterialsProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  // Mock data for study materials
  const materials: Material[] = [
    {
      id: 1,
      title: 'Ancient Civilizations Overview',
      type: 'summary',
      subject: 'History',
      date: '2023-06-15',
      content: {
        sections: [
          {
            title: 'Mesopotamia',
            text: 'Often referred to as the cradle of civilization, located between the Tigris and Euphrates rivers.'
          },
          {
            title: 'Ancient Egypt',
            text: 'Known for the pyramids, pharaohs, and the Nile River shaping their culture and agriculture.'
          },
          {
            title: 'Indus Valley',
            text: 'Advanced urban planning with grid layouts, sophisticated drainage systems, and standardized weights.'
          }
        ]
      }
    },
    {
      id: 2,
      title: 'Calculus Fundamentals',
      type: 'flashcards',
      subject: 'Mathematics',
      date: '2023-07-22',
      content: {
        cards: [
          { question: 'What is a derivative?', answer: 'The rate of change of a function with respect to a variable.' },
          { question: 'What is an integral?', answer: 'A mathematical object that can be interpreted as an area or a generalization of area.' },
          { question: 'What is the chain rule?', answer: 'A formula for computing the derivative of a composite function.' }
        ]
      }
    },
    {
      id: 3,
      title: 'Periodic Table Elements',
      type: 'quiz',
      subject: 'Chemistry',
      date: '2023-08-05',
      content: {
        questions: [
          {
            question: 'What is the chemical symbol for Gold?',
            options: ['Go', 'Gd', 'Au', 'Ag'],
            answer: 'Au'
          },
          {
            question: 'Which element has the atomic number 8?',
            options: ['Carbon', 'Oxygen', 'Nitrogen', 'Fluorine'],
            answer: 'Oxygen'
          }
        ]
      }
    },
    {
      id: 4,
      title: 'Literary Devices in Shakespeare',
      type: 'notes',
      subject: 'Literature',
      date: '2023-09-12',
      content: {
        text: 'Shakespeare frequently uses metaphors, similes, personification, and dramatic irony to enhance his works. His use of iambic pentameter creates a natural rhythm that mimics natural speech while adding poetic quality.'
      }
    },
  ];

  // Filter and search materials
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || material.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Material type badges with colors
  const getTypeBadge = (type: string) => {
    const colors = {
      summary: darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800',
      flashcards: darkMode ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800',
      notes: darkMode ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800',
      quiz: darkMode ? 'bg-orange-900 text-orange-100' : 'bg-orange-100 text-orange-800'
    };

    return (
      <span className={`${colors[type as keyof typeof colors]} px-2 py-1 rounded-full text-xs font-medium`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  // New material form tabs
  const formTabs = [
    { label: 'Summary', icon: <List size={16} /> },
    { label: 'Flashcards', icon: <BookOpen size={16} /> },
    { label: 'Quiz', icon: <Search size={16} /> }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Study Materials</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Generate and manage your AI-powered study resources
          </p>
        </div>
        <button 
          onClick={() => setCreateModalOpen(true)}
          className={`
            mt-4 md:mt-0 flex items-center px-4 py-2 rounded-lg 
            ${darkMode 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }
            transition-colors duration-200
          `}
        >
          <Plus size={18} className="mr-2" />
          Create New Material
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or subject..."
            className={`
              w-full pl-10 pr-4 py-2 rounded-lg
              ${darkMode 
                ? 'bg-gray-800 text-white border-gray-700 focus:border-indigo-500' 
                : 'bg-white text-gray-800 border-gray-200 focus:border-indigo-500'
              }
              border focus:ring-2 focus:ring-indigo-200 focus:outline-none
              transition-colors duration-200
            `}
          />
          <Search 
            size={18} 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={`
            px-4 py-2 rounded-lg min-w-[150px]
            ${darkMode 
              ? 'bg-gray-800 text-white border-gray-700' 
              : 'bg-white text-gray-800 border-gray-200'
            }
            border focus:ring-2 focus:ring-indigo-200 focus:outline-none
            transition-colors duration-200
          `}
        >
          <option value="all">All Types</option>
          <option value="summary">Summaries</option>
          <option value="flashcards">Flashcards</option>
          <option value="notes">Notes</option>
          <option value="quiz">Quizzes</option>
        </select>
      </div>

      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(material => (
            <div 
              key={material.id}
              className={`
                rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300
                ${darkMode ? 'bg-gray-800' : 'bg-white'}
              `}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg line-clamp-2">{material.title}</h3>
                  {getTypeBadge(material.type)}
                </div>
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {material.subject}
                </p>
                
                <div className="min-h-[80px] mb-4">
                  {material.type === 'summary' && (
                    <p className="text-sm line-clamp-3">
                      {material.content.sections[0].title}: {material.content.sections[0].text}
                    </p>
                  )}
                  {material.type === 'flashcards' && (
                    <p className="text-sm line-clamp-3">
                      {material.content.cards[0].question}
                    </p>
                  )}
                  {material.type === 'quiz' && (
                    <p className="text-sm line-clamp-3">
                      Quiz with {material.content.questions.length} questions
                    </p>
                  )}
                  {material.type === 'notes' && (
                    <p className="text-sm line-clamp-3">
                      {material.content.text}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {new Date(material.date).toLocaleDateString()}
                  </span>
                  <button 
                    className={`
                      flex items-center text-sm font-medium 
                      ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}
                      transition-colors duration-200
                    `}
                  >
                    Open <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`
          text-center py-16 rounded-lg
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
        `}>
          <Search size={48} className="mx-auto mb-4 opacity-40" />
          <h3 className="text-xl font-medium mb-2">No materials found</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Try adjusting your search or filters, or create a new study material.
          </p>
        </div>
      )}

      {/* Create new material modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setCreateModalOpen(false)}></div>
            
            <div className={`
              relative rounded-lg shadow-xl max-w-2xl w-full p-6
              ${darkMode ? 'bg-gray-800' : 'bg-white'}
              transform transition-all
            `}>
              <button 
                onClick={() => setCreateModalOpen(false)}
                className={`
                  absolute top-4 right-4 p-1 rounded-full
                  ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                `}
              >
                <X size={20} />
              </button>
              
              <h2 className="text-xl font-bold mb-6">Create New Study Material</h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Material Title
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter a title for your study material"
                    className={`
                      w-full px-4 py-2 rounded-lg
                      ${darkMode 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-white text-gray-800 border-gray-300'
                      }
                      border focus:ring-2 focus:ring-indigo-200 focus:outline-none
                    `}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Subject
                  </label>
                  <input 
                    type="text"
                    placeholder="E.g., Mathematics, History, Science"
                    className={`
                      w-full px-4 py-2 rounded-lg
                      ${darkMode 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-white text-gray-800 border-gray-300'
                      }
                      border focus:ring-2 focus:ring-indigo-200 focus:outline-none
                    `}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Material Type
                  </label>
                  <div className="flex border-b">
                    {formTabs.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTabIndex(index)}
                        className={`
                          flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors
                          ${activeTabIndex === index
                            ? darkMode
                              ? 'border-indigo-500 text-indigo-400'
                              : 'border-indigo-500 text-indigo-600'
                            : darkMode
                              ? 'border-transparent text-gray-400 hover:text-gray-300'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }
                        `}
                      >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-2">
                  {activeTabIndex === 0 && (
                    <div>
                      <textarea
                        rows={6}
                        placeholder="Enter or paste your text here to generate a summary..."
                        className={`
                          w-full px-4 py-2 rounded-lg
                          ${darkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-white text-gray-800 border-gray-300'
                          }
                          border focus:ring-2 focus:ring-indigo-200 focus:outline-none
                        `}
                      ></textarea>
                    </div>
                  )}
                  
                  {activeTabIndex === 1 && (
                    <div>
                      <textarea
                        rows={6}
                        placeholder="Enter or paste your text here to generate flashcards..."
                        className={`
                          w-full px-4 py-2 rounded-lg
                          ${darkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-white text-gray-800 border-gray-300'
                          }
                          border focus:ring-2 focus:ring-indigo-200 focus:outline-none
                        `}
                      ></textarea>
                    </div>
                  )}
                  
                  {activeTabIndex === 2 && (
                    <div>
                      <textarea
                        rows={6}
                        placeholder="Enter or paste your text here to generate a quiz..."
                        className={`
                          w-full px-4 py-2 rounded-lg
                          ${darkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-white text-gray-800 border-gray-300'
                          }
                          border focus:ring-2 focus:ring-indigo-200 focus:outline-none
                        `}
                      ></textarea>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setCreateModalOpen(false)}
                    className={`
                      px-4 py-2 rounded-lg
                      ${darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }
                      transition-colors duration-200
                    `}
                  >
                    Cancel
                  </button>
                  <button
                    className={`
                      px-4 py-2 rounded-lg
                      ${darkMode 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      }
                      transition-colors duration-200
                    `}
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;