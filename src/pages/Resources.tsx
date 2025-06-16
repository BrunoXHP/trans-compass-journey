
import Header from '@/components/Header';
import ResourcesSection from '@/components/ResourcesSection';
import Footer from '@/components/Footer';

const Resources = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
