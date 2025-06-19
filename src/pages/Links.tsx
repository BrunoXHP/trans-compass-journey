
import Header from '@/components/Header';
import LinksSection from '@/components/LinksSection';
import Footer from '@/components/Footer';

const Links = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <LinksSection />
      </main>
      <Footer />
    </div>
  );
};

export default Links;
