import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LayoutDashboard, Database, TrendingUp, Users, CheckCircle, Clock, AlertCircle, LogOut, RefreshCw } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from 'firebase/firestore';

const Admin = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    // Real-time Firestore listener — updates instantly whenever an order is placed
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const liveOrders = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setOrders(liveOrders);
      setLoading(false);
    }, (err) => {
      console.error('Firestore error:', err);
      setLoading(false);
    });
    return () => unsub(); // cleanup listener on unmount
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (accessKey === 'T9#vQ2!xL7@pZ4^mR8$kW1&cY5*eH3') { // Secure production key
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid Administrative Access Key');
    }
  };

  const updateStatus = async (firestoreId, nextStatus) => {
    try {
      await updateDoc(doc(db, 'orders', firestoreId), { status: nextStatus });
    } catch (e) {
      console.error('Failed to update status:', e);
    }
  };


  if (!isLoggedIn) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="admin-login-container"
        style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}
      >
        <motion.div 
          initial={{ y: 20 }} animate={{ y: 0 }}
          className="glass-panel" 
          style={{ width: '100%', maxWidth: '400px', padding: '3rem', textAlign: 'center', border: '1px solid rgba(212, 175, 55, 0.2)' }}
        >
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '1px solid var(--color-gold)' }}>
            <Lock size={28} color="var(--color-gold)" />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text)', marginBottom: '1rem', letterSpacing: '1px' }}>ADMIN AUTHENTICATION</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Secure administrative terminal access for Master2Boosting management.</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Access Key</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={accessKey}
                onChange={e => setAccessKey(e.target.value)}
                style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text)', outline: 'none' }}
              />
            </div>
            {error && <div style={{ color: '#ff4d4d', fontSize: '0.85rem' }}>{error}</div>}
            <button className="btn-primary" style={{ width: '100%', padding: '1.2rem' }}>Authenticate</button>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      style={{ width: '100%', minHeight: '100vh', background: '#050505', color: 'var(--color-text)', padding: '2rem' }}
    >
      {/* Admin Sidebar/Topnav */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', background: 'rgba(212, 175, 55, 0.05)', padding: '1.5rem 2rem', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <LayoutDashboard color="var(--color-gold)" size={24} />
             <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--color-gold)' }}>MANAGEMENT HUB</h1>
          </div>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', transition: 'var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = '#ff4d4d'}>
            <LogOut size={20} /> LOGOUT
          </button>
        </div>

        {/* Analytics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { label: 'Active Orders', value: orders.filter(o => o.status !== 'Completed').length.toString(), icon: <TrendingUp size={20} />, color: 'var(--color-gold)' },
            { label: 'Total Revenue', value: `$${orders.filter(o => o.status === 'Completed').reduce((sum, o) => sum + parseFloat((o.price || '$0').replace('$','')) || 0, 0).toFixed(0)}`, icon: <Database size={20} />, color: 'var(--color-success)' },
            { label: 'Users Online', value: '1.2k', icon: <Users size={20} />, color: '#3498db' },
            { label: 'Avg Rating', value: '4.95', icon: <Star fill="currentColor" size={20} />, color: '#f1c40f' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel" style={{ padding: '1.5rem', border: `1px solid rgba(255,255,255,0.05)`, background: 'rgba(255,255,255,0.02)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>{stat.label}</span>
                  <div style={{ color: stat.color }}>{stat.icon}</div>
               </div>
               <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Live Order Pipeline
            {loading && <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />}
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{orders.length} total orders</span>
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>ID</th>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Discord Tag</th>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Service</th>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Price</th>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Status</th>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.5rem 1rem', fontWeight: 600 }}>{o.id}</td>
                    <td style={{ padding: '1.5rem 1rem' }}>
                       <div style={{ color: 'var(--color-text)', fontWeight: 600 }}>{o.discord}</div>
                       <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{o.customer}</div>
                    </td>
                    <td style={{ padding: '1.5rem 1rem' }}>
                      <div style={{ fontSize: '0.9rem' }}>{o.service}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{o.details}</div>
                    </td>
                    <td style={{ padding: '1.5rem 1rem', color: 'var(--color-gold-light)' }}>{o.price}</td>
                    <td style={{ padding: '1.5rem 1rem' }}>
                       <span style={{ 
                         fontSize: '0.75rem', padding: '4px 10px', borderRadius: '4px',
                         background: o.status === 'Completed' ? 'rgba(46, 125, 50, 0.2)' : o.status === 'In Progress' ? 'rgba(52, 152, 219, 0.2)' : 'rgba(212, 175, 55, 0.2)',
                         color: o.status === 'Completed' ? '#4caf50' : o.status === 'In Progress' ? '#3498db' : 'var(--color-gold-light)',
                         border: `1px solid currentColor`
                       }}>
                         {o.status}
                       </span>
                    </td>
                    <td style={{ padding: '1.5rem 1rem' }}>
                       <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => updateStatus(o.id, 'In Progress')} style={{ color: 'var(--color-text-muted)' }} title="Start"><Clock size={16} /></button>
                          <button onClick={() => updateStatus(o.id, 'Completed')} style={{ color: 'var(--color-text-muted)' }} title="Finish"><CheckCircle size={16} /></button>
                          <button style={{ color: 'var(--color-text-muted)' }} title="Edit"><AlertCircle size={16} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Star = ({ fill, size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

export default Admin;
