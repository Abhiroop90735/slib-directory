import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Account registered! You can now log in.");
    setShowRegister(false);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: "'Segoe UI', sans-serif",
      background: '#f2f5f8'
    }}>
      {/* LEFT SIDE – Info */}
      <div style={{
        flex: 1,
        backgroundColor: '#f5f7fa',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        animation: 'fadeInLeft 1s ease'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#007bff' }}>SLIB Directory</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>
          🔍 Search, explore, and compare software libraries across platforms.
        </p>
        <ul style={{ marginTop: '20px', lineHeight: '1.8rem' }}>
          <li>✔ Search by name, category, OS</li>
          <li>✔ View license, version, and usage</li>
          <li>✔ Compare two libraries side-by-side</li>
          <li>✔ Find code examples and insights</li>
        </ul>
      </div>

      {/* RIGHT SIDE – Login/Register with animation */}
      <div style={{
        flex: 1,
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        transition: 'all 0.5s ease'
      }}>
        <div
          key={showRegister ? 'register' : 'login'}
          style={{
            maxWidth: '400px',
            margin: '0 auto',
            animation: 'fadeInUp 0.6s ease',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
        >
          {!showRegister ? (
            <form onSubmit={handleLogin}>
              <h2 style={{ marginBottom: '30px', color: '#333' }}>Login</h2>
              <input type="text" placeholder="Username" required style={inputStyle} />
              <input type="password" placeholder="Password" required style={inputStyle} />
              <button type="submit" style={buttonStyle}>Login</button>
              <p style={linkText}>
                Don’t have an account?{" "}
                <span onClick={() => setShowRegister(true)} style={linkSpan}>
                  Register here
                </span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h2 style={{ marginBottom: '30px', color: '#333' }}>Register</h2>
              <input type="text" placeholder="Full Name" required style={inputStyle} />
              <input type="email" placeholder="Email" required style={inputStyle} />
              <input type="text" placeholder="Username" required style={inputStyle} />
              <input type="password" placeholder="Password" required style={inputStyle} />
              <button type="submit" style={buttonStyle}>Register</button>
              <p style={linkText}>
                Already have an account?{" "}
                <span onClick={() => setShowRegister(false)} style={linkSpan}>
                  Go to Login
                </span>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Simple CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const linkText = {
  marginTop: '15px',
  textAlign: 'center',
  fontSize: '0.95rem'
};

const linkSpan = {
  color: '#007bff',
  cursor: 'pointer'
};

export default Login;
