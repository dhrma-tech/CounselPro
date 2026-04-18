import Hero from '@/components/landing/Hero';
import TrustBar from '@/components/landing/TrustBar';
import HowItWorks from '@/components/landing/HowItWorks';
import CounsellingTypes from '@/components/landing/CounsellingTypes';
import WhyCounselPro from '@/components/landing/WhyCounselPro';
import ResourcePreview from '@/components/landing/ResourcePreview';
import Testimonials from '@/components/landing/Testimonials';
import FAQStrip from '@/components/landing/FAQStrip';
import FinalCTA from '@/components/landing/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <CounsellingTypes />
      <WhyCounselPro />
      <ResourcePreview />
      <Testimonials />
      <FAQStrip />
      <FinalCTA />
    </>
  );
}
