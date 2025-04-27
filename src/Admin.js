import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Admin = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const querySnapshot = await getDocs(collection(db, 'feedbacks'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeedbacks(data);
    };

    fetchFeedbacks();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>📬 User Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedbacks found.</p>
      ) : (
        feedbacks.map(fb => (
          <div key={fb.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <p><strong>Name:</strong> {fb.name}</p>
            <p><strong>Message:</strong> {fb.message}</p>
            <p><em>{new Date(fb.createdAt?.seconds * 1000).toLocaleString()}</em></p>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
