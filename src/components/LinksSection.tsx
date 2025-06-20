
import { ExternalLink, Heart, Users, BookOpen, Shield, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LinksSection = () => {
  const linkCategories = [
    {
      title: "Organizações LGBT+",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      links: [
        {
          name: "ANTRA - Associação Nacional de Travestis e Transexuais",
          url: "https://antrabrasil.org/",
          description: "Principal organização de defesa dos direitos de pessoas trans no Brasil"
        },
        {
          name: "ABGLT - Associação Brasileira de Lésbicas, Gays, Bissexuais, Travestis e Transexuais",
          url: "https://www.abglt.org/",
          description: "Rede nacional de organizações LGBT+"
        },
        {
          name: "Casa 1",
          url: "https://www.casaum.org/",
          description: "Centro de cultura e acolhimento LGBT+ em São Paulo"
        },
        {
          name: "Grupo Dignidade",
          url: "https://www.grupodignidade.org.br/",
          description: "Organização pelos direitos LGBT+ no Paraná"
        }
      ]
    },
    {
      title: "Saúde e Suporte",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      links: [
        {
          name: "SUS - Processo Transexualizador",
          url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-populacao-lgbti",
          description: "Informações sobre atendimento trans no SUS"
        },
        {
          name: "Centro de Referência LGBT+ São Paulo",
          url: "https://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/lgbt/",
          description: "Atendimento especializado para população LGBT+"
        },
        {
          name: "CVV - Centro de Valorização da Vida",
          url: "https://www.cvv.org.br/",
          description: "Apoio emocional e prevenção do suicídio - 188"
        },
        {
          name: "Mapa da Saúde Trans",
          url: "https://mapadasaudetrans.com.br/",
          description: "Profissionais de saúde que atendem pessoas trans"
        }
      ]
    },
    {
      title: "Direitos e Justiça",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      links: [
        {
          name: "Defensoria Pública do Estado de São Paulo",
          url: "https://www.defensoria.sp.def.br/",
          description: "Assistência jurídica gratuita"
        },
        {
          name: "CNJ - Provimento 73/2018",
          url: "https://atos.cnj.jus.br/atos/detalhar/2623",
          description: "Alteração de nome e gênero em cartório"
        },
        {
          name: "Ministério dos Direitos Humanos",
          url: "https://www.gov.br/mdh/pt-br/navegue-por-temas/lgbt",
          description: "Políticas públicas para população LGBT+"
        },
        {
          name: "OAB - Comissão da Diversidade Sexual",
          url: "https://www.oab.org.br/",
          description: "Suporte jurídico especializado"
        }
      ]
    },
    {
      title: "Educação e Pesquisa",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      links: [
        {
          name: "IBTE - Instituto Brasileiro de Transmasculinidades",
          url: "https://www.ibte.com.br/",
          description: "Pesquisa e advocacy para homens trans"
        },
        {
          name: "TransRevolução",
          url: "https://www.transrevolucao.org/",
          description: "Coletivo de pessoas trans por direitos"
        },
        {
          name: "Prepara Nem",
          url: "https://www.preparanem.com/",
          description: "Cursinho popular para pessoas LGBT+"
        },
        {
          name: "Universidade Federal do Rio Grande do Sul - GÊNERO",
          url: "https://www.ufrgs.br/genero/",
          description: "Núcleo de pesquisa em gênero e sexualidade"
        }
      ]
    }
  ];

  const emergencyContacts = [
    {
      name: "Disque 100",
      description: "Disque Direitos Humanos",
      number: "100"
    },
    {
      name: "Central de Atendimento à Mulher",
      description: "Violência contra a mulher",
      number: "180"
    },
    {
      name: "CVV",
      description: "Apoio emocional 24h",
      number: "188"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-trans-lavender/20 to-trans-pink/10 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <ExternalLink className="w-6 h-6 text-trans-purple mr-2" />
              <span className="text-sm font-medium text-trans-purple bg-trans-purple/10 px-3 py-1 rounded-full">
                Links Úteis
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent">
              Recursos e Links Importantes
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uma curadoria de organizações, serviços e recursos essenciais para a comunidade trans
            </p>
          </div>

          {/* Links Categories */}
          <div className="space-y-12 mb-16">
            {linkCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className={`flex items-center mb-6 ${category.color}`}>
                  <category.icon className="w-6 h-6 mr-3" />
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {category.links.map((link, linkIndex) => (
                    <Card key={linkIndex} className={`${category.borderColor} ${category.bgColor} hover:shadow-lg transition-shadow`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span className={category.color}>{link.name}</span>
                          <ExternalLink className={`w-4 h-4 ${category.color}`} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{link.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${category.color} border-current hover:bg-current hover:text-white transition-colors`}
                          onClick={() => window.open(link.url, '_blank')}
                        >
                          Visitar Site
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Contacts */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Contatos de Emergência</h3>
              <p className="opacity-90">Números importantes para situações de risco ou emergência</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-6 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">{contact.number}</div>
                  <div className="font-semibold mb-1">{contact.name}</div>
                  <div className="text-sm opacity-80">{contact.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-trans rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Conhece algum recurso importante?</h3>
              <p className="text-lg mb-6 opacity-90">
                Ajude nossa comunidade sugerindo organizações, serviços ou recursos que deveriam estar nesta lista
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-trans-purple"
                onClick={() => window.location.href = '/contato'}
              >
                <Heart className="w-5 h-5 mr-2" />
                Sugerir Recurso
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
