
import { Button } from '@/components/ui/button';
import { Calendar, Users, User } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-trans-lavender via-white to-trans-pink/20 pt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent leading-tight">
            Sua jornada, nosso cuidado
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Uma plataforma segura e acolhedora para pessoas trans navegarem sua terapia hormonal 
            com suporte da comunidade, agenda personalizada e informações confiáveis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-trans hover:opacity-90 text-white px-8 py-4 text-lg animate-scale-in"
            >
              <User className="w-5 h-5 mr-2" />
              Começar Minha Jornada
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-trans-purple text-trans-purple hover:bg-trans-purple/10 px-8 py-4 text-lg animate-scale-in"
            >
              <Users className="w-5 h-5 mr-2" />
              Explorar Comunidade
            </Button>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-trans-pink/20 hover:shadow-lg transition-all duration-300 animate-fade-in">
              <Calendar className="w-12 h-12 text-trans-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Agenda Personalizada</h3>
              <p className="text-gray-600 text-sm">Organize sua medicação, consultas e exames com lembretes inteligentes</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-trans-pink/20 hover:shadow-lg transition-all duration-300 animate-fade-in">
              <Users className="w-12 h-12 text-trans-purple mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Comunidade Acolhedora</h3>
              <p className="text-gray-600 text-sm">Conecte-se com outras pessoas, compartilhe experiências e encontre apoio</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-trans-pink/20 hover:shadow-lg transition-all duration-300 animate-fade-in">
              <User className="w-12 h-12 text-trans-pink mx-auto mb-4" />
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
