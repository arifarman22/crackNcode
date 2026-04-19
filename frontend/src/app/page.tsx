import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import SubBrands from "@/components/sections/SubBrands";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <FeaturedProducts />
      <SubBrands />
      <Testimonials />
      <CTASection />
    </>
  );
}
