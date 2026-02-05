import { useState, useEffect } from 'react';
import logo from './assets/casblogo.svg';
import EventCalendar from './components/EventCalendar';
import Footer from './components/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 0.8 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 800);

    // Remove splash screen after fade completes
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (showSplash) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <img
          src={logo}
          alt="CASB Logo"
          style={{
            width: '400px',
            maxWidth: '80%',
            height: 'auto',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.5s ease-in',
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      <div style={{ flex: 1, padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to CASB</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
            Check out our upcoming events
          </p>
        </div>
        <EventCalendar />
      </div>
      <Footer />
    </div>
  );
}
