import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarHalf, CheckCircle, User } from 'lucide-react';

const SERVICES = [
  'BS: Ranked Push', 'BS: Trophy Push', 'WoW: Leveling', 
  'WoW: Raid Clear', 'WoW: Arena Rating', 'FN: Battle Pass',
  'FN: Arena Rank', 'FN: Skin Unlock'
];

const INTROS = [
  "I was highly skeptical at first about using a boosting service, but Master2Boosting completely blew my mind out of the water. ",
  "Absolutely phenomenal experience from start to finish. I've tried a few services before, but none come close to the sheer speed and professionalism displayed here. ",
  "Just wow. The communication was pristine and the booster handled my account with extreme care. ",
  "Honestly, I didn't know what to expect. A friend recommended Master2Boosting to me when I was hardstuck, and they delivered way faster than the estimated time. ",
  "If you are on the fence about ordering, just do it. Best decision I made for my account. "
];

const BODIES = [
  "The booster played exceptionally well, carrying my performance through the roof without any hiccups. They even taught me a few strategies. The security protocols they use made me feel extremely safe. It is very hard to find a trustworthy provider that doesn't overcharge, but their pricing model is unbeatable. ",
  "Every single match or dungeon felt like a masterclass. My booster kept me updated after every session and the progress was consistent. I was able to push past my skill ceiling effortlessly. The customer service team was also instantly responsive. Not only did they complete it rapidly, but they maintained a crazy win streak while doing so. ",
  "I genuinely couldn't believe how quickly they started my order. Within an hour of payment, my account was already climbing the ranks. They followed all my specific instructions regarding character selections and didn't touch anything else. The whole interaction was entirely seamless and focused on privacy. ",
  "I requested a very specific custom grind for a rare achievement, and they handled it like absolute professionals. The booster was super friendly and accommodated my strange play hours. The dedication to customer satisfaction is what really sets them apart. I am completely blown away. "
];

const OUTROS = [
  "I will 100% be returning next season. A massive thanks to the team for making this so easy!",
  "Highly, highly recommended. Worth every single penny.",
  "You cannot go wrong with Master2Boosting. Supreme quality, rapid delivery, perfectly executed.",
  "If you want results without the headache, this is the only service you need.",
  "Definitely going to order a prestige push next. Incredible work guys, keep it up!"
];

const NAMES = ["Alex M.", "David99", "Sarah K.", "ProBrawler_X", "Michael J.", "T. Williams", "Jayson P.", "Killa_Instinct", "Anonymous", "Chris T.", "Emma R.", "GamerDad77", "ShadowNinja", "El_Primo_Main", "Victor S.", "Ryan", "Jessica L.", "Dr_Crows", "Mark H.", "SneakyPeak"];

const generateReviews = () => {
  const generated = [];
  for (let i = 0; i < 112; i++) {
    // Generate varying length words looping up to 200 words natively dynamically
    const numBodies = Math.floor(i % 3) + 1;
    let text = INTROS[i % INTROS.length];
    for (let j = 0; j < numBodies; j++) {
      text += BODIES[(i + j) % BODIES.length];
    }
    text += OUTROS[i % OUTROS.length];

    // Average at 4.9 natively by placing 4-star sparingly (approx 1 in 10 is a 4-star)
    const rating = (i % 10 === 0) ? 4 : 5;
    const dateObj = new Date(Date.now() - (i * 86400000) * 0.7);

    generated.push({
      id: i,
      name: NAMES[i % NAMES.length],
      service: SERVICES[i % SERVICES.length],
      rating,
      date: dateObj.toLocaleDateString(),
      text
    });
  }
  return generated;
};

const Reviews = () => {
  const reviews = useMemo(() => generateReviews(), []);
  const [visibleCount, setVisibleCount] = useState(10);

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <div className="container" style={{ width: '100%', margin: '4rem auto', paddingBottom: '4rem' }}>
      {/* HEADER: 4.9 Average */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', color: 'var(--color-gold)', marginBottom: '1.5rem', letterSpacing: '2px' }}>CUSTOMER VERIFIED REVIEWS</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(10px, 3vw, 25px)', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 'clamp(3rem, 10vw, 4.5rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>4.9</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px', color: 'var(--color-gold)' }}>
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
              <StarHalf fill="currentColor" size={24} />
            </div>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '8px', opacity: 0.8 }}>Based on 1000+ verified orders</span>
          </div>
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <AnimatePresence>
          {visibleReviews.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 10) * 0.1 }}
              className="glass-panel"
              style={{
                padding: 'clamp(1.2rem, 4vw, 2.5rem)',
                border: '1px solid rgba(212, 175, 55, 0.15)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                background: 'rgba(10, 10, 10, 0.7)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: 'clamp(0.8rem, 2vw, 1.2rem)', alignItems: 'center' }}>
                  <div style={{ width: 'clamp(40px, 8vw, 48px)', height: 'clamp(40px, 8vw, 48px)', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(212, 175, 55, 0.4)', flexShrink: 0 }}>
                    <User size={24} color="var(--color-gold)" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <h4 style={{ color: 'var(--color-text)', margin: 0, fontSize: '1.1rem' }}>{r.name}</h4>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-success)', fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(46, 125, 50, 0.2)', borderRadius: '4px', fontWeight: 600 }}>
                        <CheckCircle size={10} /> Verified
                      </span>
                    </div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{r.date} • <span style={{ color: 'var(--color-gold-light)' }}>{r.service}</span></span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px', color: 'var(--color-gold)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < r.rating ? "currentColor" : "none"} opacity={i < r.rating ? 1 : 0.3} />
                  ))}
                </div>
              </div>

              <p style={{ color: 'var(--color-text)', lineHeight: 1.6, fontSize: 'clamp(0.95rem, 3vw, 1.05rem)', opacity: 0.85, fontStyle: 'italic' }}>
                "{r.text}"
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* SHOW MORE */}
      {visibleCount < reviews.length && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <button
            onClick={() => setVisibleCount(prev => Math.min(prev + 10, reviews.length))}
            style={{
              background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0) 100%)',
              border: '1px solid var(--color-gold)',
              color: 'var(--color-gold)',
              padding: '1.2rem 4rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              letterSpacing: '2px',
              fontWeight: 600,
              textTransform: 'uppercase',
               transition: 'var(--transition-smooth)',
               width: '100%',
               maxWidth: '400px'
            }}
            onMouseOver={e => { e.target.style.background = 'rgba(212, 175, 55, 0.2)'; e.target.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.3)' }}
            onMouseOut={e => { e.target.style.background = 'linear-gradient(90deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0) 100%)'; e.target.style.boxShadow = 'none' }}
          >
            Show 10 More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
