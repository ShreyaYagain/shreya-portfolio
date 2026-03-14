import OscilloscopeHero from './OscilloscopeHero';
import ProjectsSection from './ProjectsSection';
import InteractiveCircuit from './InteractiveCircuit';
import Timeline from './Timeline';
import LogicGateEgg from './LogicGateEgg';
import ContactFooter from '../shared/ContactFooter';

export default function EngineeringSide() {
    return (
        <div className="engineering-side">
            <OscilloscopeHero />
            <Timeline />
            <InteractiveCircuit />
            <ProjectsSection />
            <LogicGateEgg />
            <ContactFooter mode="engineering" />
        </div>
    );
}
