import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [newLibrary, setNewLibrary] = useState(defaultLibrary());
  const [editingId, setEditingId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  function defaultLibrary() {
    return {
      name: '',
      version: '',
      category: '',
      license: '',
      cost: '',
      description: '',
      website: '',
      os: '',
    };
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
      else navigate('/');
    });
    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    if (userEmail === 'abhiroop.m6@gmail.com') {
      fetchFeedbacks();
      fetchLibraries();
    }
  }, [userEmail]);

  const fetchFeedbacks = async () => {
    const snapshot = await getDocs(collection(db, 'feedback'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFeedbacks(data);
  };

  const fetchLibraries = async () => {
    const snapshot = await getDocs(collection(db, 'libraries'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLibraries(data);
  };

  const handleInput = (e) => {
    setNewLibrary({ ...newLibrary, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...newLibrary,
      os: newLibrary.os.split(',').map(os => os.trim()),
    };

    if (editingId) {
      await updateDoc(doc(db, 'libraries', editingId), payload);
      alert('Library updated!');
    } else {
      await addDoc(collection(db, 'libraries'), payload);
      alert('Library added!');
    }

    setNewLibrary(defaultLibrary());
    setEditingId(null);
    fetchLibraries();
  };

  const handleEdit = (lib) => {
    setNewLibrary({ ...lib, os: lib.os.join(', ') });
    setEditingId(lib.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this library?')) {
      await deleteDoc(doc(db, 'libraries', id));
      fetchLibraries();
    }
  };

  if (userEmail !== 'abhiroop.m6@gmail.com') {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        ❌ Unauthorized Access
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
        <button onClick={() => navigate('/home')} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Back to Home
        </button>
      </div>

      {/* Feedback */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">User Feedback</h2>
        <div className="bg-white shadow p-4 rounded-md max-h-64 overflow-y-auto">
          {feedbacks.length === 0 ? (
            <p className="text-gray-500">No feedback submitted yet.</p>
          ) : (
            <ul className="space-y-2">
              {feedbacks.map((f) => (
                <li key={f.id} className="border p-2 rounded bg-gray-50">
                  <strong>{f.email}</strong>: {f.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Add/Edit */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">{editingId ? 'Edit Library' : 'Add New Library'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow p-6 rounded-md">
          {['name', 'version', 'category', 'license', 'cost', 'website', 'os'].map((key) => (
            <input
              key={key}
              name={key}
              value={newLibrary[key]}
              onChange={handleInput}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="border px-3 py-2 rounded w-full"
            />
          ))}

          <textarea
            name="description"
            value={newLibrary.description}
            onChange={handleInput}
            placeholder="Description"
            className="border px-3 py-2 rounded col-span-2"
            rows={3}
          />

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white py-2 px-4 rounded col-span-2 hover:bg-green-700"
          >
            {editingId ? 'Update Library' : 'Add Library'}
          </button>
        </div>
      </section>

      {/* View/Edit/Delete Libraries */}
      <section>
        <h2 className="text-xl font-semibold mb-2">All Libraries</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {libraries.map((lib) => (
            <div key={lib.id} className="bg-white p-4 rounded shadow border">
              <h3 className="text-lg font-bold text-gray-700">{lib.name}</h3>
              <p className="text-sm text-gray-500">{lib.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(lib)}
                  className="px-3 py-1 bg-yellow-400 text-white text-xs rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(lib.id)}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Admin;
