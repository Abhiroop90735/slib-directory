import React from 'react';
import { useParams } from 'react-router-dom';
import libData from './libraries.json';

function LibraryDetails() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);

  // Case-insensitive match
  const lib = libData.find(
    (l) => l.name.toLowerCase() === decodedName.toLowerCase()
  );

  if (!lib) {
    return (
      <div style={{ padding: "30px", fontFamily: "'Segoe UI', sans-serif" }}>
        <h2>Library Not Found</h2>
        <p>The library you're looking for does not exist in the dataset.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2>{lib.name} - Details</h2>
      <p><strong>Version:</strong> {lib.version}</p>
      <p><strong>Supported OS:</strong> {lib.os.join(", ")}</p>
      <p><strong>License:</strong> {lib.license}</p>
      <p><strong>Example Usage:</strong></p>
      <pre style={{
        background: "#f5f5f5",
        padding: "10px",
        borderRadius: "8px",
        fontSize: "0.95em"
      }}>
        {lib.sample}
      </pre>
    </div>
  );
}

export default LibraryDetails;
