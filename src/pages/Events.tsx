
import Header from '@/components/Header';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';

const Events = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
