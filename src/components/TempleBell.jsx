import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Animated hanging temple bell with a subtle chime.
 * Click to ring — a synthesized brass-bell sample (public/assets/bell-chime.wav)
 * plays through a shared Audio element. Sound can be toggled and the
 * preference persists in localStorage.
 */
export default function TempleBell({ size = 44, className = '' }) {
  const audioRef = useRef(null);
  const [soundOn, setSoundOn] = useState(() => {
    try {
      return localStorage.getItem('gaya-ji-bell-sound') !== 'off';
    } catch {
      return true;
    }
  });
  const [ringing, setRinging] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('assets/bell-chime.wav');
    audioRef.current.volume = 0.55;
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const toggleSound = useCallback((e) => {
    e.stopPropagation();
    setSoundOn((s) => {
      const next = !s;
      try {
        localStorage.setItem('gaya-ji-bell-sound', next ? 'on' : 'off');
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const ring = useCallback(() => {
    setRinging(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setRinging(false), 1200);
    if (soundOn && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [soundOn]);

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`} title="Temple Bell">
      {/* hanging chain */}
      <div className="h-4 w-0.5 bg-gradient-to-b from-golden/80 to-golden" />
      {/* bell */}
      <button
        type="button"
        onClick={ring}
        aria-label="Ring temple bell"
        className={`group relative outline-none ${ringing ? 'animate-bell-swing-fast' : 'animate-bell-swing'}`}
        style={{ transformOrigin: 'top center' }}
      >
        <svg width={size} height={size * 1.15} viewBox="0 0 48 56" fill="none" className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]">
          <defs>
            <linearGradient id="bellGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F2C469" />
              <stop offset="55%" stopColor="#E5A93C" />
              <stop offset="100%" stopColor="#C78A1F" />
            </linearGradient>
          </defs>
          {/* dome */}
          <path d="M8 30 C8 15 14 6 24 6 C34 6 40 15 40 30 L40 33 L8 33 Z" fill="url(#bellGrad)" />
          {/* rim */}
          <rect x="5" y="33" width="38" height="5" rx="2.5" fill="#C78A1F" />
          {/* clapper */}
          <rect x="22.5" y="38" width="3" height="8" rx="1.5" fill="#C78A1F" />
          <circle cx="24" cy="49" r="4.5" fill="#F2C469" />
          {/* top knob */}
          <circle cx="24" cy="6" r="3.5" fill="#F2C469" />
        </svg>
      </button>
      {/* sound toggle */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={soundOn ? 'Mute bell' : 'Unmute bell'}
        className="mt-1 rounded-full bg-maroon/5 p-1 text-maroon/50 transition hover:bg-maroon/10 hover:text-maroon dark:bg-golden/10 dark:text-golden/70 dark:hover:bg-golden/20 dark:hover:text-golden"
      >
        {soundOn ? <Volume2 size={12} /> : <VolumeX size={12} />}
      </button>
    </div>
  );
}
