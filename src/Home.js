import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db, auth } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { FiGrid, FiServer } from 'react-icons/fi'; // 🗂️ Icon

function Home({ setSelectedLibs }) {
  const [search, setSearch] = useState('');
  const [allLibs, setAllLibs] = useState([]);
  const [filteredLibs, setFilteredLibs] = useState([]);
  const [selectedOS, setSelectedOS] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const getCategoryColor = (name) => {
    if (name.includes('React')) return '#61dafb';
    if (name.includes('Node') || name.includes('Express')) return '#68a063';
    if (name.includes('Python') || name.includes('Django') || name.includes('Flask')) return '#3776ab';
    if (name.includes('CSS') || name.includes('Tailwind') || name.includes('Bootstrap')) return '#2965f1';
    return '#f0db4f';
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserEmail(user.email);
      else setUserEmail('');
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        setIsLoading(true);
        const snapshot = await getDocs(collection(db, 'libraries'));
        const libs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllLibs(libs);
        setFilteredLibs(libs);
      } catch (err) {
        console.error('Error fetching libraries:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLibraries();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err.message);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    applyFilters(query, selectedOS, selectedCategory);
  };

  const handleFilterOS = (e) => {
    const os = e.target.value;
    setSelectedOS(os);
    applyFilters(search, os, selectedCategory);
  };

  const handleFilterCategory = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    applyFilters(search, selectedOS, cat);
  };

  const applyFilters = (searchQuery, osFilter, catFilter) => {
    const results = allLibs.filter(lib => {
      const matchesSearch = lib.name.toLowerCase().includes(searchQuery) || lib.description.toLowerCase().includes(searchQuery);
      const matchesOS = osFilter === "All" || lib.os.includes(osFilter);
      const matchesCategory = catFilter === "All" || (lib.category && lib.category.toLowerCase() === catFilter.toLowerCase());
      return matchesSearch && matchesOS && matchesCategory;
    });
    setFilteredLibs(results);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedOS('All');
    setSelectedCategory('All');
    setFilteredLibs(allLibs);
  };

  const addToCompare = (lib) => {
    setSelectedLibs(prev => {
      if (prev.some(item => item.id === lib.id)) {
        alert(`${lib.name} is already in comparison`);
        return prev;
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 libraries at once');
        return prev;
      }
      return [...prev, lib];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <Link to="/home" className="text-xl font-bold text-blue-600">
            SLIB Directory
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/feedback')}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
            >
              Feedback
            </button>

            {userEmail && (
              <span className="text-gray-600 text-sm hidden sm:inline">
                Welcome, <span className="font-medium">{userEmail}</span>
              </span>
            )}
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search libraries..."
              value={search}
              onChange={handleSearch}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <FiServer className="text-gray-400" />
            <select
              value={selectedOS}
              onChange={handleFilterOS}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500"
            >
              <option value="All">All Platforms</option>
              <option value="Mac">macOS</option>
              <option value="Windows">Windows</option>
              <option value="Linux">Linux</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <FiGrid className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={handleFilterCategory}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Frontend Framework">Frontend Framework</option>
              <option value="Backend Framework">Backend Framework</option>
              <option value="Database">Database</option>
              <option value="Testing">Testing</option>
              <option value="Utilities">Utilities</option>
              {/* Add more if needed */}
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Reset
          </button>

          <button
            onClick={() => navigate('/compare')}
            className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Compare ({setSelectedLibs.length})
          </button>
        </div>

        {/* Libraries */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-t-2 border-blue-500 rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLibs.map((lib) => (
              <LibraryCard key={lib.id} lib={lib} addToCompare={addToCompare} getCategoryColor={getCategoryColor} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Subcomponents
const LibraryCard = ({ lib, addToCompare, getCategoryColor }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 border border-gray-100">
    <div className="h-2 w-full" style={{ backgroundColor: getCategoryColor(lib.name) }}></div>
    <div className="mt-4">
      <Link to={`/details/${encodeURIComponent(lib.name)}`} className="group">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600">{lib.name}</h3>
      </Link>
      <p className="text-gray-600 text-sm mt-2">{lib.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {lib.os.map((os, i) => (
          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-md">{os}</span>
        ))}
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">{lib.license}</span>
      </div>
      {lib.category && (
        <div className="mt-2 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md inline-block">
          {lib.category}
        </div>
      )}
    </div>
    <div className="flex justify-between items-center mt-6">
      <a href={lib.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
        Website
      </a>
      <button
        onClick={() => addToCompare(lib)}
        className="text-sm px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
      >
        Compare
      </button>
    </div>
  </div>
);

export default Home;
