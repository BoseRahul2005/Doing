import Banner from "../components/landingPage/banner";
import LenisScroll from "../components/landingPage/lenis-scroll";
import Navbar from "../components/landingPage/navbar";
import Footer from "../components/landingPage/footer";
import HeroSection from "../sections/landingPage/hero-section";
import WhatWeDoSection from "../sections/landingPage/what-we-do-section";
import OurLatestCreations from "../sections/landingPage/our-latest-creations";
import OurTestimonialSection from "../sections/landingPage/our-testimonials-section";
import FaqSection from "../sections/landingPage/faq-section";
import Newsletter from "../sections/landingPage/newsletter";

const LandingPage = () => {
  return (
    <>
      <LenisScroll />
      <Banner />
      <Navbar />
      <main className="px-4">
        <HeroSection />
        <WhatWeDoSection />
        <OurLatestCreations />
        <OurTestimonialSection />
        <FaqSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
