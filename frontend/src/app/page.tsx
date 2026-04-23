import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import ServicesOverview from "@/components/sections/ServicesOverview";
import HowItWorks from "@/components/sections/HowItWorks";
import StatsSection from "@/components/sections/StatsSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import SubBrands from "@/components/sections/SubBrands";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Newsletter from "@/components/sections/Newsletter";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesOverview />
      <HowItWorks />
      <StatsSection />
      <FeaturedProducts />
      <SubBrands />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <CTASection />
    </>
  );
}
