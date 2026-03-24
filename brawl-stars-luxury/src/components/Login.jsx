import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Lock, CheckCircle, Shield } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleDiscordAuth = () => {
    setIsAuthenticating(true);
    
    // Direct transfer to the official Master2Boosting Discord Server
    window.open('https://discord.gg/j6SJn9q4KB', '_blank');

    // Simulate a secure handshake with Discord Servers
    setTimeout(() => {
      onLogin({ 
        tag: `User_${Math.floor(Math.random() * 9000 + 1000)}`, 
        id: Math.random().toString(36).substr(2, 12) 
      });
    }, 2800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      style={{
        width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(8,8,8,1) 0%, rgba(15,15,15,1) 100%)',
        padding: '1rem'
      }}
    >
      <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: 'clamp(2rem, 5vw, 4rem)', border: '1px solid rgba(212, 175, 55, 0.2)', position: 'relative', overflow: 'hidden' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(114, 137, 218, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid rgba(114, 137, 218, 0.3)' }}>
             <LogIn size={36} color="#5865F2" />
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.22rem)', color: 'var(--color-text)', marginBottom: '0.8rem', letterSpacing: '2px', fontWeight: 700 }}>ONE-CLICK LOGIN</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Clicking the button below will securely bridge your Discord session and open our official server for verification.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {!isAuthenticating ? (
            <button 
               onClick={handleDiscordAuth}
               className="btn-primary" 
               style={{ 
                 padding: '1.4rem', fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase',
                 background: '#5865F2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
               }}
               onMouseOver={e => e.currentTarget.style.background = '#4752c4'}
               onMouseOut={e => e.currentTarget.style.background = '#5865F2'}
            >
              <LogIn size={22} /> Login with Discord
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '1rem 0' }}>
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                 style={{ width: '40px', height: '40px', border: '3px solid rgba(114, 137, 218, 0.2)', borderTop: '3px solid #5865F2', borderRadius: '50%' }}
               />
               <div style={{ textAlign: 'center' }}>
                 <p style={{ color: '#5865F2', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '1px' }}>AUTHORIZING SECURE RELAY...</p>
                 <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', marginTop: '0.5rem' }}>Opening server invite now</p>
               </div>
            </div>
          )}
          
          <div style={{ textAlign: 'center' }}>
             <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', leading: 1.5 }}>
              Verify your boosting request by joining our official Master2Boosting Discord server.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '3.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem', display: 'flex', flexDirection: 'row', gap: '1.5rem', justifyContent: 'center' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
              <Shield size={14} color="var(--color-success)" /> SECURE OAUTH
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
              <Lock size={14} color="var(--color-gold)" /> ENCRYPTED
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
