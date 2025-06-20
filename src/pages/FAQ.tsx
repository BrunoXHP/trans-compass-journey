
import Header from '@/components/Header';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
