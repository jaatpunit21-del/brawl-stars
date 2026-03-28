import React from 'react';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Checkout from './components/Checkout';
import Admin from './components/Admin';
import Login from './components/Login';
import SupportButton from './components/SupportButton';
import PrivateChat from './components/PrivateChat';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react"


function App() {
  const [currentView, setCurrentView] = React.useState('landing');
  const [selectedGame, setSelectedGame] = React.useState('brawl');
  const [orderSummary, setOrderSummary] = React.useState(null);

  // Initialize user from localStorage for persistence
  const [user, setUser] = React.useState(() => {
    const saved = localStorage.getItem('brawlStarsUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync user to localStorage
  React.useEffect(() => {
    if (user) {
      localStorage.setItem('brawlStarsUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('brawlStarsUser');
    }
  }, [user]);

  const handleSelectGame = (gameId) => {
    if (gameId === 'admin') {
      setCurrentView('admin');
      return;
    }

    setSelectedGame(gameId);
    setCurrentView('dashboard');
  };

  const handleUserLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const triggerLogin = () => {
    setCurrentView('login');
  };

  const triggerChat = () => {
    if (!user) {
      setCurrentView('login');
    } else {
      setCurrentView('chat');
    }
  };

  const handleCheckout = (order) => {
    setOrderSummary(order);
    setCurrentView('checkout');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className={`app-container app-bg`} style={{
      position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden',
      backgroundImage: `linear-gradient(rgba(0,0,0,${currentView === 'landing' ? '0.7' : '0.4'}), rgba(0,0,0,${currentView === 'landing' ? '0.8' : '0.6'})), url(${currentView === 'landing' ? '/premium-bg.png' : (selectedGame === 'wow' ? '/wow-bg.png' : (selectedGame === 'fortnite' ? '/fortnite-bg.png' : '/premium-bg.png'))})`,
      backgroundColor: 'var(--color-bg)'
    }}>

      {currentView !== 'landing' && (
        <div style={{
          width: '100%',
          padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1rem, 5vw, 2rem)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          position: 'sticky',
          top: 0,
          gap: '15px'
        }}>
          <span
            onClick={() => setCurrentView('landing')}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
              color: 'var(--color-gold-light)',
              letterSpacing: '2px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--color-gold)'}
            onMouseOut={(e) => e.target.style.color = 'var(--color-gold-light)'}
            title="Return to Game Selection"
          >
            {selectedGame === 'wow' ? 'WORLD OF WARCRAFT' : (selectedGame === 'fortnite' ? 'FORTNITE' : 'BRAWL STARS')}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <Landing key="landing" onSelect={handleSelectGame} />
        )}
        {currentView === 'login' && <Login key="login" onLogin={handleUserLogin} />}
        {currentView === 'dashboard' && (
          <Dashboard
            key="dashboard"
            user={user}
            selectedGame={selectedGame}
            onLogin={triggerLogin}
            onCheckout={handleCheckout}
            onBack={() => setCurrentView('landing')}
          />
        )}
        {currentView === 'checkout' && <Checkout key="checkout" user={user} order={orderSummary} onBack={() => setCurrentView('dashboard')} />}
        {currentView === 'admin' && <Admin key="admin" onLogout={() => setCurrentView('landing')} />}
        {currentView === 'chat' && <PrivateChat user={user} onBack={() => setCurrentView('dashboard')} />}
      </AnimatePresence>
      <SupportButton user={user} onLogin={triggerLogin} onOpenChat={triggerChat} />
    </div>
  );
}

export default App;
