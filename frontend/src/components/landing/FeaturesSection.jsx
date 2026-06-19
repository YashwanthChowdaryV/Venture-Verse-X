import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Lightbulb,
    BarChart3,
    DollarSign,
    Users,
    Shield,
    Rocket,
    Database,
    FileText
} from 'lucide-react';

const features = [
    {
        icon: Lightbulb,
        title: 'Startup Validation',
        description:
            'Evaluate startup viability, market opportunity, and investment potential.',
    },
    {
        icon: BarChart3,
        title: 'Competitor Intelligence',
        description:
            'Discover competitors, market gaps, moats, and positioning opportunities.',
    },
    {
        icon: DollarSign,
        title: 'Financial Planning',
        description:
            'Revenue projections, burn analysis, runway estimation, and fundraising readiness.',
    },
    {
        icon: Users,
        title: 'Customer Research',
        description:
            'Understand personas, customer pain points, adoption, and retention potential.',
    },
    {
        icon: Shield,
        title: 'Risk Assessment',
        description:
            'Identify financial, operational, regulatory, and technology risks early.',
    },
    {
        icon: Rocket,
        title: 'Product Strategy',
        description:
            'Build MVP roadmaps, GTM plans, KPIs, and execution milestones.',
    },
    {
        icon: Database,
        title: 'Knowledge Base',
        description:
            'Upload documents and leverage RAG-powered intelligence during evaluations.',
    },
    {
        icon: FileText,
        title: 'Executive Summaries',
        description:
            'Generate investor-ready reports and actionable startup recommendations.',
    },
];

const statsRow = [
    { value: 6, suffix: '', label: 'AI Agents' },
    { value: 100, suffix: '+', label: 'Signals' },
    { value: 8, suffix: '', label: 'Analysis Modules' },
    { value: 1000, suffix: '+', label: 'Reports Generated' },
];

// CountUp Component
const CountUp = ({ end, suffix = '', duration = 2 }) => {
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
        >
            {/* Spotlight Effect */}
            {isHovered && !isMobile && (
                <div
                    className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(255, 191, 0, 0.12), transparent 40%)`,
                    }}
                />
            )}

            {children}
        </div>
    );
};

// Feature Card with Activation Effect
const FeatureCard = ({ feature, index }) => {
    const Icon = feature.icon;
    const [isActivated, setIsActivated] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [showActivated, setShowActivated] = useState(false);

    useEffect(() => {
        if (isInView) {
            // Show activation effect with delay based on index
            const timer = setTimeout(() => {
                setIsActivated(true);
                setShowActivated(true);

                // Hide activation text after 1.5 seconds
                setTimeout(() => {
                    setShowActivated(false);
                }, 1500);
            }, index * 100 + 300);

            return () => clearTimeout(timer);
        }
    }, [isInView, index]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{
                duration: 0.4,
                delay: index * 0.08,
                type: "spring",
                damping: 20,
                stiffness: 70
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.2 }
            }}
        >
            <SpotlightCard className={`bg-[#FCFAF5] border rounded-3xl p-7 shadow-sm transition-all duration-300 h-full
                ${isActivated
                    ? 'border-[#FF7900]/60 shadow-lg shadow-[#FF7900]/5'
                    : 'border-[#F2CF7E]/30 hover:shadow-xl hover:border-[#FFBF00]/50'
                }`}
            >
                {/* Floating Icon */}
                <motion.div
                    animate={{
                        y: [-3, 3, -3],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.7,
                    }}
                    className="w-14 h-14 rounded-2xl bg-[#FFBF00]/15 flex items-center justify-center mb-5 relative"
                >
                    {/* Activation Pulse */}
                    {isActivated && (
                        <motion.div
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute inset-0 rounded-2xl bg-[#FF7900]/20"
                        />
                    )}
                    <Icon className="w-7 h-7 text-[#FF7900] relative z-10" />
                </motion.div>

                {/* Title with activation indicator */}
                <div className="relative mb-3">
                    <h3 className="text-xl font-bold text-[#1E1E1E]">
                        {feature.title}
                    </h3>

                    {/* Activation Badge */}
                    {showActivated && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute -top-1 -right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFBF00]/20 border border-[#FF7900]/30"
                        >
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-1.5 h-1.5 rounded-full bg-[#FF7900]"
                            />
                            <span className="text-[10px] font-semibold text-[#FF7900] whitespace-nowrap">
                                Active
                            </span>
                        </motion.div>
                    )}
                </div>

                <p className="text-[#5C5C5C] leading-relaxed">
                    {feature.description}
                </p>
            </SpotlightCard>
        </motion.div>
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
                        delay: delay + index * 0.15,
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

const FeaturesSection = () => {
    return (
        <section className="py-28 bg-[#F9F6EE]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-[#FF7900] font-semibold uppercase tracking-widest mb-4"
                    >
                        Platform Features
                    </motion.p>

                    <h2 className="text-5xl font-black text-[#1E1E1E] mb-6">
                        <SplitWord text="Everything Founders Need" delay={0.2} />
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="max-w-3xl mx-auto text-[#5C5C5C] text-lg"
                    >
                        VentureVerseX combines validation, strategy, intelligence,
                        and investor readiness into a single platform.
                    </motion.p>
                </div>

                {/* Stats Row with CountUp */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
                >
                    {statsRow.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                            className="text-center"
                        >
                            <h3 className="text-3xl font-black text-[#FF7900] mb-1">
                                <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                            </h3>
                            <p className="text-sm text-[#5C5C5C] font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturesSection;