import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Brain,
    TrendingUp,
    DollarSign,
    Users,
    ShieldAlert,
    Rocket
} from 'lucide-react';

const agents = [
    {
        icon: TrendingUp,
        title: 'Investor Agent',
        description:
            'Evaluates investment attractiveness, market opportunity, TAM/SAM/SOM, VC appeal, and fundraising readiness.',
    },
    {
        icon: Brain,
        title: 'Competitor Agent',
        description:
            'Analyzes direct competitors, indirect competitors, moats, market saturation, and positioning.',
    },
    {
        icon: DollarSign,
        title: 'Finance Agent',
        description:
            'Builds revenue models, projections, runway estimates, burn rate analysis, and fundraising needs.',
    },
    {
        icon: Users,
        title: 'Customer Agent',
        description:
            'Validates customer demand, personas, adoption likelihood, retention, and product-market fit.',
    },
    {
        icon: ShieldAlert,
        title: 'Risk Agent',
        description:
            'Identifies market, financial, execution, technology, regulatory, and scalability risks.',
    },
    {
        icon: Rocket,
        title: 'Product Strategy Agent',
        description:
            'Creates MVP plans, GTM strategy, product roadmap, KPIs, and growth initiatives.',
    },
];

// Decrypted Text Component (for agent titles only)
const DecryptedText = ({ text, delay = 0 }) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const [displayText, setDisplayText] = useState('');
    const [isDecrypting, setIsDecrypting] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setIsDecrypting(true);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [isInView, delay]);

    useEffect(() => {
        if (!isDecrypting) return;

        let iterations = 0;
        const maxIterations = text.length;

        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iterations) return text[index];
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('')
            );

            iterations += 0.8;

            if (iterations >= maxIterations) {
                clearInterval(interval);
                setDisplayText(text);
            }
        }, 40);

        return () => clearInterval(interval);
    }, [isDecrypting, text]);

    return <span ref={ref}>{displayText || text}</span>;
};

// Border Drawing Component
const BorderDrawCard = ({ children, isActive, delay }) => {
    const [animationComplete, setAnimationComplete] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setAnimationComplete(true);
            }, delay + 800); // Duration of border animation
            return () => clearTimeout(timer);
        }
    }, [isInView, delay]);

    return (
        <motion.div
            ref={ref}
            className="relative"
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{
                duration: 0.5,
                delay: delay * 0.001,
                type: "spring",
                damping: 20,
                stiffness: 70
            }}
        >
            {/* Border Drawing SVG */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {/* Top border */}
                    <motion.line
                        x1="0" y1="0" x2="100" y2="0"
                        stroke="url(#borderGradient)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 0.4, delay: delay * 0.001, ease: "easeInOut" }}
                    />
                    {/* Right border */}
                    <motion.line
                        x1="100" y1="0" x2="100" y2="100"
                        stroke="url(#borderGradient)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 0.4, delay: delay * 0.001 + 0.2, ease: "easeInOut" }}
                    />
                    {/* Bottom border */}
                    <motion.line
                        x1="100" y1="100" x2="0" y2="100"
                        stroke="url(#borderGradient)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 0.4, delay: delay * 0.001 + 0.4, ease: "easeInOut" }}
                    />
                    {/* Left border */}
                    <motion.line
                        x1="0" y1="100" x2="0" y2="0"
                        stroke="url(#borderGradient)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 0.4, delay: delay * 0.001 + 0.6, ease: "easeInOut" }}
                    />

                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFBF00" />
                            <stop offset="50%" stopColor="#FF7900" />
                            <stop offset="100%" stopColor="#FFBF00" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Card Content */}
            <div className={`bg-[#FCFAF5] rounded-3xl p-8 transition-all duration-500 relative overflow-hidden
                ${isActive
                    ? 'border border-[#FFBF00]/30 shadow-lg'
                    : 'border border-[#F2CF7E]/20'
                }`}
            >
                {/* Subtle inner glow when active */}
                {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFBF00]/3 to-transparent opacity-50" />
                )}

                <div className="relative z-20">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

// Split Word for Section Title
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

const AgentShowcase = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
    const [deployedAgents, setDeployedAgents] = useState([]);
    const [allDeployed, setAllDeployed] = useState(false);

    useEffect(() => {
        if (isInView) {
            // Sequential deployment
            const timers = agents.map((_, index) => {
                return setTimeout(() => {
                    setDeployedAgents(prev => [...prev, index]);

                    // Check if all agents are deployed
                    if (index === agents.length - 1) {
                        setTimeout(() => {
                            setAllDeployed(true);
                        }, 500);
                    }
                }, index * 200 + 300); // 200ms between each agent deployment
            });

            return () => timers.forEach(timer => clearTimeout(timer));
        } else {
            setDeployedAgents([]);
            setAllDeployed(false);
        }
    }, [isInView]);

    return (
        <section ref={sectionRef} className="py-28 bg-[#F9F6EE] relative overflow-hidden">

            {/* Subtle grid pattern for AI feel */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #FF7900 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-[#FF7900] font-semibold uppercase tracking-wider mb-4">
                            AI Workforce
                        </p>
                    </motion.div>

                    <h2 className="text-5xl font-black text-[#1E1E1E] mb-6">
                        <SplitWord text="Six Specialized AI Agents" delay={0.2} />
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="max-w-3xl mx-auto text-[#5C5C5C] text-lg"
                    >
                        Every startup is evaluated from multiple perspectives,
                        generating investor-grade insights instead of generic AI responses.
                    </motion.p>
                </div>

                {/* System Status Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-center gap-3 mb-12"
                >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCFAF5] border border-[#F2CF7E]/30">
                        <div className={`w-2 h-2 rounded-full ${allDeployed ? 'bg-green-500' : 'bg-[#FF7900]'}`}>
                            {!allDeployed && (
                                <div className="w-full h-full rounded-full bg-[#FF7900] animate-ping" />
                            )}
                        </div>
                        <span className="text-sm font-medium text-[#5C5C5C]">
                            {allDeployed
                                ? '● All Agents Online'
                                : `● Deploying Agents (${deployedAgents.length}/${agents.length})`
                            }
                        </span>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {agents.map((agent, index) => {
                        const Icon = agent.icon;
                        const isDeployed = deployedAgents.includes(index);

                        return (
                            <BorderDrawCard
                                key={agent.title}
                                isActive={isDeployed}
                                delay={300 + index * 200}
                            >
                                {/* Icon with activation effect */}
                                <div className="w-14 h-14 rounded-2xl bg-[#FFBF00]/15 flex items-center justify-center mb-6 relative">
                                    <Icon className="w-7 h-7 text-[#FF7900]" />

                                    {/* Deployment pulse */}
                                    {isDeployed && (
                                        <motion.div
                                            initial={{ scale: 1, opacity: 0.5 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                                            className="absolute inset-0 rounded-2xl bg-[#FF7900]/20"
                                        />
                                    )}
                                </div>

                                {/* Agent Title */}
                                <h3 className="text-2xl font-bold text-[#1E1E1E] mb-3">
                                    <DecryptedText text={agent.title} delay={index * 200} />
                                </h3>

                                {/* Status Indicator */}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isDeployed ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    className="flex items-center gap-2 mb-4"
                                >
                                    <div className="relative">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
                                    </div>
                                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                                        {isDeployed ? 'Specialized AI Agent' : 'Deploying...'}
                                    </span>
                                </motion.div>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={isDeployed ? { opacity: 1 } : { opacity: 0.5 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-[#5C5C5C] leading-relaxed"
                                >
                                    {agent.description}
                                </motion.p>

                                {/* Glass hover overlay */}
                                <div className="absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 hover:opacity-100 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,191,0,0.05) 0%, rgba(255,121,0,0.05) 100%)',
                                        boxShadow: 'inset 0 0 0 1px rgba(255,191,0,0.3)'
                                    }}
                                />
                            </BorderDrawCard>
                        );
                    })}
                </div>

                {/* All Systems Operational Message */}
                {allDeployed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mt-12"
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FCFAF5] border border-[#F2CF7E]/40">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-sm font-semibold text-[#1E1E1E]">
                                All Systems Operational — Ready to Evaluate Your Startup
                            </span>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default AgentShowcase;