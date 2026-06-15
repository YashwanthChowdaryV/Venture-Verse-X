import React, { useEffect, useState } from 'react';
import {
    Brain,
    TrendingUp,
    DollarSign,
    Users,
    ShieldAlert,
    Rocket,
    CheckCircle2,
    Loader2
} from 'lucide-react';

const agents = [
    {
        title: 'Investor Agent',
        icon: TrendingUp,
        color: 'text-[#FF7900]',
    },
    {
        title: 'Competitor Agent',
        icon: Brain,
        color: 'text-[#FF7900]',
    },
    {
        title: 'Finance Agent',
        icon: DollarSign,
        color: 'text-[#FF7900]',
    },
    {
        title: 'Customer Agent',
        icon: Users,
        color: 'text-[#FF7900]',
    },
    {
        title: 'Risk Agent',
        icon: ShieldAlert,
        color: 'text-[#FF7900]',
    },
    {
        title: 'Product Strategy Agent',
        icon: Rocket,
        color: 'text-[#FF7900]',
    },
];

const AnalysisLoadingModal = ({ open }) => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (!open) return;

        setCurrentStep(0);

        const interval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev >= agents.length) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1800);

        return () => clearInterval(interval);
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md flex items-center justify-center p-6">

            <div className="bg-[#FCFAF5] border border-[#F2CF7E]/40 rounded-[32px] p-8 max-w-3xl w-full shadow-2xl">

                <div className="text-center mb-10">

                    <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FFBF00]/15 flex items-center justify-center mb-5">
                        <Brain className="w-10 h-10 text-[#FF7900]" />
                    </div>

                    <h2 className="text-3xl font-black text-[#1E1E1E] mb-3">
                        Analyzing Your Startup
                    </h2>

                    <p className="text-[#5C5C5C]">
                        Our AI team is performing due diligence and generating investor-grade insights.
                    </p>

                </div>

                <div className="space-y-4">

                    {agents.map((agent, index) => {
                        const Icon = agent.icon;

                        const completed = index < currentStep;
                        const active = index === currentStep;

                        return (
                            <div
                                key={agent.title}
                                className="flex items-center justify-between bg-[#F9F6EE] border border-[#F2CF7E]/20 rounded-2xl px-5 py-4"
                            >
                                <div className="flex items-center gap-4">

                                    <div className="w-12 h-12 rounded-xl bg-[#FFBF00]/10 flex items-center justify-center">
                                        <Icon className={`w-6 h-6 ${agent.color}`} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-[#1E1E1E]">
                                            {agent.title}
                                        </h3>

                                        <p className="text-sm text-[#5C5C5C]">
                                            Generating insights...
                                        </p>
                                    </div>

                                </div>

                                {completed ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                ) : active ? (
                                    <Loader2 className="w-6 h-6 text-[#FF7900] animate-spin" />
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-[#F2CF7E]" />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10">

                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#5C5C5C]">
                            Startup Readiness Evaluation
                        </span>

                        <span className="font-semibold text-[#FF7900]">
                            {Math.min(
                                Math.round((currentStep / agents.length) * 100),
                                100
                            )}
                            %
                        </span>
                    </div>

                    <div className="h-3 rounded-full bg-[#F2CF7E]/20 overflow-hidden">

                        <div
                            className="h-full bg-[#FF7900] transition-all duration-1000"
                            style={{
                                width: `${Math.min(
                                    (currentStep / agents.length) * 100,
                                    100
                                )}%`,
                            }}
                        />

                    </div>

                </div>

                <div className="mt-8 text-center">

                    <p className="text-sm text-[#5C5C5C] italic">
                        "Great startups are built on validated assumptions, not guesses."
                    </p>

                </div>

            </div>
        </div>
    );
};

export default AnalysisLoadingModal;