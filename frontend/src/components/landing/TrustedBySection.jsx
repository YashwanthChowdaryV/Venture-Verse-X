import React from 'react';

const TrustedBySection = () => {
    return (
        <section className="py-16 bg-[#FCFAF5] border-y border-[#F2CF7E]/20">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <p className="text-sm uppercase tracking-widest text-[#5C5C5C] mb-10">
                    Built For
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="font-semibold text-[#1E1E1E]">
                        Founders
                    </div>

                    <div className="font-semibold text-[#1E1E1E]">
                        Angel Investors
                    </div>

                    <div className="font-semibold text-[#1E1E1E]">
                        Accelerators
                    </div>

                    <div className="font-semibold text-[#1E1E1E]">
                        Incubators
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TrustedBySection;