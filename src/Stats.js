import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Stats() {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    const fetchLibraries = async () => {
      const snapshot = await getDocs(collection(db, 'libraries'));
      const libs = snapshot.docs.map(doc => doc.data());
      setLibraries(libs);
    };
    fetchLibraries();
  }, []);

  const countByField = (field) => {
    const map = {};
    libraries.forEach(lib => {
      const keys = Array.isArray(lib[field]) ? lib[field] : [lib[field] || 'Unknown'];
      keys.forEach(key => {
        map[key] = (map[key] || 0) + 1;
      });
    });
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">📊 Library Statistics</h1>

      {[{ label: 'Category', field: 'category', color: '#3182ce' },
        { label: 'OS Supported', field: 'os', color: '#38a169' },
        { label: 'License', field: 'license', color: '#d69e2e' }].map(({ label, field, color }) => (
        <div className="mb-12" key={field}>
          <h2 className="text-xl font-semibold mb-4">Libraries per {label}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countByField(field)}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill={color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}

export default Stats;
