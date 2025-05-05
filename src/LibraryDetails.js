
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function LibraryDetails() {
  const { name } = useParams();
  const [library, setLibrary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'libraries'));
        const libs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const foundLib = libs.find(lib => lib.name === decodeURIComponent(name));
        setLibrary(foundLib);
      } catch (error) {
        console.error('Error fetching library:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLibrary();
  }, [name]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!library) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Library Not Found</h2>
        <Link to="/home" className="text-blue-600 hover:underline mt-4 block">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">{library.name}</h1>
        <p className="text-gray-700 mb-2"><strong>Version:</strong> {library.version}</p>
        <p className="text-gray-700 mb-2"><strong>Category:</strong> {library.category}</p>
        <p className="text-gray-700 mb-2"><strong>License:</strong> {library.license}</p>
        <p className="text-gray-700 mb-2"><strong>Cost:</strong> {library.cost}</p>
        <p className="text-gray-700 mb-2"><strong>Supported OS:</strong> {library.os.join(', ')}</p>
        <p className="text-gray-700 mb-4"><strong>Supplier:</strong> {library.supplier || 'N/A'}</p>
        <p className="text-gray-700 mb-4"><strong>Dependencies:</strong> {library.dependencies.length > 0 ? library.dependencies.join(', ') : 'None'}</p>
        
        <p className="text-gray-700 mb-6">{library.description}</p>

        <h2 className="text-xl font-semibold mb-2">Sample Code:</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 mb-6">
          {library.sampleCode}
        </pre>

        <a
          href={library.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Visit Official Website →
        </a>

        <div className="mt-8">
          <Link to="/home" className="text-blue-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default LibraryDetails;
