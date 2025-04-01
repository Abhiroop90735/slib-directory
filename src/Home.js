import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import libraries from './libraries.json'; // Local data

function Home({ setSelectedLibs }) {
  const [search, setSearch] = useState('');
  const [filteredLibs, setFilteredLibs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredLibs(libraries);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const results = libraries.filter(lib =>
      lib.name.toLowerCase().includes(query)
    );
    setFilteredLibs(results);
  };

  const handleFilter = (e) => {
    const os = e.target.value;
    const results = libraries.filter(lib =>
      lib.os.includes(os) || os === "All"
    );
    setFilteredLibs(results);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Welcome to SLIB Directory</h2>
        <button
          onClick={() => navigate('/feedback')}
          style={{
            padding: "10px 20px",
            background: "#6c63ff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Contact Us
        </button>
      </div>

      {/* 📊 Library Stats */}
      <div style={{
        marginBottom: "20px",
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
        <h4 style={{ marginBottom: "10px" }}>📊 Library Summary</h4>
        <p><strong>Total Libraries:</strong> {filteredLibs.length}</p>
        <p><strong>Unique OS Supported:</strong> {
          Array.from(new Set(filteredLibs.flatMap(lib => lib.os))).join(", ")
        }</p>
        <p><strong>License Types:</strong> {
          Array.from(new Set(filteredLibs.map(lib => lib.license))).join(", ")
        }</p>
      </div>

      {/* 🔍 Filter + Search + Compare */}
      <div style={{ marginBottom: "30px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <select
          onChange={handleFilter}
          style={{ padding: "10px", borderRadius: "6px", minWidth: "120px" }}
        >
          <option value="All">All OS</option>
          <option value="Mac">Mac</option>
          <option value="Windows">Windows</option>
          <option value="Linux">Linux</option>
        </select>

        <input
          type="text"
          placeholder="Search libraries..."
          value={search}
          onChange={handleSearch}
          style={{ padding: "10px", borderRadius: "6px", flex: "1", minWidth: "250px" }}
        />

        <button
          onClick={() => navigate('/compare')}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Go to Compare
        </button>
      </div>

      {/* 📚 Library Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredLibs.map((lib, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "16px",
              padding: "20px",
              width: "260px",
              background: "#fff",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.05)";
            }}
          >
            <Link
              to={`/details/${encodeURIComponent(lib.name)}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h3 style={{ color: "#007bff", marginBottom: "10px" }}>{lib.name}</h3>
            </Link>
            <p><strong>Version:</strong> {lib.version}</p>
            <p><strong>OS:</strong> {lib.os.join(", ")}</p>
            <p><strong>License:</strong> {lib.license}</p>

            <button
              onClick={() => {
                const confirmAdd = window.confirm("Add this library to compare?");
                if (confirmAdd) {
                  setSelectedLibs(prev => [...prev, lib]);
                  alert(`${lib.name} added to compare`);
                }
              }}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Add to Compare
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
