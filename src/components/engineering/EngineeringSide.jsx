import BootSequence from './BootSequence';
import OscilloscopeHero from './OscilloscopeHero';
import Timeline from './Timeline';
import ExperienceSection from './ExperienceSection';
import InteractiveCircuit from './InteractiveCircuit';
import ProjectsSection from './ProjectsSection';
import CertificatesSection from './CertificatesSection';
import ActivitiesSection from './ActivitiesSection';
import LogicGateEgg from './LogicGateEgg';
import ContactFooter from '../shared/ContactFooter';

export default function EngineeringSide({ isActive = true }) {
    return (
        <div className={`engineering-side tech-cursor ${isActive ? 'has-crt-overlay' : ''}`}>
            <BootSequence />
            <OscilloscopeHero />
            <Timeline />
            <ExperienceSection />
            <ProjectsSection />
            <InteractiveCircuit />
            <CertificatesSection />
            <ActivitiesSection />
            <LogicGateEgg />
            <ContactFooter mode="engineering" />
        </div>
    );
}
