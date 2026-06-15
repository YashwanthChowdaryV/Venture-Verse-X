import React from 'react';
import { motion } from 'framer-motion';
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

const AgentShowcase = () => {
    return (
        <section className="py-28 bg-[#F9F6EE]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <p className="text-[#FF7900] font-semibold uppercase tracking-wider mb-4">
                        AI Workforce
                    </p>

                    <h2 className="text-5xl font-black text-[#1E1E1E] mb-6">
                        Six Specialized AI Agents
                    </h2>

                    <p className="max-w-3xl mx-auto text-[#5C5C5C] text-lg">
                        Every startup is evaluated from multiple perspectives,
                        generating investor-grade insights instead of generic AI responses.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {agents.map((agent, index) => {
                        const Icon = agent.icon;

                        return (
                            <motion.div
                                key={agent.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className="bg-[#FCFAF5] border border-[#F2CF7E]/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#FFBF00]/15 flex items-center justify-center mb-6">
                                    <Icon className="w-7 h-7 text-[#FF7900]" />
                                </div>

                                <h3 className="text-2xl font-bold text-[#1E1E1E] mb-4">
                                    {agent.title}
                                </h3>

                                <p className="text-[#5C5C5C] leading-relaxed">
                                    {agent.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AgentShowcase;