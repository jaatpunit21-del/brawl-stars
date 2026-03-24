import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, DollarSign, MessageCircle, Star, Target } from 'lucide-react';

const SEOContent = () => {
  return (
    <div style={{ width: '100%', maxWidth: '1100px', margin: '6rem auto 4rem', padding: '4rem 2rem', background: 'rgba(212, 175, 55, 0.02)', borderTop: '1px solid rgba(212, 175, 55, 0.1)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-gold)', letterSpacing: '3px', marginBottom: '1.5rem', fontWeight: 700 }}>THE MASTER2BOOSTING STANDARD</h2>
        <div style={{ height: '3px', width: '60px', background: 'var(--color-gold)', margin: '0 auto' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
        
        <section>
          <h3 style={{ color: 'var(--color-gold-light)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} /> ELITE ACCOUNT SECURITY
          </h3>
          <p>
            One of the biggest concerns users have when searching for reliable game boosting services is account safety. Trustworthy services prioritize privacy protection and use secure login methods. At Master2Boosting, no data is stored unnecessarily, and all boosting sessions are handled carefully to avoid any suspicious activity. This level of discretion is essential, especially for players who have invested significant time and effort into their accounts.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--color-gold-light)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={20} /> UNRIVALED PERFORMANCE & SPEED
          </h3>
          <p>
            Speed is a major factor for those seeking a "quick rank boost" or "instant boosting service." Progress should be visible without waiting weeks. A well-managed boosting service ensures that orders are completed efficiently within a clearly defined timeframe. However, speed should never compromise quality. We maintain a perfect balance, ensuring steady progression without raising red flags.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--color-gold-light)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <DollarSign size={20} /> TRANSPARENT & FAIR PRICING
          </h3>
          <p>
            When searching for an "affordable rank push," players look for value rather than just low prices. Transparent pricing structures, clear rank-based packages, and no hidden fees build trust. Competitive pricing combined with high-quality service creates a strong reputation. We offer premium value that reflects the rare skill and dedication required for high-level Brawl Stars play.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--color-gold-light)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageCircle size={20} /> PROACTIVE COMMUNICATION
          </h3>
          <p>
            Users prefer services with regular updates and instant support. Whether it’s through chat, email, or messaging platforms, quick responses enhance the overall experience. When searching for a "boosting service with support" or "live boosting updates," reliability is key. Our boosters are available for live feedback, ensuring you are never in the dark about your account's progress.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--color-gold-light)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Target size={20} /> CUSTOMIZED GRINDING OPTIONS
          </h3>
          <p>
            Not all players want the same type of boost. Some seek full rank progression, while others prefer partial boosts or specific milestones like "trophy pushing" or "competitive progression." Offering flexible options allows users to choose exactly what they need, especially in games where rank tiers and divisions vary significantly.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--color-gold-light)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Star size={20} /> ELITE EXPERTISE & CONSISTENCY
          </h3>
          <p>
            Professional boosters are experienced players who understand game mechanics, strategies, and meta changes. This allows them to adapt quickly and maintain high win rates. Users searching for "high win rate boosting" or "top player boosting service" are specifically looking for this level of expertise and long-term performance enhancement.
          </p>
        </section>

      </div>

      <div style={{ marginTop: '5rem', padding: '3rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.05)', textAlign: 'center' }}>
         <h3 style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', fontSize: '1.4rem' }}>WHY CHOOSE MASTER2BOOSTING?</h3>
         <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
           If you are searching for <strong>reliable game boosting services</strong>, <strong>fast rank pushing</strong>, or professional help to climb competitive ladders, you are in the right place. Our service focuses on <strong>performance, safety, and consistency</strong>. Instead of risky shortcuts, we rely on <strong>deep game knowledge</strong> to ensure every rank increase is earned legitimately, maintaining the integrity of your account while delivering <strong>fast Brawl Stars results</strong>.
         </p>
         <div style={{ marginTop: '2rem' }}>
           <a href="#dashboard" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', borderBottom: '1px solid var(--color-gold)' }}>
             ORDER BRAWL STARS BOOSTING NOW
           </a>
         </div>
      </div>

      {/* Massive Keyword Lexicon for Total Search Saturation */}
      <div style={{ marginTop: '6rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4rem' }}>
        <h4 style={{ color: 'rgba(212, 175, 55, 0.4)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '2rem', textAlign: 'center' }}>BRAWL STARS BOOSTING LEXICON & SERVICE DIRECTORY</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', opacity: 0.3, transition: 'opacity 0.3s' }} onMouseOver={e => e.currentTarget.style.opacity = 0.8} onMouseOut={e => e.currentTarget.style.opacity = 0.3}>
          {[
            "Brawl Stars Boost", "BS Boosting", "Trophy Push", "Ranked Mastery", "Starr Park Grinding", "Brawler Mastery", 
            "Legendary Boost", "Diamond Rank Push", "Mythic Boost", "Master Rank Grinding", "Power League Boost", 
            "Club League Help", "Brawl Pass Grinding", "Event Boost", "Hypercharge Boost", "Global Leaderboard Boost", 
            "Local Leaderboard Boost", "Pro Brawl Stars Players", "Top 100 Boosting", "Account Safety BS", 
            "BS Boosting Service USA", "BS Boosting Service Europe", "BS Boosting Service Asia", "Fast BS Trophies", 
            "BS Ranked Help", "BS Pro Coaching", "Brawl Stars PL Push", "Brawl Stars Rank 35", "Brawl Stars Rank 30", 
            "Brawl Stars Rank 25", "Brawl Stars Title Grinding", "Brawl Stars Mastery Level 3", "Brawl Stars Gold Mastery", 
            "Brawl Stars Diamond Mastery", "Brawl Stars Mythic Mastery", "Brawl Stars Legendary Mastery", 
            "Brawl Stars Master Mastery", "Brawl Stars Season Push", "Brawl Stars End Season Grinding",
            "Brawl Stars Solo PL", "Brawl Stars Team PL", "Brawl Stars Power Matches", "Brawl Stars Win Rate Gain",
            "Brawl Stars Account Progression", "Brawl Stars Leveling", "Brawl Stars Skill Boost", "Brawl Stars Pro Play",
            "Brawl Stars High ELO", "Brawl Stars Competitive Help", "Brawl Stars Championship Grinding", "Brawl Stars Elite Boost"
          ].map(tag => (
            <span key={tag} style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>{tag} •</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SEOContent;
