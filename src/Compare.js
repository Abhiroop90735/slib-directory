import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Compare({ selectedLibs, setSelectedLibs }) {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  const handleRemove = (id) => {
    const filtered = selectedLibs.filter((lib) => lib.id !== id);
    setSelectedLibs(filtered);
    setToastMessage('Library removed from comparison!');
    setTimeout(() => setToastMessage(''), 2000);
  };

  const getHighestVersion = () => {
    if (selectedLibs.length === 0) return '';
    return selectedLibs.reduce((highest, lib) => {
      if (!highest) return lib.version;
      return lib.version > highest ? lib.version : highest;
    }, '');
  };

  const highestVersion = getHighestVersion();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Compare <span className="text-blue-600">Libraries</span>
        </h1>
        <button
          onClick={() => navigate('/home')}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ← Back to Home
        </button>
      </div>

      {/* No libraries selected */}
      {selectedLibs.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-20">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-5332377-4451309.png"
            alt="No libraries"
            className="w-64 mb-6"
          />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No libraries selected</h2>
          <p className="text-gray-500 mb-6">Pick libraries to compare side-by-side!</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            🔍 Browse Libraries
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {selectedLibs.map((lib) => (
              <motion.div
                key={lib.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white rounded-lg shadow-md p-6 relative flex flex-col justify-between border border-gray-200 hover:shadow-lg transition"
              >
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(lib.id)}
                  className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-7 h-7 flex items-center justify-center"
                  title="Remove from comparison"
                >
                  ×
                </button>

                {/* Library Details */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{lib.name}</h2>

                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Version:</strong>{' '}
                    {lib.version === highestVersion ? (
                      <span className="text-green-600 font-semibold">
                        {lib.version} 🔥 Latest
                      </span>
                    ) : (
                      lib.version
                    )}
                  </p>

                  <p className="text-sm text-gray-600 mb-1">
                    <strong>License:</strong>{' '}
                    {['MIT', 'Apache 2.0'].includes(lib.license) ? (
                      <span className="text-green-600 font-semibold">{lib.license} ✅</span>
                    ) : (
                      lib.license
                    )}
                  </p>

                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Category:</strong> {lib.category || 'N/A'}
                  </p>

                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Cost:</strong> {lib.cost || 'N/A'}
                  </p>

                  <p className="text-sm text-gray-600 mb-1">
                    <strong>OS Supported:</strong> {lib.os.join(', ')}
                  </p>

                  {lib.dependencies && (
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Dependencies:</strong> {lib.dependencies.join(', ')}
                    </p>
                  )}

                  {lib.description && (
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Description:</strong> {lib.description}
                    </p>
                  )}
                </div>

                {/* Sample Code Block */}
                {lib.sampleCode && (
                  <div className="bg-gray-100 p-4 rounded-lg mt-4 text-xs text-gray-700 overflow-y-auto max-h-60">
                    <strong>Sample Code:</strong>
                    <pre className="mt-2 whitespace-pre-wrap">{lib.sampleCode}</pre>
                  </div>
                )}

                {/* Website Link */}
                {lib.website && (
                  <a
                    href={lib.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-blue-600 hover:underline text-sm"
                  >
                    🌐 Visit Website
                  </a>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Compare;