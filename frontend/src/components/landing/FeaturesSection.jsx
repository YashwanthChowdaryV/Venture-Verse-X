import React from 'react';
import { motion } from 'framer-motion';
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

const FeaturesSection = () => {
    return (
        <section className="py-28 bg-[#F9F6EE]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">
                    <p className="text-[#FF7900] font-semibold uppercase tracking-widest mb-4">
                        Platform Features
                    </p>

                    <h2 className="text-5xl font-black text-[#1E1E1E] mb-6">
                        Everything Founders Need
                    </h2>

                    <p className="max-w-3xl mx-auto text-[#5C5C5C] text-lg">
                        VentureVerseX combines validation, strategy, intelligence,
                        and investor readiness into a single platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.05,
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className="bg-[#FCFAF5] border border-[#F2CF7E]/30 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#FFBF00]/15 flex items-center justify-center mb-5">
                                    <Icon className="w-7 h-7 text-[#FF7900]" />
                                </div>

                                <h3 className="text-xl font-bold text-[#1E1E1E] mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-[#5C5C5C] leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default FeaturesSection;