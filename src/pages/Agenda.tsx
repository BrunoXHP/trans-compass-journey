
import Header from '@/components/Header';
import AgendaSection from '@/components/AgendaSection';
import Footer from '@/components/Footer';

const Agenda = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <AgendaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Agenda;
