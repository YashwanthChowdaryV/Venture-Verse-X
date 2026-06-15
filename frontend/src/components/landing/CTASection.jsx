import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-32 bg-[#F6F3EA]">
            <div className="max-w-6xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-[40px] bg-[#FCFAF5] border border-[#F2CF7E]/40 shadow-xl"
                >

                    {/* Decorative Glow */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFBF00]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF7900]/10 rounded-full blur-3xl" />

                    <div className="relative z-10 px-10 py-20 md:px-20 text-center">

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F2CF7E]/40 bg-[#FFBF00]/10 mb-8">
                            <Sparkles className="w-4 h-4 text-[#FF7900]" />
                            <span className="text-sm font-medium text-[#1E1E1E]">
                                VentureVerseX Intelligence Platform
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-[#1E1E1E] leading-tight mb-6">
                            Transform Ideas Into
                            <span className="text-[#FF7900]"> Investor-Ready </span>
                            Startups
                        </h2>

                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-[#5C5C5C] leading-relaxed mb-12">
                            Stop guessing. Let six specialized AI agents evaluate
                            your startup, identify risks, validate opportunities,
                            and generate actionable business intelligence.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">

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

                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">

                            <div>
                                <h3 className="text-3xl font-black text-[#FF7900]">
                                    6
                                </h3>
                                <p className="text-sm text-[#5C5C5C]">
                                    AI Agents
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-black text-[#FF7900]">
                                    100+
                                </h3>
                                <p className="text-sm text-[#5C5C5C]">
                                    Signals Evaluated
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-black text-[#FF7900]">
                                    RAG
                                </h3>
                                <p className="text-sm text-[#5C5C5C]">
                                    Knowledge Base
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-black text-[#FF7900]">
                                    AI
                                </h3>
                                <p className="text-sm text-[#5C5C5C]">
                                    Executive Reports
                                </p>
                            </div>

                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default CTASection;