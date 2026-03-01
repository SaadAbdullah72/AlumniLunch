import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlipDigit = ({ value, label, index, max }) => {
    const prevValue = useRef(value);
    const displayValue = String(value ?? 0).padStart(2, '0');
    const progress = max > 0 ? (value ?? 0) / max : 0;

    useEffect(() => {
        prevValue.current = value;
    }, [value]);

    // SVG circular progress
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;

    const accentColors = [
        { main: '#06b6d4', glow: 'rgba(6,182,212,0.35)' },   // cyan
        { main: '#8b5cf6', glow: 'rgba(139,92,246,0.35)' },   // violet
        { main: '#f59e0b', glow: 'rgba(245,158,11,0.35)' },   // amber
        { main: '#ef4444', glow: 'rgba(239,68,68,0.35)' },    // red
    ];
    const color = accentColors[index % accentColors.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                position: 'relative',
            }}
        >
            {/* Outer ring container */}
            <div style={{
                position: 'relative',
                width: '160px',
                height: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* Background glow */}
                <div style={{
                    position: 'absolute',
                    inset: '-10px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${color.glow} 0%, transparent 70%)`,
                    filter: 'blur(15px)',
                    opacity: 0.5,
                    transition: 'opacity 0.5s ease',
                }} />

                {/* SVG Ring */}
                <svg
                    width="160"
                    height="160"
                    viewBox="0 0 140 140"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: 'rotate(-90deg)',
                        filter: `drop-shadow(0 0 8px ${color.glow})`,
                    }}
                >
                    {/* Track */}
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="4"
                    />
                    {/* Progress */}
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="none"
                        stroke={color.main}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{
                            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    />
                </svg>

                {/* Glass card inner */}
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 2,
                }}>
                    {/* Inner shimmer */}
                    <div style={{
                        position: 'absolute',
                        top: '-20%',
                        left: '-20%',
                        width: '140%',
                        height: '60%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                    }} />

                    {/* Animated number */}
                    <div style={{
                        height: '55px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={value}
                                initial={{ y: 30, opacity: 0, scale: 0.7, filter: 'blur(6px)' }}
                                animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ y: -30, opacity: 0, scale: 0.7, filter: 'blur(6px)' }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 20,
                                    mass: 0.8,
                                }}
                                style={{
                                    fontSize: '2.8rem',
                                    fontWeight: '800',
                                    fontFamily: 'var(--font-heading)',
                                    lineHeight: 1,
                                    color: '#fff',
                                    display: 'block',
                                    textShadow: `0 0 25px ${color.glow}`,
                                }}
                            >
                                {displayValue}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Label */}
            <span style={{
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                fontWeight: '700',
                letterSpacing: '3.5px',
                color: color.main,
                opacity: 0.9,
            }}>
                {label}
            </span>

            {/* Separator dots between units (except last) */}
        </motion.div>
    );
};

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const tl = calculateTimeLeft();
            setTimeLeft(tl);
            if (Object.keys(tl).length === 0) {
                setIsLive(true);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days, max: 365 },
        { label: 'Hours', value: timeLeft.hours, max: 24 },
        { label: 'Minutes', value: timeLeft.minutes, max: 60 },
        { label: 'Seconds', value: timeLeft.seconds, max: 60 },
    ];

    if (isLive) {
        return (
            <section style={{ padding: '80px 20px', textAlign: 'center' }}>
                <motion.h2
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                        fontSize: '3rem',
                        color: 'var(--accent-color)',
                        textShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
                    }}
                >
                    We Are Live 🎉
                </motion.h2>
            </section>
        );
    }

    return (
        <section style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
            <div className="container" style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {timeUnits.map((unit, index) => (
                    <React.Fragment key={unit.label}>
                        <FlipDigit
                            value={unit.value}
                            label={unit.label}
                            index={index}
                            max={unit.max}
                        />
                        {/* Colon separator */}
                        {index < timeUnits.length - 1 && (
                            <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                    alignSelf: 'center',
                                    marginBottom: '30px',
                                }}
                            >
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.5)',
                                    boxShadow: '0 0 8px rgba(255,255,255,0.3)',
                                }} />
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.5)',
                                    boxShadow: '0 0 8px rgba(255,255,255,0.3)',
                                }} />
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <style>{`
                @media (max-width: 600px) {
                    .container {
                        gap: 8px !important;
                    }
                }
            `}</style>
        </section>
    );
};


export default Countdown;
