import React from 'react';
import { motion } from 'framer-motion';
import Reviews from './Reviews';
import SEOContent from './SEOContent';

const Landing = ({ onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
      className="section-padding"
      style={{
        width: '100%',
        minHeight: '100vh',
        paddingTop: '6rem',
        paddingBottom: '4rem'
      }}
    >
      <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '3rem', width: '100%' }}
      >
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', marginBottom: '1rem', letterSpacing: '2px' }}>
          BRAWL STARS BOOSTING
        </h1>
        <div style={{ color: 'var(--color-gold)', fontSize: '1rem', letterSpacing: '4px', marginBottom: '2rem', fontWeight: 600 }}>MASTER2BOOSTING</div>
        <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: 'var(--color-gold)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: 'clamp(2px, 2vw, 4px)' }}>
          Elite Multi-Game Agency | Global Authority
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '2.5rem' }}>
          <span style={{ height: '1px', width: '30px', background: 'var(--color-gold)', opacity: 0.3 }}></span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-gold-light)', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 500 }}>
             Exclusively Boosted by Top 1,000 Global Leaderboard Professionals
          </span>
          <span style={{ height: '1px', width: '30px', background: 'var(--color-gold)', opacity: 0.3 }}></span>
        </div>
        <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>
          Unrivaled performance across Brawl Stars, Fortnite, and WoW. Verified mastery from the world's most elite competitive players.
        </p>
      </motion.div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        {/* Brawl Stars Card */}
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: 'var(--glow-gold-strong)',
            borderColor: 'var(--color-gold)'
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={() => onSelect('brawl')}
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '320px',
            height: '420px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            transition: 'border-color 0.3s ease'
          }}
        >
          <div 
             title="Brawl Stars Arena background"
             style={{
               position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
               backgroundImage: 'url(/premium-bg.png)',
               backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0, opacity: 0.8
             }} 
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,10,0.95) 100%)', zIndex: 1 }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Brawl Stars</h2>
            <div style={{ height: '2px', width: '40px', background: 'var(--color-gold)', marginBottom: '1rem' }}></div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Secure rank pushes and mastery grinding by Top 1,000 Global specialists.
            </p>
          </div>
        </motion.div>

        {/* Fortnite Card */}
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
            borderColor: '#A855F7'
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onClick={() => onSelect('fortnite')}
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '320px',
            height: '420px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            transition: 'all 0.3s ease'
          }}
        >
          <div 
             title="Fortnite Island background"
             style={{
               position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
               backgroundImage: 'url(/fortnite-bg.png)',
               backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0, opacity: 0.7
             }} 
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,10,0.95) 100%)', zIndex: 1 }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Fortnite</h2>
            <div style={{ height: '2px', width: '40px', background: '#A855F7', marginBottom: '1rem' }}></div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Elite Arena boosting and rare unlocks by verified Top 1,000 FN competitors.
            </p>
          </div>
        </motion.div>

        {/* WoW Card */}
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
            borderColor: '#3B82F6'
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={() => onSelect('wow')}
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '320px',
            height: '420px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            transition: 'all 0.3s ease'
          }}
        >
          <div 
             title="WoW World background"
             style={{
               position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
               backgroundImage: 'url(/wow-bg.png)',
               backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0, opacity: 0.7
             }} 
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,10,0.95) 100%)', zIndex: 1 }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>World of Warcraft</h2>
            <div style={{ height: '2px', width: '40px', background: '#3B82F6', marginBottom: '1rem' }}></div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Raiding, M+ pushes, and Gladiator ratings by Top 1,000 Global veterans.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ marginTop: '4rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexDirection: 'column' }}
      >
        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', letterSpacing: '1px' }}>SELECT A TITLE TO CONTINUE</span>
        <button
          onClick={() => onSelect('admin')}
          style={{ cursor: 'pointer', color: 'rgba(212, 175, 55, 0.2)', fontSize: '0.7rem', border: 'none', background: 'none' }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(212, 175, 55, 0.2)'}
        >
          MANAGEMENT ACCESS
        </button>
      </motion.div>
      </div>

      <Reviews />
      <SEOContent />
    </motion.div>
  );
};

export default Landing;
