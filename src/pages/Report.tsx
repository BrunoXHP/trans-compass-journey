
import Header from '@/components/Header';
import ReportSection from '@/components/ReportSection';
import Footer from '@/components/Footer';

const Report = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ReportSection />
      </main>
      <Footer />
    </div>
  );
};

export default Report;
