import React from 'react';
import { motion } from 'framer-motion';

const RuleBook = () => {
    return (
        <section style={{
            padding: '120px 20px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            {/* Background elements */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 60%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '800px', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '80px',
                            height: '80px',
                            borderRadius: '24px',
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            boxShadow: '0 10px 30px -10px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.2)',
                            marginBottom: '30px'
                        }}
                    >
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                    </motion.div>

                    <h2 className="shimmer-text" style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: '900',
                        letterSpacing: '-1.5px',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to right, #ffffff, #06b6d4, #ffffff)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        animation: 'shine 4s linear infinite'
                    }}>
                        Official Rulebook
                    </h2>

                    <p style={{
                        color: '#94a3b8',
                        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                        maxWidth: '550px',
                        margin: '0 auto 50px auto',
                        lineHeight: 1.7,
                    }}>
                        Discover the guidelines, schedules, and important details. Ensure you're fully prepared for an unforgettable alumni experience.
                    </p>

                    <motion.a
                        href="/gallery/rulebook.pdf"
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                            color: '#ffffff',
                            textDecoration: 'none',
                            padding: '18px 40px',
                            borderRadius: '100px',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            letterSpacing: '1px',
                            boxShadow: '0 20px 40px -10px rgba(6, 182, 212, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        className="premium-btn"
                    >
                        {/* Shimmer effect inside button */}
                        <div className="btn-shimmer" style={{
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                            transform: 'skewX(-25deg)',
                            animation: 'sweep 3s infinite',
                        }} />

                        <span style={{ position: 'relative', zIndex: 1 }}>Read the Rulebook</span>
                        <svg
                            style={{ position: 'relative', zIndex: 1 }}
                            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </motion.a>
                </motion.div>
            </div>

            <style>{`
                @keyframes sweep {
                    0% { left: -100%; }
                    20% { left: 200%; }
                    100% { left: 200%; }
                }
                
                .premium-btn {
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                
                .premium-btn:hover {
                    box-shadow: 0 25px 50px -12px rgba(6, 182, 212, 0.7), inset 0 2px 0 rgba(255, 255, 255, 0.4) !important;
                }
                
                .premium-btn:hover svg {
                    transform: translateX(4px);
                    transition: transform 0.3s ease;
                }
            `}</style>
        </section>
    );
};

export default RuleBook;
