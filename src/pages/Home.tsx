import Hero from '../sections/Hero';
import Longevity from '../sections/Longevity';
import DiseaseMonitoring from '../sections/DiseaseMonitoring';
import LabTests from '../sections/LabTests';
import Testimonials from '../sections/Testimonials';
import MedicalBoard from '../sections/MedicalBoard';
import Pricing from '../sections/Pricing';

const Home = () => {
  return (
    <main>
      <Hero />
      <Longevity />
      <DiseaseMonitoring />
      <LabTests />
      <Testimonials />
      <MedicalBoard />
      <Pricing />
    </main>
  );
};

export default Home;
