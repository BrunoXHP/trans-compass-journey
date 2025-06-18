
import { Button } from '@/components/ui/button';
import { Calendar, Users, User, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartJourney = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleExploreCommunity = () => {
    if (user) {
      navigate('/forum');
    } else {
      navigate('/comunidade');
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-trans-lavender via-white to-trans-pink/20 pt-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative">
        {/* Floating elements for visual appeal */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-trans-pink/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-32 h-32 bg-trans-blue/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="flex items-center justify-center mb-4 animate-scale-in">
            <Sparkles className="w-8 h-8 text-trans-purple mr-2 animate-pulse" />
            <span className="text-sm font-medium text-trans-purple bg-trans-purple/10 px-3 py-1 rounded-full">
              Plataforma 100% Gratuita
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent leading-tight animate-fade-in delay-200">
            Sua jornada, nosso cuidado
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            Uma plataforma segura e acolhedora para pessoas trans navegarem sua terapia hormonal 
            com suporte da comunidade, agenda personalizada e informações confiáveis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in delay-500">
            <Button 
              size="lg" 
              onClick={handleStartJourney}
              className="bg-gradient-trans hover:opacity-90 hover:scale-105 text-white px-8 py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <User className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              {user ? 'Acessar Dashboard' : 'Começar Minha Jornada'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleExploreCommunity}
              className="border-trans-purple text-trans-purple hover:bg-trans-purple/10 hover:scale-105 px-8 py-4 text-lg transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Explorar Comunidade
            </Button>
          </div>

          {/* Features Preview with enhanced animations */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-trans-pink/20 hover:shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in delay-700 group hover:bg-white/80">
              <div className="mb-4 relative">
                <div className="w-16 h-16 bg-trans-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-trans-blue group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Agenda Personalizada</h3>
              <p className="text-gray-600 text-sm">Organize sua medicação, consultas e exames com lembretes inteligentes</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-trans-pink/20 hover:shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in delay-800 group hover:bg-white/80">
              <div className="mb-4 relative">
                <div className="w-16 h-16 bg-trans-purple/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-trans-purple group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Comunidade Acolhedora</h3>
              <p className="text-gray-600 text-sm">Conecte-se com outras pessoas, compartilhe experiências e encontre apoio</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-trans-pink/20 hover:shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in delay-900 group hover:bg-white/80">
              <div className="mb-4 relative">
                <div className="w-16 h-16 bg-trans-pink/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-trans-pink group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Informações Seguras</h3>
              <p className="text-gray-600 text-sm">Acesse conteúdo confiável sobre terapia hormonal e cuidados de saúde</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
