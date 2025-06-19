
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Video, Download, Heart, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';

const ResourcesSection = () => {
  const educationalResources = [
    {
      title: "Guia de Transição",
      description: "Material completo sobre o processo de transição de gênero, incluindo aspectos médicos, psicológicos e legais.",
      icon: BookOpen,
      href: "/guias/transicao",
      buttonText: "Acessar Guia",
      color: "bg-trans-blue hover:bg-trans-blue/80",
      iconColor: "text-white",
      delay: "delay-200"
    },
    {
      title: "Cartilha de Direitos",
      description: "Conheça seus direitos como pessoa trans no Brasil, incluindo documentação, saúde e trabalho.",
      icon: FileText,
      href: "/recursos/direitos",
      buttonText: "Baixar PDF",
      color: "bg-trans-purple hover:bg-trans-purple/80",
      iconColor: "text-white",
      delay: "delay-300"
    },
    {
      title: "Vídeos Educativos",
      description: "Série de vídeos com profissionais da saúde e pessoas trans compartilhando experiências.",
      icon: Video,
      href: "/recursos/videos",
      buttonText: "Assistir",
      color: "bg-trans-pink hover:bg-trans-pink/80",
      iconColor: "text-white",
      delay: "delay-400"
    }
  ];

  const downloadableResources = [
    {
      title: "Lista de Profissionais",
      description: "Médicos, psicólogos e outros profissionais que atendem pessoas trans",
      type: "PDF",
      size: "2.1 MB"
    },
    {
      title: "Modelo de Carta para Trabalho",
      description: "Template para comunicar sua transição no ambiente de trabalho",
      type: "DOCX",
      size: "156 KB"
    },
    {
      title: "Checklist Médico",
      description: "Lista de exames e acompanhamentos médicos importantes",
      type: "PDF",
      size: "890 KB"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-trans-lavender via-white to-trans-pink/20 py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Floating background elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-trans-blue/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-trans-pink/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-trans-purple mr-2 animate-pulse" />
              <span className="text-sm font-medium text-trans-purple bg-trans-purple/10 px-3 py-1 rounded-full">
                Materiais Educativos
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent leading-tight">
              Recursos Educativos
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Guias, materiais e recursos educativos para apoiar sua jornada
            </p>
          </div>

          {/* Educational Resource Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {educationalResources.map((resource, index) => (
              <div 
                key={index} 
                className={`bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-trans-pink/20 hover:shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in ${resource.delay} text-center group hover:bg-white/80`}
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 ${resource.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <resource.icon className={`w-8 h-8 ${resource.iconColor} group-hover:rotate-12 transition-transform duration-300`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {resource.description}
                  </p>
                </div>
                
                <Button 
                  size="lg" 
                  className={`${resource.color} text-white px-6 py-3 w-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group/btn`}
                  onClick={() => window.open(resource.href, '_blank')}
                >
                  {resource.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            ))}
          </div>

          {/* Downloadable Resources Section */}
          <div className="bg-gradient-to-r from-trans-blue/10 to-trans-purple/10 rounded-2xl p-8 mb-16 border border-white/20 hover:shadow-lg transition-all duration-300 animate-fade-in delay-500">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-trans-purple/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                <Download className="w-8 h-8 text-trans-purple" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Downloads Gratuitos
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                Materiais práticos que você pode baixar e usar no seu dia a dia
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {downloadableResources.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/50 rounded-xl p-6 border border-trans-pink/10 hover:bg-white/70 transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-800 group-hover:text-trans-purple transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs bg-trans-purple/10 text-trans-purple px-2 py-1 rounded-full">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.size}</span>
                    <Download className="w-4 h-4 text-trans-purple group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Section */}
          <div className="text-center animate-fade-in delay-600">
            <div className="w-16 h-16 bg-gradient-trans rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Precisa de mais informações?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Nossa equipe está sempre trabalhando para criar novos materiais educativos. 
              Entre em contato se tiver sugestões ou dúvidas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline"
                className="border-trans-purple text-trans-purple hover:bg-trans-purple/10 hover:scale-105 transition-all duration-300 group"
                onClick={() => window.location.href = '/contato'}
              >
                <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Entrar em Contato
              </Button>
              <Button 
                size="lg" 
                className="bg-gradient-trans hover:opacity-90 hover:scale-105 text-white transition-all duration-300 shadow-md hover:shadow-lg group"
                onClick={() => window.location.href = '/links'}
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Ver Links Úteis
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
