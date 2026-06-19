import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

// CountUp Component
const CountUp = ({ end, suffix = '', duration = 2, delay = 0 }) => {
    const [count, setCount] = useState(0);
    const [key, setKey] = useState(0); // Add key to force re-render
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false, // Changed to false to trigger every time
        margin: '-50px'
    });

    useEffect(() => {
        if (!isInView) {
            setCount(0); // Reset count when out of view
            return;
        }

        let startTime;
        let animationFrame;

        const startAnimation = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function for smooth deceleration
            const easeOutExpo = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOutExpo * end);

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(startAnimation);
            }
        };

        const timeoutId = setTimeout(() => {
            animationFrame = requestAnimationFrame(startAnimation);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isInView, end, duration, delay, key]); // Added key dependency

    // Force re-render when coming back into view
    useEffect(() => {
        if (isInView) {
            setKey(prev => prev + 1);
        }
    }, [isInView]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
};

// Spotlight Card Component
const SpotlightCard = ({ children, className = '' }) => {
    const cardRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = (e) => {
        if (isMobile || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({ x, y });
    };

    const handleMouseEnter = () => {
        if (!isMobile) setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isMobile ? 'default' : 'pointer' }}
        >
            {/* Spotlight Effect */}
            {isHovered && !isMobile && (
                <div
                    className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255, 191, 0, 0.08), transparent 40%)`,
                    }}
                />
            )}

            {/* Children */}
            <div className="relative z-30">
                {children}
            </div>
        </div>
    );
};

// True Focus Text Component
const TrueFocus = ({ children, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false, // Changed to false to trigger every time
        margin: '-100px'
    });

    return (
        <motion.p
            ref={ref}
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : { filter: 'blur(10px)', opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.p>
    );
};

const CTASection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: false, // Changed to false
        margin: '-100px'
    });

    const stats = [
        { end: 6, suffix: '+', label: 'AI Agents' },
        { end: 100, suffix: '+', label: 'Signals Evaluated' },
        { end: 24, suffix: '/7', label: 'Intelligence Engine' },
        { end: 1000, suffix: '+', label: 'Strategic Insights' },
    ];

    return (
        <section ref={sectionRef} className="py-32 bg-[#F6F3EA]">
            <div className="max-w-6xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                    transition={{ duration: 0.5 }}
                >

                    <SpotlightCard className="rounded-[40px] bg-[#FCFAF5] border border-[#F2CF7E]/40 shadow-xl">

                        {/* Decorative Glow */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFBF00]/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF7900]/10 rounded-full blur-3xl" />

                        <div className="relative z-10 px-10 py-20 md:px-20 text-center">

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F2CF7E]/40 bg-[#FFBF00]/10 mb-8"
                            >
                                <Sparkles className="w-4 h-4 text-[#FF7900]" />
                                <span className="text-sm font-medium text-[#1E1E1E]">
                                    VentureVerseX Intelligence Platform
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-4xl md:text-6xl font-black text-[#1E1E1E] leading-tight mb-6"
                            >
                                Transform Ideas Into
                                <span className="text-[#FF7900]"> Investor-Ready </span>
                                Startups
                            </motion.h2>

                            <TrueFocus className="max-w-3xl mx-auto text-lg md:text-xl text-[#5C5C5C] leading-relaxed mb-12">
                                Stop guessing. Let six specialized AI agents evaluate
                                your startup, identify risks, validate opportunities,
                                and generate actionable business intelligence.
                            </TrueFocus>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-5"
                            >
                                <Link
                                    to="/register"
                                    className="group px-8 py-4 rounded-2xl bg-[#FFBF00] hover:bg-[#FFE642] transition-all font-bold text-[#1E1E1E] flex items-center gap-2 shadow-lg"
                                >
                                    Create Free Account
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    to="/login"
                                    className="px-8 py-4 rounded-2xl border border-[#F2CF7E]/50 bg-white/50 hover:border-[#FF7900] transition-all font-bold text-[#1E1E1E]"
                                >
                                    Sign In
                                </Link>
                            </motion.div>

                            {/* Stats Grid with CountUp */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                        className="group"
                                    >
                                        <h3 className="text-3xl md:text-4xl font-black text-[#FF7900] mb-1 transition-transform group-hover:scale-110">
                                            <CountUp
                                                end={stat.end}
                                                suffix={stat.suffix}
                                                duration={2}
                                                delay={index * 200}
                                            />
                                        </h3>
                                        <p className="text-sm text-[#5C5C5C] font-medium">
                                            {stat.label}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                        </div>

                    </SpotlightCard>

                </motion.div>

            </div>
        </section>
    );
};

export default CTASection;