import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChevronRight, CheckCircle, ShieldCheck, Clock, MessageSquare, Disc, LogIn } from 'lucide-react';

const SERVICES = {
  brawl: [
    { id: 'ranked', label: 'Ranked Push' },
    { id: 'trophy', label: 'Trophy Push' },
    { id: 'prestige', label: 'Prestige Grinding' },
    { id: 'custom', label: 'Custom Orders' }
  ],
  wow: [
    { id: 'wow_leveling', label: 'Leveling' },
    { id: 'wow_raiding', label: 'Raiding' },
    { id: 'wow_mythic', label: 'Mythic+ Dungeons' },
    { id: 'wow_pvp', label: 'PvP Arena' },
    { id: 'wow_coaching', label: 'Coaching' },
    { id: 'custom', label: 'Custom Orders' }
  ],
  fortnite: [
    { id: 'fn_battlepass', label: 'Battle Pass' },
    { id: 'fn_arena', label: 'Arena Rank' },
    { id: 'fn_cosmetic', label: 'Cosmetic Unlocks' },
    { id: 'fn_tourney', label: 'Tournaments' },
    { id: 'custom', label: 'Custom Orders' }
  ]
};

const BRAWL_DATA = {
  RANKS: [
    'Bronze 1', 'Bronze 2', 'Bronze 3',
    'Silver 1', 'Silver 2', 'Silver 3',
    'Gold 1', 'Gold 2', 'Gold 3',
    'Diamond 1', 'Diamond 2', 'Diamond 3',
    'Mythic 1', 'Mythic 2', 'Mythic 3',
    'Legendary 1', 'Legendary 2', 'Legendary 3',
    'Master 1', 'Master 2', 'Master 3',
    'Pro'
  ],
  RANK_PRICES: {
    'Bronze 1': 0, 'Bronze 2': 5, 'Bronze 3': 10,
    'Silver 1': 15, 'Silver 2': 20, 'Silver 3': 25,
    'Gold 1': 30, 'Gold 2': 35, 'Gold 3': 45,
    'Diamond 1': 55, 'Diamond 2': 65, 'Diamond 3': 80,
    'Mythic 1': 95, 'Mythic 2': 110, 'Mythic 3': 130,
    'Legendary 1': 150, 'Legendary 2': 175, 'Legendary 3': 200,
    'Master 1': 230, 'Master 2': 310, 'Master 3': 430,
    'Pro': 605
  },
  PRESTIGE_LEVELS: ['Level 1', 'Level 2', 'Level 3', 'Complete'],
  PRESTIGE_PRICES: {
    'Level 1': 0,
    'Level 2': 40,
    'Level 3': 120, 
    'Complete': 240 
  }
};

const WOW_DATA = {
  RAID_DIFFICULTIES: ['Normal', 'Heroic', 'Mythic'],
  RAID_PRICES: {
    'Normal': 45,
    'Heroic': 85,
    'Mythic': 650
  },
  RAID_LAST_BOSS_ONLY: {
    'Heroic': 35,
    'Mythic': 250
  },
  LEVELING_TIERS: ['Standard (8-12h)', 'Current Expansion (4-6h)', 'Speed Run (1-80)'],
  LEVELING_PRICES: {
    'Standard (8-12h)': 125,
    'Current Expansion (4-6h)': 100,
    'Speed Run (1-80)': 200
  },
  PVP_RATING_GOALS: ['1600', '1800', '2100', '2400', 'Gladiator'],
  PVP_PRICES: {
    '1600': 85,
    '1800': 110,
    '2100': 180,
    '2400': 350,
    'Gladiator': 850
  },
  MYTHIC_SERVICES: ['Single Timed Key', 'Score Chain (+500)', 'Weekly Vault (8 keys)'],
  MYTHIC_PRICES: {
    'Single Timed Key': 20,
    'Score Chain (+500)': 120,
    'Weekly Vault (8 keys)': 85
  }
};

const FORTNITE_DATA = {
  DIVISIONS: [
    'Open League - Div 1', 'Open League - Div 2', 'Open League - Div 3', 'Open League - Div 4',
    'Contender League - Div 5', 'Contender League - Div 6', 'Contender League - Div 7',
    'Champion League - Div 8', 'Champion League - Div 9', 'Champion League - Div 10'
  ],
  ARENA_PRICES: {
    'Open League - Div 1': 0, 'Open League - Div 2': 15, 'Open League - Div 3': 30, 'Open League - Div 4': 50,
    'Contender League - Div 5': 85, 'Contender League - Div 6': 130, 'Contender League - Div 7': 180,
    'Champion League - Div 8': 250, 'Champion League - Div 9': 340, 'Champion League - Div 10': 420
  },
  COSMETIC_OPTIONS: ['Common Skin', 'Rare Outfit', 'Epic Bundle', 'Legendary Item'],
  COSMETIC_PRICES: {
    'Common Skin': 15,
    'Rare Outfit': 35,
    'Epic Bundle': 65,
    'Legendary Item': 90
  }
};

const Dashboard = ({ user, selectedGame, onLogin, onCheckout }) => {
  const currentServices = SERVICES[selectedGame || 'brawl'];
  const [activeTab, setActiveTab] = useState(currentServices[0].id);

  // Reset active tab when game changes
  useEffect(() => {
    setActiveTab(SERVICES[selectedGame || 'brawl'][0].id);
  }, [selectedGame]);
  const [activeUsers, setActiveUsers] = useState(142);

  // Ranked State
  const [fromRank, setFromRank] = useState('Bronze 1');
  const [toRank, setToRank] = useState('Diamond 1');

  // Trophy State
  const [currentTrophies, setCurrentTrophies] = useState(1000);
  const [trophiesNeeded, setTrophiesNeeded] = useState(500);

  // Prestige State
  const [fromPrestige, setFromPrestige] = useState('Level 1');
  const [toPrestige, setToPrestige] = useState('Level 2');

  // Custom Order State
  const [customDetails, setCustomDetails] = useState('');
  const [discordLogin, setDiscordLogin] = useState('');

  // Simulate active users changing
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sync logic for Rankings
  useEffect(() => {
    const fromIdx = BRAWL_DATA.RANKS.indexOf(fromRank);
    const toIdx = BRAWL_DATA.RANKS.indexOf(toRank);
    if (fromIdx >= toIdx && fromIdx < BRAWL_DATA.RANKS.length - 1) {
      setToRank(BRAWL_DATA.RANKS[fromIdx + 1]);
    } else if (fromIdx === BRAWL_DATA.RANKS.length - 1) {
      setFromRank(BRAWL_DATA.RANKS[BRAWL_DATA.RANKS.length - 2]);
    }
  }, [fromRank, toRank]);

  // Sync logic for Prestige
  useEffect(() => {
    const fromIdx = BRAWL_DATA.PRESTIGE_LEVELS.indexOf(fromPrestige);
    const toIdx = BRAWL_DATA.PRESTIGE_LEVELS.indexOf(toPrestige);
    if (fromIdx >= toIdx && fromIdx < BRAWL_DATA.PRESTIGE_LEVELS.length - 1) {
      setToPrestige(BRAWL_DATA.PRESTIGE_LEVELS[fromIdx + 1]);
    } else if (fromIdx === BRAWL_DATA.PRESTIGE_LEVELS.length - 1) {
      setFromPrestige(BRAWL_DATA.PRESTIGE_LEVELS[BRAWL_DATA.PRESTIGE_LEVELS.length - 2]);
    }
  }, [fromPrestige, toPrestige]);

  // WoW Settings
  const [wowLevelingSpeed, setWowLevelingSpeed] = useState('Standard (8-12h)');
  const [isPiloted, setIsPiloted] = useState(true);
  const [isExpress, setIsExpress] = useState(false);
  const [hasLootFunnel, setHasLootFunnel] = useState(false);

  // WoW Raiding State
  const [wowRaidDifficulty, setWowRaidDifficulty] = useState('Heroic');
  const [wowRaidLastBossOnly, setWowRaidLastBossOnly] = useState(false);

  // WoW PvP State
  const [wowPvpTarget, setWowPvpTarget] = useState('1800');

  // WoW Mythic+ State
  const [wowMythicService, setWowMythicService] = useState('Single Timed Key');

  // WoW Coaching State
  const [wowCoachingHours, setWowCoachingHours] = useState(1);

  // Fortnite Battle Pass State
  const [fnPassBracket, setFnPassBracket] = useState('0-100');
  const [fnPassLevelStep, setFnPassLevelStep] = useState(25);

  // Fortnite Arena State
  const [fromFnDiv, setFromFnDiv] = useState('Open League - Div 1');
  const [toFnDiv, setToFnDiv] = useState('Contender League - Div 6');

  // Fortnite Cosmetics State
  const [fnCosmeticChoice, setFnCosmeticChoice] = useState('Rare Outfit');

  // Fortnite Tournaments State
  const [fnTourneyService, setFnTourneyService] = useState('Solo Cash Cup');

  // Pricing Engine
  const { originalPrice, finalPrice, savings, extraDiscountStr } = useMemo(() => {
    let basePrice = 0;
    let extraDiscount = 0;

    if (activeTab === 'ranked') {
      const fromIdx = BRAWL_DATA.RANKS.indexOf(fromRank);
      const toIdx = BRAWL_DATA.RANKS.indexOf(toRank);
      if (toIdx > fromIdx) {
        basePrice = BRAWL_DATA.RANK_PRICES[toRank] - BRAWL_DATA.RANK_PRICES[fromRank];
      }
    } else if (activeTab === 'trophy') {
      let calcCurrent = currentTrophies;
      let remaining = trophiesNeeded;
      let cost = 0;
      const baseValue = 0.0175; 

      while (remaining > 0) {
        let nextThresh = (Math.floor(calcCurrent / 1000) + 1) * 1000;
        let step = Math.min(remaining, nextThresh - calcCurrent);
        let multiplier = 1 + (Math.floor(calcCurrent / 1000) * 0.01);
        cost += step * baseValue * multiplier;
        calcCurrent += step;
        remaining -= step;
      }
      basePrice = cost;
    } else if (activeTab === 'prestige') {
      const fromIdx = BRAWL_DATA.PRESTIGE_LEVELS.indexOf(fromPrestige);
      const toIdx = BRAWL_DATA.PRESTIGE_LEVELS.indexOf(toPrestige);
      if (toIdx > fromIdx) {
        basePrice = BRAWL_DATA.PRESTIGE_PRICES[toPrestige] - BRAWL_DATA.PRESTIGE_PRICES[fromPrestige];
        if ((fromIdx === 0 && toIdx === 2) || (toIdx - fromIdx >= 2)) {
          extraDiscount = 0.15;
        }
      }
    } else if (activeTab === 'wow_leveling') {
      basePrice = WOW_DATA.LEVELING_PRICES[wowLevelingSpeed];
      if (isExpress) basePrice += 25;
    } else if (activeTab === 'wow_raiding') {
      basePrice = wowRaidLastBossOnly ? 
        (WOW_DATA.RAID_LAST_BOSS_ONLY[wowRaidDifficulty] || WOW_DATA.RAID_PRICES[wowRaidDifficulty] * 0.4) : 
        WOW_DATA.RAID_PRICES[wowRaidDifficulty];
      if (hasLootFunnel) basePrice *= 1.75;
    } else if (activeTab === 'wow_pvp') {
      basePrice = WOW_DATA.PVP_PRICES[wowPvpTarget];
      if (!isPiloted) basePrice *= 0.7; // Self-play discount
    } else if (activeTab === 'wow_mythic') {
      basePrice = WOW_DATA.MYTHIC_PRICES[wowMythicService];
      if (isPiloted) basePrice *= 1.2; // Piloted premium
    } else if (activeTab === 'wow_coaching') {
      basePrice = wowCoachingHours * 65; 
      if (wowCoachingHours >= 3) extraDiscount = 0.1;
    } else if (activeTab === 'fn_battlepass') {
      if (fnPassBracket === '0-100') basePrice = (fnPassLevelStep / 100) * 70;
      else basePrice = (fnPassLevelStep / 100) * 90;
      if (isExpress) basePrice *= 1.5;
    } else if (activeTab === 'fn_arena') {
      const fromIdx = FORTNITE_DATA.DIVISIONS.indexOf(fromFnDiv);
      const toIdx = FORTNITE_DATA.DIVISIONS.indexOf(toFnDiv);
      if (toIdx > fromIdx) {
        basePrice = FORTNITE_DATA.ARENA_PRICES[toFnDiv] - FORTNITE_DATA.ARENA_PRICES[fromFnDiv];
      }
    } else if (activeTab === 'fn_cosmetic') {
      basePrice = FORTNITE_DATA.COSMETIC_PRICES[fnCosmeticChoice];
    } else if (activeTab === 'fn_tourney') {
      basePrice = 140; 
    } else if (activeTab === 'custom') {
      basePrice = 0;
    }

    // Discount Engine (Global 12%)
    let globalDiscountFactor = 0.12; 
    let totalDiscountFactor = globalDiscountFactor + extraDiscount;
    const discountValue = basePrice * totalDiscountFactor;
    const finalVal = basePrice - discountValue;

    return {
      originalPrice: basePrice > 0 ? basePrice.toFixed(2) : 'TBD',
      finalPrice: activeTab === 'custom' ? 'TBD' : finalVal.toFixed(2),
      savings: activeTab === 'custom' ? 'TBD' : discountValue.toFixed(2),
      extraDiscountStr: extraDiscount > 0 ? ` + ${extraDiscount * 100}% Bulk` : ''
    };
  }, [activeTab, fromRank, toRank, currentTrophies, trophiesNeeded, fromPrestige, toPrestige, wowLevelingSpeed, wowRaidDifficulty, wowRaidLastBossOnly, wowPvpTarget, wowMythicService, wowCoachingHours, fnPassBracket, fnPassLevelStep, fromFnDiv, toFnDiv, fnCosmeticChoice, fnTourneyService, isPiloted, isExpress, hasLootFunnel]);

  const handleCheckout = () => {
    if (activeTab === 'custom' && (!customDetails.trim() || !discordLogin.trim())) {
      alert("Please provide both your custom order details and your Discord login.");
      return;
    }

    let detailsText = '';
    if (activeTab === 'ranked') detailsText = `${fromRank} → ${toRank}`;
    else if (activeTab === 'trophy') detailsText = `${currentTrophies} → ${currentTrophies + trophiesNeeded} Trophies (+${trophiesNeeded})`;
    else if (activeTab === 'prestige') detailsText = `${fromPrestige} → ${toPrestige}`;
    else if (activeTab === 'wow_leveling') detailsText = `WoW Leveling: ${wowLevelingSpeed} ${isExpress ? '(Express)' : ''}`;
    else if (activeTab === 'wow_raiding') detailsText = `Raid: ${wowRaidDifficulty} ${wowRaidLastBossOnly ? '(Last Boss Only)' : '(Full Clear)'}`;
    else if (activeTab === 'wow_pvp') detailsText = `PvP Rating: ${wowPvpTarget}`;
    else if (activeTab === 'wow_mythic') detailsText = `Mythic+: ${wowMythicService}`;
    else if (activeTab === 'wow_coaching') detailsText = `Coaching: ${wowCoachingHours} Hour(s)`;
    else if (activeTab === 'fn_battlepass') detailsText = `Battle Pass [${fnPassBracket}]: +${fnPassLevelStep} Levels`;
    else if (activeTab === 'fn_arena') detailsText = `Arena: ${fromFnDiv} → ${toFnDiv}`;
    else if (activeTab === 'fn_cosmetic') detailsText = `Cosmetic: ${fnCosmeticChoice}`;
    else if (activeTab === 'fn_tourney') detailsText = `Tournament Entry: ${fnTourneyService}`;
    else if (activeTab === 'custom') detailsText = `Discord: ${discordLogin} | Order: ${customDetails}`;

    const currentService = currentServices.find(s => s.id === activeTab);

    onCheckout({
      service: currentService.label,
      details: detailsText,
      finalPrice: finalPrice,
      savings: savings,
      discordTag: user?.tag || 'Guest',
      isCustom: activeTab === 'custom'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="dashboard-grid container"
      style={{
        minHeight: '100vh',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        margin: '0 auto',
        alignItems: 'start'
      }}
    >
      {/* LEFT CONTENT UI */}
      <div>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: 'var(--color-gold)', background: 'rgba(17, 17, 17, 0.75)', backdropFilter: 'blur(8px)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.5)', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
            Service Dashboard
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success)', fontSize: '0.95rem', fontWeight: '500', background: '#0a1c0d', padding: '0.6rem 1.2rem', borderRadius: '50px', border: '1px solid var(--color-success)', boxShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-success)', boxShadow: '0 0 8px var(--color-success)' }}
            />
            {activeUsers} Active Buyers Online
          </div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(212, 175, 55, 0.1)', padding: '0.6rem 1.2rem', borderRadius: '50px', border: '1px solid rgba(212, 175, 55, 0.3)', color: 'var(--color-gold-light)', fontSize: '0.9rem' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-gold)' }} />
               {user.tag}
            </div>
          ) : (
            <button 
              onClick={onLogin}
              style={{ padding: '0.6rem 1.2rem', background: '#5865F2', color: 'white', borderRadius: '50px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}
              onMouseOver={e => e.currentTarget.style.background = '#4752c4'}
              onMouseOut={e => e.currentTarget.style.background = '#5865F2'}
            >
               <LogIn size={14} /> Login with Discord
            </button>
          )}
        </div>

        {/* Tab Control */}
        <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {currentServices.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              style={{
                flex: '1 1 120px',
                padding: '0.8rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                background: activeTab === s.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                color: activeTab === s.id ? 'var(--color-gold)' : 'var(--color-text-muted)',
                fontWeight: activeTab === s.id ? 600 : 400,
                border: activeTab === s.id ? '1px solid var(--color-border)' : '1px solid transparent',
                transition: 'var(--transition-fast)'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Dynamic Selection Container */}
        <div className="glass-panel" style={{ minHeight: '450px', display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            
            {/* BRAWL STAR TABS */}
            {activeTab === 'ranked' && (
              <motion.div key="ranked" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Select Rank Progression</h2>
                
                <div className="service-selection-grid">
                  {/* FROM RANK */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Current Rank
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
                      {BRAWL_DATA.RANKS.slice(0, BRAWL_DATA.RANKS.length - 1).map(rank => (
                        <div
                          key={`from-${rank}`}
                          onClick={() => setFromRank(rank)}
                          style={{
                            padding: '1rem 1.5rem',
                            border: `1px solid ${fromRank === rank ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: fromRank === rank ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                            boxShadow: fromRank === rank ? 'var(--glow-gold)' : 'none',
                            transition: 'var(--transition-fast)'
                          }}
                        >
                          <span style={{ color: fromRank === rank ? 'var(--color-gold-light)' : 'var(--color-text)', fontSize: '0.9rem' }}>{rank}</span>
                          {fromRank === rank && <CheckCircle size={16} color="var(--color-gold)" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ChevronRight size={48} color="rgba(212, 175, 55, 0.3)" />
                  </div>

                  {/* TO RANK */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Target Rank
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
                      {BRAWL_DATA.RANKS.map((rank, idx) => {
                        const fromIdx = BRAWL_DATA.RANKS.indexOf(fromRank);
                        const disabled = idx <= fromIdx;
                        
                        return (
                          <div
                            key={`to-${rank}`}
                            onClick={() => !disabled && setToRank(rank)}
                            style={{
                              padding: '1rem 1.5rem',
                              border: `1px solid ${toRank === rank ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`,
                              borderRadius: '4px',
                              cursor: disabled ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              opacity: disabled ? 0.3 : 1,
                              background: toRank === rank ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                              boxShadow: toRank === rank ? 'var(--glow-gold)' : 'none',
                              transition: 'var(--transition-fast)'
                            }}
                          >
                            <span style={{ color: toRank === rank ? 'var(--color-gold-light)' : 'var(--color-text)', fontSize: '0.9rem' }}>{rank}</span>
                            {toRank === rank && <CheckCircle size={16} color="var(--color-gold)" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TROPHY TAB */}
            {activeTab === 'trophy' && (
              <motion.div key="trophy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Trophy Push Target</h2>
                <div style={{ display: 'flex', gap: '2.5rem', flexDirection: 'column', maxWidth: '450px', margin: '0 auto' }}>
                  {/* Current Trophies */}
                  <div>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Trophies</label>
                    <input 
                      type="number" 
                      value={currentTrophies} 
                      onChange={e => setCurrentTrophies(Math.max(0, parseInt(e.target.value) || 0))}
                      style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text)', fontSize: '1.2rem', outline: 'none', transition: 'var(--transition-fast)' }}
                    />
                  </div>

                  {/* Range Slider for Trophies Needed */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <label style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Trophies Needed</label>
                      <span style={{ fontSize: '1.2rem', color: 'var(--color-gold)', fontWeight: 600 }}>+{trophiesNeeded}</span>
                    </div>

                    <input 
                      type="range" 
                      min="100" 
                      max="10000" 
                      step="100" 
                      value={trophiesNeeded} 
                      onChange={e => setTrophiesNeeded(parseInt(e.target.value))}
                      style={{ 
                        width: '100%', 
                        cursor: 'pointer',
                        accentColor: 'var(--color-gold)'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      <span>+100</span>
                      <span>+10,000</span>
                    </div>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '4px', background: 'rgba(212, 175, 55, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Target Trophies</span>
                      <span style={{ fontSize: '1.2rem', color: 'var(--color-gold-light)', fontWeight: 600 }}>{currentTrophies + trophiesNeeded}</span>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* PRESTIGE TAB */}
            {activeTab === 'prestige' && (
              <motion.div key="prestige" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Prestige Grinding</h2>
                 <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Select levels to complete. Multi-level jumps automatically receive a 15% bulk discount.</p>
                 
                 <div className="service-selection-grid">
                  {/* FROM PRESTIGE */}
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Level</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {BRAWL_DATA.PRESTIGE_LEVELS.slice(0, 3).map(lvl => (
                        <div
                          key={`from-prest-${lvl}`}
                          onClick={() => setFromPrestige(lvl)}
                          style={{
                            padding: '1rem 1.5rem',
                            border: `1px solid ${fromPrestige === lvl ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            background: fromPrestige === lvl ? 'rgba(212, 175, 55, 0.05)' : 'transparent'
                          }}
                        >
                          <span style={{ color: fromPrestige === lvl ? 'var(--color-gold-light)' : 'var(--color-text)' }}>{lvl}</span>
                          {fromPrestige === lvl && <CheckCircle size={18} color="var(--color-gold)" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hidden-mobile">
                     <ChevronRight size={48} color="rgba(212, 175, 55, 0.3)" />
                  </div>

                  {/* TO PRESTIGE */}
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Target Level</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {BRAWL_DATA.PRESTIGE_LEVELS.map((lvl, idx) => {
                        const fromIdx = BRAWL_DATA.PRESTIGE_LEVELS.indexOf(fromPrestige);
                        const disabled = idx <= fromIdx;
                        return (
                          <div
                            key={`to-prest-${lvl}`}
                            onClick={() => !disabled && setToPrestige(lvl)}
                            style={{
                              padding: '1rem 1.5rem',
                              border: `1px solid ${toPrestige === lvl ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`,
                              borderRadius: '4px',
                              cursor: disabled ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              opacity: disabled ? 0.3 : 1,
                              background: toPrestige === lvl ? 'rgba(212, 175, 55, 0.05)' : 'transparent'
                            }}
                          >
                            <span style={{ color: toPrestige === lvl ? 'var(--color-gold-light)' : 'var(--color-text)' }}>{lvl}</span>
                            {toPrestige === lvl && <CheckCircle size={18} color="var(--color-gold)" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'wow_leveling' && (
              <motion.div key="wow_leveling" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Leveling Services</h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Speed Tier</label>
                    {WOW_DATA.LEVELING_TIERS.map(speed => (
                      <div
                        key={speed}
                        onClick={() => setWowLevelingSpeed(speed)}
                        style={{ padding: '1rem', border: `1px solid ${wowLevelingSpeed === speed ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', cursor: 'pointer', marginBottom: '0.5rem', background: wowLevelingSpeed === speed ? 'rgba(212, 175, 55, 0.05)' : 'transparent' }}
                      >
                         {speed}
                      </div>
                    ))}
                  </div>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Options</label>
                    <div
                      onClick={() => setIsExpress(!isExpress)}
                      style={{ padding: '1.5rem', border: `1px solid ${isExpress ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', cursor: 'pointer', background: isExpress ? 'rgba(212, 175, 55, 0.05)' : 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
                    >
                       <span>Express Delivery (+ $25)</span>
                       {isExpress && <CheckCircle size={20} color="var(--color-gold)" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'wow_raiding' && (
              <motion.div key="wow_raiding" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Raid Boosting</h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Difficulty</label>
                    {WOW_DATA.RAID_DIFFICULTIES.map(difficulty => (
                      <div
                        key={difficulty}
                        onClick={() => setWowRaidDifficulty(difficulty)}
                        style={{ padding: '1rem', border: `1px solid ${wowRaidDifficulty === difficulty ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', cursor: 'pointer', marginBottom: '0.5rem', background: wowRaidDifficulty === difficulty ? 'rgba(212, 175, 55, 0.05)' : 'transparent' }}
                      >
                         {difficulty} Mode
                      </div>
                    ))}
                  </div>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Raid Options</label>
                    <div
                      onClick={() => setWowRaidLastBossOnly(!wowRaidLastBossOnly)}
                      style={{ padding: '1.2rem', border: `1px solid ${wowRaidLastBossOnly ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', cursor: 'pointer', background: wowRaidLastBossOnly ? 'rgba(212, 175, 55, 0.05)' : 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}
                    >
                       <span>Last Boss Only</span>
                       {wowRaidLastBossOnly && <CheckCircle size={20} color="var(--color-gold)" />}
                    </div>
                    <div
                      onClick={() => setHasLootFunnel(!hasLootFunnel)}
                      style={{ padding: '1.2rem', border: `1px solid ${hasLootFunnel ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', cursor: 'pointer', background: hasLootFunnel ? 'rgba(212, 175, 55, 0.05)' : 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                       <span>Loot Funnel (+ 75%)</span>
                       {hasLootFunnel && <CheckCircle size={20} color="var(--color-gold)" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'wow_mythic' && (
              <motion.div key="wow_mythic" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Mythic+ Dungeons</h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {WOW_DATA.MYTHIC_SERVICES.map(service => (
                        <div
                          key={service}
                          onClick={() => setWowMythicService(service)}
                          style={{ padding: '1.2rem', border: `1px solid ${wowMythicService === service ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', cursor: 'pointer', background: wowMythicService === service ? 'rgba(212, 175, 55, 0.05)' : 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                          <span>{service}</span>
                          {wowMythicService === service && <CheckCircle size={20} color="var(--color-gold)" />}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ width: '250px' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Mode</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => setIsPiloted(false)}
                        style={{ flex: 1, padding: '1rem', borderRadius: '4px', border: `1px solid ${!isPiloted ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, background: !isPiloted ? 'rgba(212,175,55,0.1)' : 'transparent', color: 'white', cursor: 'pointer' }}
                      >Self</button>
                      <button 
                        onClick={() => setIsPiloted(true)}
                        style={{ flex: 1, padding: '1rem', borderRadius: '4px', border: `1px solid ${isPiloted ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, background: isPiloted ? 'rgba(212,175,55,0.1)' : 'transparent', color: 'white', cursor: 'pointer' }}
                      >Piloted</button>
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '1rem' }}>Piloted mode includes a 20% premium fee.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'wow_pvp' && (
              <motion.div key="wow_pvp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>PvP Arena Ratings</h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                      {WOW_DATA.PVP_RATING_GOALS.map(goal => (
                        <div
                          key={goal}
                          onClick={() => setWowPvpTarget(goal)}
                          style={{ padding: '1.5rem 1rem', border: `1px solid ${wowPvpTarget === goal ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', cursor: 'pointer', textAlign: 'center', background: wowPvpTarget === goal ? 'rgba(212, 175, 55, 0.05)' : 'transparent' }}
                        >
                          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: wowPvpTarget === goal ? 'var(--color-gold)' : 'var(--color-text)' }}>{goal}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ width: '250px' }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Mode</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => setIsPiloted(false)}
                        style={{ flex: 1, padding: '1rem', borderRadius: '4px', border: `1px solid ${!isPiloted ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, background: !isPiloted ? 'rgba(212,175,55,0.1)' : 'transparent', color: 'white', cursor: 'pointer' }}
                      >Self-play</button>
                      <button 
                        onClick={() => setIsPiloted(true)}
                        style={{ flex: 1, padding: '1rem', borderRadius: '4px', border: `1px solid ${isPiloted ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, background: isPiloted ? 'rgba(212,175,55,0.1)' : 'transparent', color: 'white', cursor: 'pointer' }}
                      >Piloted</button>
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '1rem' }}>Self-play mode is 30% cheaper than piloted services.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'wow_coaching' && (
              <motion.div key="wow_coaching" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Professional Coaching</h2>
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <label style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Hours of Instruction</label>
                    <span style={{ fontSize: '1.5rem', color: 'var(--color-gold)', fontWeight: 700 }}>{wowCoachingHours} Hour{wowCoachingHours > 1 ? 's' : ''}</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1" 
                    value={wowCoachingHours} 
                    onChange={e => setWowCoachingHours(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer' }} 
                  />
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0' }}>
                      Get 1-on-1 gameplay instruction from top-tier WoW players. Learn class mechanics, rotation, and high-level strategies.
                      {wowCoachingHours >= 3 && <strong style={{ display: 'block', color: 'var(--color-price-green)', marginTop: '10px' }}>✓ 10% Bulk Discount Applied!</strong>}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'fn_battlepass' && (
              <motion.div key="fn_battlepass" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Battle Pass Leveling</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {['0-100', '100-200'].map(b => (
                      <button
                        key={b}
                        onClick={() => setFnPassBracket(b)}
                        style={{ flex: 1, padding: '1rem', border: `1px solid ${fnPassBracket === b ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', background: fnPassBracket === b ? 'rgba(212, 175, 55, 0.05)' : 'transparent', color: 'white', cursor: 'pointer' }}
                      >
                         Levels {b}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>Additional Levels</span>
                          <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.2rem' }}>+{fnPassLevelStep}</span>
                       </div>
                       <input 
                          type="range" min="10" max="100" step="5" 
                          value={fnPassLevelStep} 
                          onChange={e => setFnPassLevelStep(parseInt(e.target.value))}
                          style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer' }} 
                       />
                    </div>
                    <div 
                      onClick={() => setIsExpress(!isExpress)}
                      style={{ padding: '1.2rem', border: `1px solid ${isExpress ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', cursor: 'pointer', background: isExpress ? 'rgba(212, 175, 55, 0.05)' : 'transparent', display: 'flex', gap: '8px', alignItems: 'center' }}
                    >
                      <span style={{ fontSize: '0.85rem' }}>Express (48h)</span>
                      {isExpress && <CheckCircle size={18} color="var(--color-gold)" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'fn_arena' && (
              <motion.div key="fn_arena" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Arena Rank Progression</h2>
                <div className="service-selection-grid">
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem' }}>Current Division</label>
                    <select 
                      value={fromFnDiv} 
                      onChange={e => setFromFnDiv(e.target.value)}
                      style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', color: 'white', borderRadius: '4px', outline: 'none' }}
                    >
                      {FORTNITE_DATA.DIVISIONS.map(d => <option key={d} value={d} style={{ background: '#111' }}>{d}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem' }}>Target Division</label>
                    <select 
                      value={toFnDiv} 
                      onChange={e => setToFnDiv(e.target.value)}
                      style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', color: 'white', borderRadius: '4px', outline: 'none' }}
                    >
                      {FORTNITE_DATA.DIVISIONS.map(d => <option key={d} value={d} style={{ background: '#111' }}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'fn_cosmetic' && (
              <motion.div key="fn_cosmetic" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Cosmetic Unlocks</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {FORTNITE_DATA.COSMETIC_OPTIONS.map(opt => (
                    <div
                      key={opt}
                      onClick={() => setFnCosmeticChoice(opt)}
                      style={{ padding: '2rem 1rem', border: `1px solid ${fnCosmeticChoice === opt ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', textAlign: 'center', cursor: 'pointer', background: fnCosmeticChoice === opt ? 'rgba(212, 175, 55, 0.05)' : 'transparent' }}
                    >
                       <div style={{ color: fnCosmeticChoice === opt ? 'var(--color-gold)' : 'white', fontWeight: 600 }}>{opt}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'fn_tourney' && (
              <motion.div key="fn_tourney" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Tournament Placements</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Our elite players will compete on your behalf in official Fortnite cups to secure top placements and rewards.</p>
                <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid var(--color-gold)', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
                   <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Tournament Queue Active</div>
                   <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Contact us on Discord for the schedule of upcoming Cups and specific placement requests.</p>
                </div>
              </motion.div>
            )}

            {/* CUSTOM ORDERS */}
            {activeTab === 'custom' && (
              <motion.div key="custom" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-gold)' }}>Custom Order Request</h2>
                <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <ShieldCheck size={20} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Please write the details of your specific custom order below safely. Providing your Discord login ensures we can securely verify the account details. This request will be sent securely to our dashboard, and we will update you with the finalized price shortly via Discord.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Discord Login</label>
                    <input 
                      type="text" 
                      placeholder="Username#1234 or email"
                      value={discordLogin}
                      onChange={e => setDiscordLogin(e.target.value)}
                      style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Custom Request Details</label>
                    <textarea 
                      rows={5}
                      placeholder="Describe everything you need done..."
                      value={customDetails}
                      onChange={e => setCustomDetails(e.target.value)}
                      style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text)', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* How it Works Section */}
        <div className="glass-panel" style={{ marginTop: '3rem', padding: '1.5rem', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.4rem)', color: 'var(--color-gold)', marginBottom: '2rem', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <ShieldCheck size={24} /> HOW TO GET BOOSTED
          </h2>
          <div className="how-to-order-grid">
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(212, 175, 55, 0.05)', position: 'absolute', top: -10, left: -5 }}>01</div>
              <h4 style={{ color: 'var(--color-gold-light)', marginBottom: '0.5rem', position: 'relative' }}>Set Preferences</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Select your service and configure your current and target ranks or trophies using our interactive dashboard.
              </p>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(212, 175, 55, 0.05)', position: 'absolute', top: -10, left: -5 }}>02</div>
              <h4 style={{ color: 'var(--color-gold-light)', marginBottom: '0.5rem', position: 'relative' }}>Checkout & Pay</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Click on the <strong>Checkout</strong> button and finalize your payment securely using our PayPal gateway.
              </p>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(212, 175, 55, 0.05)', position: 'absolute', top: -10, left: -5 }}>03</div>
              <h4 style={{ color: 'var(--color-gold-light)', marginBottom: '0.5rem', position: 'relative' }}>Chat with Booster</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Once paid, you'll be transferred to a <strong>Private Chat</strong> to talk with your booster and track your progress in real-time.
              </p>
            </div>
          </div>
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.1)', textAlign: 'center' }}>
             <p style={{ margin: 0, color: 'var(--color-gold-light)', fontSize: '0.9rem' }}>
               Your service will be completed professionally within the estimated delivery time.
             </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR - ORDER SUMMARY */}
      <div style={{ position: 'sticky', top: '6rem', zIndex: 10 }}>
        <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-gold)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '1rem' }}>
            Order Summary
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Service</span>
              <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{currentServices.find(s => s.id === activeTab)?.label}</span>
            </div>
            
            {activeTab === 'ranked' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Progression</span>
                <span style={{ color: 'var(--color-text)' }}>{fromRank} → {toRank}</span>
              </div>
            )}

            {activeTab === 'trophy' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Progression</span>
                <span style={{ color: 'var(--color-text)' }}>{currentTrophies} → {currentTrophies + trophiesNeeded}</span>
              </div>
            )}

            {activeTab === 'prestige' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Level Config</span>
                <span style={{ color: 'var(--color-text)' }}>{fromPrestige} → {toPrestige}</span>
              </div>
            )}

            {activeTab === 'wow_leveling' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Leveling</span>
                <span style={{ color: 'var(--color-text)' }}>{wowLevelingSpeed.split(' ')[0]} {isExpress ? '(Express)' : ''}</span>
              </div>
            )}

            {activeTab === 'wow_raiding' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Raid Config</span>
                <span style={{ color: 'var(--color-text)' }}>{wowRaidDifficulty} {wowRaidLastBossOnly ? '(Last Boss)' : '(Full)'} {hasLootFunnel ? '+ Funnel' : ''}</span>
              </div>
            )}

            {activeTab === 'wow_pvp' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Target Goal</span>
                <span style={{ color: 'var(--color-text)' }}>{wowPvpTarget} ({isPiloted ? 'Piloted' : 'Self'})</span>
              </div>
            )}

            {activeTab === 'wow_mythic' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Service</span>
                <span style={{ color: 'var(--color-text)' }}>{wowMythicService.split(' (')[0]} ({isPiloted ? 'Piloted' : 'Self'})</span>
              </div>
            )}

            {activeTab === 'wow_coaching' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Sessions</span>
                <span style={{ color: 'var(--color-text)' }}>{wowCoachingHours} Hour{wowCoachingHours > 1 ? 's' : ''}</span>
              </div>
            )}

            {activeTab === 'fn_battlepass' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Leveling</span>
                <span style={{ color: 'var(--color-text)' }}>+{fnPassLevelStep} Lvl {isExpress ? '(Express)' : ''}</span>
              </div>
            )}

            {activeTab === 'fn_arena' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Arena Push</span>
                <span style={{ color: 'var(--color-text)' }}>Div {fromFnDiv.split('Div ')[1]} → {toFnDiv.split('Div ')[1]}</span>
              </div>
            )}

            {activeTab === 'fn_cosmetic' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Unlock</span>
                <span style={{ color: 'var(--color-text)' }}>{fnCosmeticChoice}</span>
              </div>
            )}

            {activeTab === 'fn_tourney' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Placement</span>
                <span style={{ color: 'var(--color-text)' }}>Tournament Cup</span>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                 <Clock size={16} color="var(--color-gold)" /> Est. Time
               </span>
               <span style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>{activeTab === 'custom' ? 'TBD' : '~ 2-4 Days'}</span>
            </div>
          </div>

          <div style={{ margin: '1.5rem 0', padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Original Price</span>
              <span style={{ textDecoration: originalPrice === 'TBD' ? 'none' : 'line-through', color: 'var(--color-text-muted)' }}>
                 {originalPrice === 'TBD' ? 'TBD' : `$${originalPrice}`}
              </span>
            </div>
            {activeTab !== 'custom' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)', fontWeight: 500, fontSize: '0.9rem' }}>
                <span>Discount (12%{extraDiscountStr})</span>
                <span>- ${savings}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--color-text)', fontSize: '1rem' }}>Total</span>
            <motion.span 
              key={finalPrice} 
              initial={{ scale: 1.1 }} 
              animate={{ scale: 1 }} 
              style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-sans)', color: 'var(--color-price-green)', textShadow: '0 0 20px rgba(46, 204, 113, 0.4)' }}
            >
              {finalPrice === 'TBD' ? 'TBD' : `$${finalPrice}`}
            </motion.span>
          </div>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', lineHeight: '1.4', marginBottom: '2rem', textAlign: 'center' }}>
            Note: These services are high-tier and hard to achieve.
          </p>
          {user ? (
            <button 
               onClick={handleCheckout}
               className="btn-primary" 
               style={{ width: '100%', padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1rem' }}
            >
              CHECKOUT <ChevronRight size={18} />
            </button>
          ) : (
            <button 
               onClick={onLogin}
               className="btn-primary" 
               style={{ width: '100%', padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1rem', background: 'linear-gradient(90deg, #7289DA 0%, #5865F2 100%)', border: 'none' }}
            >
              LOGIN TO ORDER <LogIn size={18} />
            </button>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: 'var(--color-gold)' }} />
            100% Secure
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
