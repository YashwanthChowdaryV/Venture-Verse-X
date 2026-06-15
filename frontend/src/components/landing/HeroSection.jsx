import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Brain,
    BarChart3,
    Shield,
    Rocket
} from 'lucide-react';
import DotGrid from '../DotGrid';

const stats = [
    {
        title: '6 AI Agents',
        icon: Brain,
    },
    {
        title: '100+ Validation Signals',
        icon: BarChart3,
    },
    {
        title: 'Investor-Ready Reports',
        icon: Shield,
    },
    {
        title: 'RAG Knowledge Base',
        icon: Rocket,
    },
];

const HeroSection = () => {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#F6F3EA]">

            {/* Dot Grid Background */}
            <div className="absolute inset-0 opacity-50">
                <DotGrid
                    dotSize={4}
                    gap={18}
                    baseColor="#F2CF7E"
                    activeColor="#FF7900"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>

            {/* Gradient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFBF00]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF7900]/10 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

                <div className="flex flex-col items-center justify-center min-h-screen text-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F2CF7E]/50 bg-[#FCFAF5] mb-8"
                    >
                        <Brain className="w-4 h-4 text-[#FF7900]" />
                        <span className="text-sm font-medium text-[#1E1E1E]">
                            Multi-Agent Startup Intelligence Platform
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-black tracking-tight text-[#1E1E1E] max-w-5xl"
                    >
                        Build
                        <span className="text-[#FF7900]"> Investor-Ready </span>
                        Startups With VentureVerseX
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="mt-8 max-w-3xl text-lg md:text-xl text-[#5C5C5C] leading-relaxed"
                    >
                        VentureVerseX helps founders validate ideas, analyze competitors,
                        evaluate risks, understand customers, build financial models,
                        and generate investor-grade startup reports using a
                        powerful multi-agent AI system.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 mt-10"
                    >
                        <Link
                            to="/register"
                            className="group px-7 py-4 rounded-2xl bg-[#FFBF00] hover:bg-[#FFE642] transition-all font-semibold text-[#1E1E1E] flex items-center justify-center gap-2 shadow-lg"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            to="/login"
                            className="px-7 py-4 rounded-2xl bg-[#FCFAF5] border border-[#F2CF7E]/50 hover:border-[#FF7900] transition-all font-semibold text-[#1E1E1E]"
                        >
                            Sign In
                        </Link>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-20 w-full max-w-6xl"
                    >
                        {stats.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    whileHover={{
                                        y: -6,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="bg-[#FCFAF5] border border-[#F2CF7E]/40 rounded-3xl p-6 shadow-sm"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#FFBF00]/15 flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-[#FF7900]" />
                                    </div>

                                    <h3 className="font-bold text-[#1E1E1E] text-lg">
                                        {item.title}
                                    </h3>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;