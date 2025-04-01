import React from 'react';

function Compare({ selectedLibs }) {
  if (selectedLibs.length < 2) {
    return (
      <div style={{ padding: "30px", fontFamily: "'Segoe UI', sans-serif" }}>
        <h2>Compare Libraries</h2>
        <p>Please select 2 libraries from the Home page to compare.</p>
      </div>
    );
  }

  const [lib1, lib2] = selectedLibs;

  return (
    <div style={{ padding: "30px", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2>Compare Libraries</h2>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {[lib1, lib2].map((lib, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "20px",
              width: "300px",
              background: "#f9f9f9",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}
          >
            <h3>{lib.name}</h3>
            <p><strong>Version:</strong> {lib.version}</p>
            <p><strong>OS:</strong> {lib.os.join(", ")}</p>
            <p><strong>License:</strong> {lib.license}</p>
            <p><strong>Sample Code:</strong></p>
            <pre style={{
              background: "#eee",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "0.9em"
            }}>
              {lib.sample}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Compare;
