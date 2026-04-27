import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LearningPath = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pathData, setPathData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedModules, setCompletedModules] = useState([]);
    const [currentModule, setCurrentModule] = useState(0);

    useEffect(() => {
          // Fetch learning path data based on ID
                  const fetchPathData = async () => {
                          try {
                                    // Replace with actual API call
                            const response = await fetch(`/api/learning-paths/${id}`);
                                    const data = await response.json();
                                    setPathData(data);
                                    setLoading(false);
                          } catch (error) {
                                    console.error('Error fetching learning path:', error);
                                    setLoading(false);
                          }
                  };

                  if (id) {
                          fetchPathData();
                  }
    }, [id]);

    const handleModuleComplete = (moduleIndex) => {
          if (!completedModules.includes(moduleIndex)) {
                  setCompletedModules([...completedModules, moduleIndex]);
          }
          // Move to next module if available
          if (moduleIndex + 1 < pathData?.modules?.length) {
                  setCurrentModule(moduleIndex + 1);
          }
    };

    const calculateProgress = () => {
          if (!pathData?.modules) return 0;
          return Math.round((completedModules.length / pathData.modules.length) * 100);
    };

    if (loading) {
          return (
                  <div className="flex items-center justify-center min-h-screen">
                          <div className="text-xl font-semibold">Loading learning path...</div>div>
                  </div>div>
                );
    }
  
    if (!pathData) {
          return (
                  <div className="flex items-center justify-center min-h-screen">
                          <div className="text-center">
                                    <h1 className="text-2xl font-bold mb-4">Learning Path Not Found</h1>h1>
                                    <button
                                                  onClick={() => navigate('/pathways')}
                                                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                                >
                                                Back to Pathways
                                    </button>button>
                          </div>div>
                  </div>div>
                );
    }
  
    return (
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
                <div className="bg-white border-b">
                        <div className="max-w-6xl mx-auto px-6 py-8">
                                  <button
                                                onClick={() => navigate(-1)}
                                                className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
                                              >
                                              ← Back
                                  </button>button>
                                  <h1 className="text-4xl font-bold mb-2">{pathData.title}</h1>h1>
                                  <p className="text-gray-600 mb-6">{pathData.description}</p>p>
                                  
                          {/* Progress Bar */}
                                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                              <div
                                                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                                              style={{ width: `${calculateProgress()}%` }}
                                                            ></div>div>
                                  </div>div>
                                  <p className="text-sm text-gray-600">{calculateProgress()}% Complete</p>p>
                        </div>div>
                </div>div>
          
            {/* Main Content */}
                <div className="max-w-6xl mx-auto px-6 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                          {/* Sidebar - Module List */}
                                  <div className="lg:col-span-1">
                                              <div className="sticky top-6 bg-white rounded-lg shadow p-6">
                                                            <h2 className="text-lg font-bold mb-4">Modules</h2>h2>
                                                            <div className="space-y-2">
                                                              {pathData.modules?.map((module, index) => (
                              <button
                                                    key={index}
                                                    onClick={() => setCurrentModule(index)}
                                                    className={`w-full text-left p-3 rounded-lg transition-all ${
                                                                            index === currentModule
                                                                              ? 'bg-blue-600 text-white'
                                                                              : completedModules.includes(index)
                                                                              ? 'bg-green-100 text-gray-800'
                                                                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                    }`}
                                                  >
                                                  <div className="flex items-center">
                                                    {completedModules.includes(index) && (
                                                                            <span className="mr-2">✓</span>span>
                                                                        )}
                                                                        <span className="font-medium">Module {index + 1}</span>span>
                                                  </div>div>
                                                  <div className="text-sm opacity-75 mt-1">{module.title}</div>div>
                              </button>button>
                            ))}
                                                            </div>div>
                                              </div>div>
                                  </div>div>
                        
                          {/* Main Content Area */}
                                  <div className="lg:col-span-3">
                                    {pathData.modules && pathData.modules[currentModule] && (
                          <div className="bg-white rounded-lg shadow p-8">
                                          <h2 className="text-3xl font-bold mb-4">
                                                            Module {currentModule + 1}: {pathData.modules[currentModule].title}
                                          </h2>h2>
                                          <p className="text-gray-600 mb-6 leading-relaxed">
                                            {pathData.modules[currentModule].description}
                                          </p>p>
                          
                            {/* Module Content */}
                                          <div className="mb-8 prose max-w-none">
                                            {pathData.modules[currentModule].content && (
                                                <div
                                                                        dangerouslySetInnerHTML={{
                                                                                                  __html: pathData.modules[currentModule].content
                                                                          }}
                                                                      />
                                              )}
                                          </div>div>
                          
                            {/* Resources */}
                            {pathData.modules[currentModule].resources?.length > 0 && (
                                              <div className="mb-8">
                                                                  <h3 className="text-xl font-bold mb-4">Resources</h3>h3>
                                                                  <div className="space-y-3">
                                                                    {pathData.modules[currentModule].resources.map((resource, idx) => (
                                                                        <a
                                                                                                    key={idx}
                                                                                                    href={resource.url}
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                    className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                                                                                                  >
                                                                                                  <div className="font-semibold text-blue-900">{resource.title}</div>div>
                                                                                                  <div className="text-sm text-blue-700 mt-1">{resource.description}</div>div>
                                                                        </a>a>
                                                                      ))}
                                                                  </div>div>
                                              </div>div>
                                          )}
                          
                            {/* Navigation Buttons */}
                                          <div className="flex justify-between items-center pt-8 border-t">
                                                            <button
                                                                                  onClick={() => setCurrentModule(Math.max(0, currentModule - 1))}
                                                                                  disabled={currentModule === 0}
                                                                                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
                                                                                >
                                                                                ← Previous
                                                            </button>button>
                                          
                                            {!completedModules.includes(currentModule) && (
                                                <button
                                                                        onClick={() => handleModuleComplete(currentModule)}
                                                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                                      >
                                                                      Mark as Complete
                                                </button>button>
                                                            )}
                                          
                                                            <button
                                                                                  onClick={() => setCurrentModule(Math.min(pathData.modules.length - 1, currentModule + 1))}
                                                                                  disabled={currentModule === pathData.modules.length - 1}
                                                                                  className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
                                                                                >
                                                                                Next →
                                                            </button>button>
                                          </div>div>
                          </div>div>
                                              )}
                                  </div>div>
                        </div>div>
                </div>div>
          </div>div>
        );
};

export default LearningPath;</div>
