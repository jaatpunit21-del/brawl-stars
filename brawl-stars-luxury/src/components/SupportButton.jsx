import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, LogIn, ExternalLink } from 'lucide-react';

const SupportButton = ({ user, onLogin, onOpenChat }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSupportClick = () => {
    if (!user) {
      onLogin(); 
      return;
    }
    setIsOpen(false);
    // Direct transfer to the official Master2Boosting Discord Server
    window.open('https://discord.gg/j6SJn9q4KB', '_blank');
  };

  return (
    <div style={{ position: 'fixed', bottom: 'clamp(1rem, 4vw, 2rem)', right: 'clamp(1rem, 4vw, 2rem)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            style={{
              position: 'relative', bottom: '1.5rem', right: 0, width: 'clamp(260px, 80vw, 300px)',
              background: 'rgba(20, 20, 20, 0.95)', border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '16px', padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(10px)', marginBottom: '1rem'
            }}
          >
            <h4 style={{ color: 'var(--color-gold)', marginBottom: '0.8rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle size={18} /> LIVE SUPPORT
            </h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Need help with your rank push or have a custom request? Message our lead booster directly.
            </p>
            
            {user ? (
              <button 
                onClick={handleSupportClick}
                className="btn-primary" 
                style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                JOIN OUR SERVER <ExternalLink size={14} />
              </button>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#ff4d4d', fontSize: '0.75rem', marginBottom: '1rem', fontWeight: 600 }}>LOGIN REQUIRED TO MESSAGE</p>
                <button 
                   onClick={onLogin}
                   className="btn-primary" 
                   style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', background: '#5865F2', border: 'none' }}
                >
                  Login with Discord <LogIn size={14} style={{ marginLeft: '8px', display: 'inline' }} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 'clamp(50px, 12vw, 60px)', height: 'clamp(50px, 12vw, 60px)', borderRadius: '50%', background: 'var(--color-gold)',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)', cursor: 'pointer', position: 'relative'
        }}
      >
        <MessageCircle color="black" size={28} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', background: 'var(--color-success)', borderRadius: '50%', border: '2px solid black' }} />
      </motion.button>
    </div>
  );
};

export default SupportButton;
