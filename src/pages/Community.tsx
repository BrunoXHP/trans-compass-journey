
import Header from '@/components/Header';
import CommunitySection from '@/components/CommunitySection';
import Footer from '@/components/Footer';

const Community = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Community;
