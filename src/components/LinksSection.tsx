
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code, Heart, ArrowRight, Sparkles, LinkIcon } from 'lucide-react';

const LinksSection = () => {
  const links = [
    {
      title: "Código no GitHub",
      description: "Acesse o código-fonte completo do projeto, contribua com melhorias e acompanhe as atualizações.",
      icon: Github,
      href: "https://github.com/transcare/website",
      buttonText: "Ver no GitHub",
      color: "bg-gray-900 hover:bg-gray-800",
      iconColor: "text-white",
      delay: "delay-200"
    },
    {
      title: "Documentação",
      description: "Guias completos sobre como usar a plataforma, APIs disponíveis e recursos para desenvolvedores.",
      icon: Code,
      href: "https://docs.transcare.com",
      buttonText: "Acessar Docs",
      color: "bg-trans-blue hover:bg-trans-blue/80",
      iconColor: "text-white",
      delay: "delay-300"
    },
    {
      title: "Como Contribuir",
      description: "Saiba como você pode ajudar a melhorar nosso site e apoiar a comunidade trans brasileira.",
      icon: Heart,
      href: "#contribuir",
      buttonText: "Contribuir",
      color: "bg-trans-pink hover:bg-trans-pink/80",
      iconColor: "text-white",
      delay: "delay-400"
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
              <LinkIcon className="w-6 h-6 text-trans-purple mr-2 animate-pulse" />
              <span className="text-sm font-medium text-trans-purple bg-trans-purple/10 px-3 py-1 rounded-full">
                Open Source & Gratuito
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent leading-tight">
              Links Úteis
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Acesse nosso código-fonte, documentação e descubra como contribuir para o projeto
            </p>
          </div>

          {/* Link Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {links.map((link, index) => (
              <div 
                key={index} 
                className={`bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-trans-pink/20 hover:shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in ${link.delay} text-center group hover:bg-white/80`}
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 ${link.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <link.icon className={`w-8 h-8 ${link.iconColor} group-hover:rotate-12 transition-transform duration-300`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {link.description}
                  </p>
                </div>
                
                <Button 
                  size="lg" 
                  className={`${link.color} text-white px-6 py-3 w-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group/btn`}
                  onClick={() => window.open(link.href, '_blank')}
                >
                  {link.buttonText}
                  <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            ))}
          </div>

          {/* Developer Section */}
          <div className="bg-gradient-to-r from-trans-blue/10 to-trans-purple/10 rounded-2xl p-8 mb-16 border border-white/20 hover:shadow-lg transition-all duration-300 animate-fade-in delay-500">
            <div className="text-center">
              <div className="w-16 h-16 bg-trans-purple/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-trans-purple" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Para Desenvolvedores
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                O TransCare é um projeto open-source construído com React, TypeScript e CSS. 
                Convidamos desenvolvedores a contribuir com melhorias, correções e novas funcionalidades.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-trans-purple text-trans-purple hover:bg-trans-purple/10 hover:scale-105 transition-all duration-300 group"
                  onClick={() => window.open('https://github.com/transcare/website/issues', '_blank')}
                >
                  <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Ver Issues
                </Button>
                <Button 
                  size="lg" 
                  className="bg-gradient-trans hover:opacity-90 hover:scale-105 text-white transition-all duration-300 shadow-md hover:shadow-lg group"
                  onClick={() => window.open('https://github.com/transcare/website/pulls', '_blank')}
                >
                  <Code className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Pull Requests
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div className="text-center animate-fade-in delay-600">
            <div className="w-16 h-16 bg-gradient-trans rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Feito com ❤️ pela comunidade trans
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Este projeto é desenvolvido por e para a comunidade trans, priorizando sempre 
              a segurança, inclusão e bem-estar de todas as pessoas.
            </p>
            
            <Button 
              size="lg" 
              className="bg-gradient-trans hover:opacity-90 hover:scale-105 text-white px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl group"
              onClick={() => window.location.href = '/comunidade'}
            >
              <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Conhecer a Comunidade
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
