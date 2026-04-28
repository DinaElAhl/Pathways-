import React, { useState, useMemo } from 'react';
import { accreditedExams, examCategories, examRegions } from '../data/accreditedExams';

export default function AccreditedExams() {
  const [selectedCategory, setSelectedCategory] = useState('All Exams');
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExams = useMemo(() => {
    return accreditedExams.filter(exam => {
      const matchesCategory = selectedCategory === 'All Exams' || exam.category === selectedCategory;
      const matchesRegion = selectedRegion === 'Global' || exam.countries.includes(selectedRegion) || exam.countries.includes('Global');
      const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesRegion && matchesSearch;
    });
  }, [selectedCategory, selectedRegion, searchQuery]);

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'bg-gray-100 text-gray-700';
    if (difficulty <= 2) return 'bg-green-100 text-green-700';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getDifficultyLabel = (difficulty) => {
    if (!difficulty) return null;
    if (difficulty <= 2) return 'Beginner';
    if (difficulty <= 3) return 'Intermediate';
    return 'Advanced';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Accredited Exams Worldwide
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover and compare language proficiency tests, university entrance exams, and professional certifications recognized globally.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Exams
              </label>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                {examCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                {examRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredExams.length}</span> exam{filteredExams.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Exams Grid */}
        {filteredExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map(exam => (
              <div
                key={exam.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-blue-500 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{exam.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2">
                    {exam.category}
                  </span>
                </div>

                {exam.difficulty && (
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-3 w-fit ${getDifficultyColor(exam.difficulty)}`}>
                    {getDifficultyLabel(exam.difficulty)} (Difficulty: {exam.difficulty}/5)
                  </span>
                )}

                <p className="text-gray-600 text-sm mb-4">{exam.description}</p>

                <div className="space-y-2 text-sm mb-4 bg-gray-50 p-3 rounded">
                  <div>
                    <span className="font-semibold text-gray-700">Type:</span>
                    <span className="text-gray-600 ml-2">{exam.type}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Level:</span>
                    <span className="text-gray-600 ml-2">{exam.level}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Cost:</span>
                    <span className="text-gray-600 ml-2">{exam.cost}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Availability:</span>
                    <span className="text-gray-600 ml-2 text-xs">{exam.availability}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="font-semibold text-gray-700 text-sm">Countries:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exam.countries.map(country => (
                      <span key={country} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-700">Recognized by:</span>
                    <span className="text-gray-600 ml-2">{exam.recognizedBy}</span>
                  </p>
                </div>

                {exam.prepResources && exam.prepResources.length > 0 && (
                  <div className="mb-4">
                    <p className="font-semibold text-gray-700 text-sm mb-2">Prep Resources:</p>
                    <ul className="space-y-1">
                      {exam.prepResources.map((resource, index) => (
                        <li key={index}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-xs underline"
                          >
                            {resource.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto">
                  <a
                    href={exam.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query to find exams.</p>
          </div>
        )}
      </div>
    </div>
  );
}
