import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import AboutSection from "./sections/about-section";
import ClientsSection from "./sections/clients-section";
import ContactSection from "./sections/contact-section";
import FaqSection from "./sections/faq-section";
import HeroSection from "./sections/hero-section";
import PortfolioSection from "./sections/portfolio-section";
import ServicesSection from "./sections/services-section";
import TestimonialsSection from "./sections/testimonials-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <FaqSection />
        <TestimonialsSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
