import HeroSection from '../components/layout/HeroSection';
import WhatWeDo from '../components/sections/WhatWeDo';
import HowItWorks from '../components/sections/HowItWorks';
import FeaturedLooks from '../components/sections/FeaturedLooks';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CallToAction from '../components/sections/CallToAction';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <WhatWeDo />
      <HowItWorks />
      <FeaturedLooks />
      <TestimonialsSection />
      <CallToAction />
    </div>
  );
}

