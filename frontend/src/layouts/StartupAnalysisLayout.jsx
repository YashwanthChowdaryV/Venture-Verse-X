import { Outlet } from 'react-router-dom';
import ShapeGrid from '../components/ShapeGrid';
import StartupAnalysisNavbar from '../components/StartupAnalysisNavbar';

const StartupAnalysisLayout = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">

            {/* Background Animation */}
            <div className="fixed inset-0 opacity-15 pointer-events-none">
                <ShapeGrid
                    speed={0.5}
                    squareSize={40}
                    direction="diagonal"
                    borderColor="#2F293A"
                    hoverFillColor="#222"
                    shape="square"
                    hoverTrailAmount={0}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <StartupAnalysisNavbar />

                <div className="p-6">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default StartupAnalysisLayout;