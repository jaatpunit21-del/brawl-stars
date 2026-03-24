import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Video, Info, MoreVertical, ShieldCheck, CheckCheck, ChevronRight } from 'lucide-react';

const PrivateChat = ({ user, onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'MasterBoosting', text: 'Hello! I am your lead booster. I see your order for Brawl Stars Rank/Trophy push. Are you ready to start?', time: '10:42 PM', status: 'read' }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: user?.tag || 'You',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate Booster response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'MasterBoosting',
        text: 'Understood. Please stay offline while we are pushing. I will update you here when we hit the next milestone!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      }]);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ width: '100%', height: 'calc(100vh - 80px)', display: 'flex', background: '#0a0a0a' }}
    >
      {/* Sidebar - Contacts */}
      <div style={{ width: '280px', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', display: 'none', lg: 'block' }}>
         <h4 style={{ color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '2rem' }}>ACTIVE CHATS</h4>
         <div style={{ padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 800 }}>MB</div>
            <div>
               <div style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>MasterBoosting</div>
               <div style={{ color: 'var(--color-success)', fontSize: '0.75rem' }}>Online & Pushing</div>
            </div>
         </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
         {/* Header */}
         <div style={{ padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
               <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '0.5rem' }}>
                  <ChevronRight size={24} style={{ transform: 'rotate(180deg)' }} />
               </button>
               <div style={{ position: 'relative' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(45deg, #111, #333)', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <img src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1-1.png" width="25" alt="mb" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', background: 'var(--color-success)', borderRadius: '50%', border: '2px solid #0a0a0a' }} />
               </div>
               <div>
                  <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '2px' }}>MasterBoosting</h3>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                     <ShieldCheck size={12} color="var(--color-gold)" /> VERIFIED LEAD BOOSTER
                  </div>
               </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-muted)' }}>
               <Phone size={20} style={{ cursor: 'pointer' }} />
               <Video size={20} style={{ cursor: 'pointer' }} />
               <Info size={20} style={{ cursor: 'pointer' }} />
               <MoreVertical size={20} style={{ cursor: 'pointer' }} />
            </div>
         </div>

         {/* Messages Scroll Area */}
         <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ alignSelf: 'center', padding: '0.5rem 1rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.1)', color: 'var(--color-gold)', fontSize: '0.75rem', letterSpacing: '1px' }}>
               ORDER #772 • SECURE ENCRYPTED CHANNEL
            </div>

            {messages.map((m) => (
               <div key={m.id} style={{ 
                 alignSelf: m.sender === 'MasterBoosting' ? 'flex-start' : 'flex-end',
                 maxWidth: '70%',
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: m.sender === 'MasterBoosting' ? 'flex-start' : 'flex-end'
               }}>
                  <div style={{ 
                    padding: '1rem 1.2rem', 
                    background: m.sender === 'MasterBoosting' ? 'rgba(255,255,255,0.03)' : 'var(--color-gold)',
                    color: m.sender === 'MasterBoosting' ? 'white' : 'black',
                    borderRadius: m.sender === 'MasterBoosting' ? '0 16px 16px 16px' : '16px 16px 0 16px',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    border: m.sender === 'MasterBoosting' ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}>
                     {m.text}
                  </div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                     {m.time} {m.sender !== 'MasterBoosting' && <CheckCheck size={12} color="var(--color-gold)" />}
                  </div>
               </div>
            ))}
            <div ref={chatEndRef} />
         </div>

         {/* Input Area */}
         <div style={{ padding: '1.5rem 2rem', background: 'rgba(10,10,10,0.8)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <form onSubmit={handleSendMessage} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Message MasterBoosting..." 
                  style={{ 
                    flex: 1, padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '12px', color: 'white', outline: 'none'
                  }} 
               />
               <button 
                  type="submit"
                  style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--color-gold)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
               >
                  <Send size={20} color="black" />
               </button>
            </form>
         </div>
      </div>
    </motion.div>
  );
};

export default PrivateChat;
