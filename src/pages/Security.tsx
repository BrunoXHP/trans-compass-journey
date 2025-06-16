
import Header from '@/components/Header';
import SecuritySection from '@/components/SecuritySection';
import Footer from '@/components/Footer';

const Security = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <SecuritySection />
      </main>
      <Footer />
    </div>
  );
};

export default Security;
