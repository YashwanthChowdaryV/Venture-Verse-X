import React from 'react';
import { motion } from 'framer-motion';
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

const HowItWorks = () => {
    return (
        <section className="py-28 bg-[#F6F3EA]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">
                    <p className="text-[#FF7900] font-semibold uppercase tracking-widest mb-4">
                        Process
                    </p>

                    <h2 className="text-5xl font-black text-[#1E1E1E] mb-6">
                        How VentureVerseX Works
                    </h2>

                    <p className="max-w-3xl mx-auto text-[#5C5C5C] text-lg">
                        From startup idea to investor-grade intelligence in just a few steps.
                    </p>
                </div>

                <div className="relative">

                    {/* Timeline */}
                    <div className="hidden lg:block absolute left-0 right-0 top-14 h-1 bg-[#F2CF7E]/40"></div>

                    <div className="grid lg:grid-cols-4 gap-10 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

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
                                    <div className="w-28 h-28 rounded-full bg-[#FCFAF5] border border-[#F2CF7E]/40 mx-auto flex flex-col items-center justify-center shadow-sm mb-8">

                                        <Icon className="w-8 h-8 text-[#FF7900] mb-1" />

                                        <span className="text-sm font-bold text-[#FF7900]">
                                            {step.number}
                                        </span>

                                    </div>

                                    <h3 className="text-2xl font-bold text-[#1E1E1E] mb-4">
                                        {step.title}
                                    </h3>

                                    <p className="text-[#5C5C5C] leading-relaxed">
                                        {step.description}
                                    </p>
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