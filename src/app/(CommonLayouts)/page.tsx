import HeroSection from "@/components/modules/Home/heroSection";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import WhySkillBridge from './../../components/modules/Home/WhySkillBridge';
import TestimonialsSlider from "@/components/modules/Home/Testimonials";
import TopRatedTutors from "@/components/modules/Home/TopRatedTutor";

export default function Home() {
  return (
    <div >
        <HeroSection/>
        <TopRatedTutors/>
        <HowItWorks/>
        <WhySkillBridge/>
        <TestimonialsSlider/>
    </div>
  );
}
