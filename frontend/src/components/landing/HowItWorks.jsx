import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Lightbulb,
    Brain,
    FileSearch,
    FileText
} from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Lightbulb,
        title: 'Create Startup',
        description:
            'Add your startup idea, problem statement, target market, business model, and vision.',
    },
    {
        number: '02',
        icon: Brain,
        title: 'Run AI Analysis',
        description:
            'Six specialized AI agents evaluate your startup from multiple business perspectives.',
    },
    {
        number: '03',
        icon: FileSearch,
        title: 'Deep Validation',
        description:
            'Investment, competitors, finance, customers, risks, and product strategy are analyzed.',
    },
    {
        number: '04',
        icon: FileText,
        title: 'Executive Report',
        description:
            'Receive investor-ready reports, recommendations, SWOT analysis, and action plans.',
    },
];

// Spotlight Card Component
const SpotlightStep = ({ children, className = '', isActive }) => {
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
        >
            {/* Spotlight Effect */}
            {isHovered && !isMobile && (
                <div
                    className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(255, 191, 0, 0.1), transparent 40%)`,
                    }}
                />
            )}

            {children}
        </div>
    );
};

// Floating Icon Component
const FloatingIcon = ({ icon: Icon, isActive }) => {
    return (
        <motion.div
            className="relative"
            animate={{
                y: [-4, 4, -4],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2, // Random delay for natural movement
            }}
        >
            <div className={`w-28 h-28 rounded-full mx-auto flex flex-col items-center justify-center shadow-sm mb-8 transition-all duration-700
                ${isActive
                    ? 'bg-[#FFBF00]/20 border-2 border-[#FF7900]'
                    : 'bg-[#FCFAF5] border border-[#F2CF7E]/40'
                }`}
            >
                <Icon className={`w-8 h-8 mb-1 transition-all duration-700 ${isActive ? 'text-[#FF7900]' : 'text-[#FF7900]'}`} />
                <span className={`text-sm font-bold transition-all duration-700 ${isActive ? 'text-[#FF7900]' : 'text-[#FF7900]'}`}>
                    {/* Number will be handled by parent */}
                </span>
            </div>
        </motion.div>
    );
};

// CountUp Component
const CountUp = ({ end, duration = 1.5 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const startAnimation = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            const easeOutExpo = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOutExpo * end);

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(startAnimation);
            }
        };

        animationFrame = requestAnimationFrame(startAnimation);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isInView, end, duration]);

    return (
        <span ref={ref}>
            {String(count).padStart(2, '0')}
        </span>
    );
};

// Split Word Animation for Title
const SplitWord = ({ text, delay = 0 }) => {
    const words = text.split(' ');

    return (
        <span className="inline">
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        delay: delay + index * 0.2,
                        type: "spring",
                        damping: 15,
                        stiffness: 70
                    }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

const HowItWorks = () => {
    const timelineRef = useRef(null);
    const isInView = useInView(timelineRef, { once: false, margin: '-100px' });
    const [activeSteps, setActiveSteps] = useState([]);

    useEffect(() => {
        if (isInView) {
            // Animate timeline fill step by step
            const timers = steps.map((_, index) => {
                return setTimeout(() => {
                    setActiveSteps(prev => [...prev, index]);
                }, index * 600); // 600ms between each step
            });

            return () => timers.forEach(timer => clearTimeout(timer));
        } else {
            setActiveSteps([]);
        }
    }, [isInView]);

    return (
        <section className="py-28 bg-[#F6F3EA]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-[#FF7900] font-semibold uppercase tracking-widest mb-4"
                    >
                        Process
                    </motion.p>

                    <h2 className="text-5xl font-black text-[#1E1E1E] mb-6">
                        <SplitWord text="How VentureVerseX Works" delay={0.3} />
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="max-w-3xl mx-auto text-[#5C5C5C] text-lg"
                    >
                        From startup idea to investor-grade intelligence in just a few steps.
                    </motion.p>
                </div>

                <div ref={timelineRef} className="relative">

                    {/* Animated Timeline */}
                    <div className="hidden lg:block absolute left-0 right-0 top-14 h-1 bg-[#F2CF7E]/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#FFBF00] to-[#FF7900] rounded-full"
                            initial={{ width: '0%' }}
                            animate={isInView ? { width: `${(activeSteps.length / steps.length) * 100}%` } : { width: '0%' }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />
                    </div>

                    <div className="grid lg:grid-cols-4 gap-10 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeSteps.includes(index);

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.15,
                                    }}
                                    className="text-center"
                                >
                                    <SpotlightStep isActive={isActive}>
                                        <div className="relative">
                                            {/* Floating Icon with active state */}
                                            <motion.div
                                                animate={{
                                                    y: [-4, 4, -4],
                                                }}
                                                transition={{
                                                    duration: 5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: index * 0.5,
                                                }}
                                            >
                                                <div className={`w-28 h-28 rounded-full mx-auto flex flex-col items-center justify-center shadow-sm mb-8 transition-all duration-700 relative
                                                    ${isActive
                                                        ? 'bg-[#FFBF00]/20 border-2 border-[#FF7900] scale-105'
                                                        : 'bg-[#FCFAF5] border border-[#F2CF7E]/40'
                                                    }`}
                                                >
                                                    {/* Glow effect when active */}
                                                    {isActive && (
                                                        <div className="absolute inset-0 rounded-full bg-[#FFBF00]/10 blur-md animate-pulse" />
                                                    )}

                                                    <Icon className={`w-8 h-8 mb-1 relative z-10 transition-all duration-700 ${isActive ? 'scale-110' : ''}`} />

                                                    <span className="text-sm font-bold relative z-10">
                                                        {isInView ? (
                                                            <CountUp end={index + 1} />
                                                        ) : (
                                                            '00'
                                                        )}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        </div>

                                        <motion.h3
                                            className={`text-2xl font-bold mb-4 transition-colors duration-700
                                                ${isActive ? 'text-[#FF7900]' : 'text-[#1E1E1E]'}
                                            `}
                                        >
                                            {step.title}
                                        </motion.h3>

                                        <p className="text-[#5C5C5C] leading-relaxed">
                                            {step.description}
                                        </p>
                                    </SpotlightStep>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;