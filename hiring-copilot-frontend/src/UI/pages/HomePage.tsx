import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CareersSection from "../components/CareersSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function HomePage({ scrollTo }: { scrollTo?: string }) {
  
  // Auto-scroll when a route uses ?scrollTo=jobs or ?scrollTo=contact
  useEffect(() => {
    if (!scrollTo) return;

    const element = document.getElementById(scrollTo);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollTo]);

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col text-white">
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Job Offers Section */}
      <div id="jobs"> 
        <CareersSection /> 
      </div>

      {/* Contact Section */}
      <div id="contact"> 
        <ContactSection /> 
      </div>

      <Footer />
    </div>
  );
}