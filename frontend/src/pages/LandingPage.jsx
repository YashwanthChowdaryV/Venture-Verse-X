import HeroSection from '../components/landing/HeroSection';
import TrustedBySection from '../components/landing/TrustedBySection';
import AgentShowcase from '../components/landing/AgentShowcase';
import HowItWorks from '../components/landing/HowItWorks';
import FeaturesSection from '../components/landing/FeaturesSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    return (
        <div className="bg-[#F6F3EA] min-h-screen">
            <HeroSection />
            <AgentShowcase />
            <HowItWorks />
            <FeaturesSection />
            <CTASection />

        </div>
    );
};

export default LandingPage;