
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        {user && (
          <section className="py-16 bg-gradient-to-br from-trans-lavender/10 to-trans-pink/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold text-trans-purple mb-4">
                Bem-vindo de volta, {user.user_metadata?.full_name || 'Usuário'}!
              </h2>
              <p className="text-gray-600 mb-6">
                Acesse seu painel personalizado para gerenciar sua jornada de cuidados.
              </p>
              <Button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-trans text-white"
              >
                Acessar Dashboard
              </Button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
