
import Header from '@/components/Header';
import AboutTHSection from '@/components/AboutTHSection';
import Footer from '@/components/Footer';

const AboutTH = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <AboutTHSection />
      </main>
      <Footer />
    </div>
  );
};

export default AboutTH;
