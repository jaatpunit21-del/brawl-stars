import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, CreditCard } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Checkout = ({ user, order, onBack }) => {
  const [orderSaved, setOrderSaved] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=vigyanshughanghas@gmail.com&item_name=${encodeURIComponent('Master2Boosting - ' + (order?.service || 'Service'))}&amount=${order?.finalPrice || 0}&currency_code=USD`;

  const handlePayment = async () => {
    try {
      await addDoc(collection(db, 'orders'), {
        orderId: 'ORD-' + Math.floor(Math.random() * 9000 + 1000),
        discordTag: order?.discordTag || user?.tag || 'Guest',
        service: order?.service || 'Unknown',
        details: order?.details || '',
        price: order?.finalPrice ? `$${order.finalPrice}` : 'TBD',
        status: 'Pending Payment',
        isCustom: order?.isCustom || false,
        createdAt: serverTimestamp(),
      });
      setOrderSaved(true);
    } catch (e) {
      console.error('Failed to save order:', e);
      setSaveError('Could not save order. Check Firebase config.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="section-padding container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '6rem',
        paddingBottom: '4rem'
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button 
            onClick={onBack} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              color: 'var(--color-text-muted)', 
              fontSize: '0.9rem',
              transition: 'var(--transition-fast)'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
          >
            <ArrowLeft size={18} /> BACK TO SERVICE
          </button>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '0.9rem' }}>
            <Lock size={16} /> 256-BIT ENCRYPTION
          </div>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontFamily: 'var(--font-serif)', color: 'var(--color-gold-light)', marginBottom: '3rem', textAlign: 'center' }}>
          Finalize Your Exclusivity
        </h1>

        <div className="two-column-grid">
          
          {/* Order Snapshot */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-gold)', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
              Your Selection
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Service</span>
                <span style={{ fontWeight: 600 }}>{order?.service || 'Master2Boosting Service'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Details</span>
                <span style={{ fontWeight: 500, color: 'var(--color-gold-light)' }}>{order?.details || 'Pro Package'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Customer ID</span>
                <span style={{ fontWeight: 600, color: '#7289DA' }}>{order?.discordTag || user?.tag || 'Guest Account'}</span>
              </div>
              {!order?.isCustom && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                  <span>Discount Applied</span>
                  <span>-$ {order?.savings || '0.00'}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>Total Cost</span>
              <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-sans)', color: 'var(--color-price-green)', textShadow: '0 0 15px rgba(46, 204, 113, 0.4)' }}>
                {order?.isCustom ? 'TBD on Dashboard' : `$${order?.finalPrice || '0.00'}`}
              </span>
            </div>
          </div>

          {/* Payment Gateway */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-gold)', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
              {order?.isCustom ? 'Submit Order' : 'Payment Method'}
            </h3>

            {order?.isCustom ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, justifyContent: 'center' }}>
                <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '1rem' }}>
                  Your custom order details will be securely submitted to our boosting managers for review.
                </p>
                <button style={{
                  padding: '1.2rem',
                  border: '1px solid var(--color-gold)',
                  borderRadius: '8px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--color-gold-light)',
                  boxShadow: 'var(--glow-gold)'
                }}>
                  Submit for Review
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <a 
                   href={paypalUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   onClick={handlePayment}
                   style={{
                     padding: '1.2rem',
                     border: '1px solid var(--color-gold)',
                     borderRadius: '8px',
                     background: 'rgba(212, 175, 55, 0.1)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '12px',
                     fontSize: '1.1rem',
                     fontWeight: 600,
                     color: 'var(--color-gold-light)',
                     boxShadow: 'var(--glow-gold)',
                     textDecoration: 'none',
                     transition: 'var(--transition-fast)'
                   }}
                   onMouseOver={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)'}
                   onMouseOut={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 16V22H11V16H15L17 10H11V8C11 7.44772 11.4477 7 12 7H16V1H12C8.68629 1 6 3.68629 6 7V10H4V16H7Z" fill="currentColor"/>
                  </svg>
                  Pay via PayPal
                </a>

                <a 
                   href={paypalUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   onClick={handlePayment}
                   style={{
                     padding: '1.2rem',
                     border: '1px solid rgba(255,255,255,0.1)',
                     borderRadius: '8px',
                     background: 'rgba(255,255,255,0.02)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '12px',
                     fontSize: '1.1rem',
                     color: 'var(--color-text)',
                     textDecoration: 'none',
                     transition: 'var(--transition-fast)'
                   }}
                   onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                   onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  <CreditCard size={20} />
                  Credit Card
                </a>
                {orderSaved && (
                  <p style={{ color: 'var(--color-success)', fontSize: '0.8rem', textAlign: 'center', marginTop: '0.5rem' }}>✓ Order logged. Redirecting to payment...</p>
                )}
                {saveError && (
                  <p style={{ color: '#ff4d4d', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.5rem' }}>{saveError}</p>
                )}
              </div>
            )}

            {!order?.isCustom && (
              <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Shield size={14} color="var(--color-success)" /> SECURE CHECKOUT PROCESSED BY STRIPE & PAYPAL
              </p>
            )}

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Checkout;
