
import { Button } from '@/components/ui/button';
import { Github, BookOpen, ExternalLink, Code, Heart } from 'lucide-react';

const ResourcesSection = () => {
  const resources = [
    {
      title: "Código no GitHub",
      description: "Acesse o código-fonte completo do projeto, contribua com melhorias e acompanhe as atualizações.",
      icon: Github,
      href: "https://github.com/transcare/website",
      buttonText: "Ver no GitHub",
      color: "bg-gray-900 hover:bg-gray-800",
      iconColor: "text-white"
    },
    {
      title: "Documentação",
      description: "Guias completos sobre como usar a plataforma, APIs disponíveis e recursos para desenvolvedores.",
      icon: BookOpen,
      href: "https://docs.transcare.com",
      buttonText: "Acessar Docs",
      color: "bg-trans-blue hover:bg-trans-blue/80",
      iconColor: "text-white"
    },
    {
      title: "Como Contribuir",
      description: "Saiba como você pode ajudar a melhorar a plataforma e apoiar a comunidade trans.",
      icon: Heart,
      href: "#contribuir",
      buttonText: "Contribuir",
      color: "bg-trans-pink hover:bg-trans-pink/80",
      iconColor: "text-white"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-trans-lavender via-white to-trans-pink/20 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent leading-tight">
              Recursos & Links
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Acesse nosso código-fonte, documentação e descubra como contribuir para o projeto
            </p>
          </div>

          {/* Resource Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {resources.map((resource, index) => (
              <div 
                key={index} 
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-trans-pink/20 hover:shadow-lg transition-all duration-300 animate-fade-in text-center"
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 ${resource.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <resource.icon className={`w-8 h-8 ${resource.iconColor}`} />
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
                  className={`${resource.color} text-white px-6 py-3 w-full`}
                  onClick={() => window.open(resource.href, '_blank')}
                >
                  {resource.buttonText}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>

          {/* Developer Section */}
          <div className="bg-gradient-to-r from-trans-blue/10 to-trans-purple/10 rounded-2xl p-8 mb-16 border border-white/20">
            <div className="text-center">
              <Code className="w-12 h-12 text-trans-purple mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Para Desenvolvedores
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                O TransCare é um projeto open-source construído com React, TypeScript e Tailwind CSS. 
                Convidamos desenvolvedores a contribuir com melhorias, correções e novas funcionalidades.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-trans-purple text-trans-purple hover:bg-trans-purple/10"
                  onClick={() => window.open('https://github.com/transcare/website/issues', '_blank')}
                >
                  <Github className="w-5 h-5 mr-2" />
                  Ver Issues
                </Button>
                <Button 
                  size="lg" 
                  className="bg-gradient-trans hover:opacity-90 text-white"
                  onClick={() => window.open('https://github.com/transcare/website/pulls', '_blank')}
                >
                  <Code className="w-5 h-5 mr-2" />
                  Pull Requests
                </Button>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Feito com ❤️ pela comunidade trans
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Este projeto é desenvolvido por e para a comunidade trans, priorizando sempre 
              a segurança, inclusão e bem-estar de todas as pessoas.
            </p>
            
            <Button 
              size="lg" 
              className="bg-gradient-trans hover:opacity-90 text-white px-8 py-4"
              onClick={() => window.location.href = '/comunidade'}
            >
              <Heart className="w-5 h-5 mr-2" />
              Conhecer a Comunidade
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
