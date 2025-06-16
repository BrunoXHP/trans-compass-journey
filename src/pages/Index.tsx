
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutTHSection from '@/components/AboutTHSection';
import AgendaSection from '@/components/AgendaSection';
import CommunitySection from '@/components/CommunitySection';
import EventsSection from '@/components/EventsSection';
import SecuritySection from '@/components/SecuritySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutTHSection />
        <AgendaSection />
        <CommunitySection />
        <EventsSection />
        <SecuritySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
