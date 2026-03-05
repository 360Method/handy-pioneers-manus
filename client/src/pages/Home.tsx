import { useEffect } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";

export default function Home() {
  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <HowItWorks />
        <Gallery />
        <Testimonials />
        <FinalCTA />
        <LocationMap />
      </main>
      <Footer />

      {/* Elfsight Floating Google Reviews Badge — bottom-right */}
      <div
        className="elfsight-app-51b0f9c4-0c07-47a9-9bf2-e7f6e7091043"
        data-elfsight-app-lazy
      />
    </div>
  );
}
