
import { MessageCircle, Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Conta e Perfil",
      questions: [
        {
          question: "Como faço para redefinir minha senha?",
          answer: "Vá para a página de login e clique em 'Esqueci minha senha'. Você receberá um e-mail com instruções para redefinir sua senha. Se não receber o e-mail, verifique sua pasta de spam."
        },
        {
          question: "Posso usar um nome social na plataforma?",
          answer: "Sim! Você pode usar seu nome social em todos os lugares da plataforma. Respeitamos sua identidade e garantimos que você seja tratado(a) pelo nome que escolher."
        },
        {
          question: "Como altero as informações do meu perfil?",
          answer: "Acesse a página do seu perfil clicando no seu avatar no menu superior. Lá você pode editar todas as suas informações pessoais, incluindo nome social, bio e foto de perfil."
        }
      ]
    },
    {
      title: "Segurança e Privacidade",
      questions: [
        {
          question: "Meus dados médicos são seguros?",
          answer: "Sim. Todos os dados são criptografados e armazenados de forma segura. Nunca compartilhamos informações médicas com terceiros. Sua privacidade é nossa prioridade máxima."
        },
        {
          question: "Como denuncio um comportamento inadequado?",
          answer: "Use o botão 'Denunciar' presente em todos os posts e perfis, ou acesse nossa página de denúncias. Todas as denúncias são tratadas com confidencialidade e seriedade."
        },
        {
          question: "Quem pode ver minhas informações?",
          answer: "Apenas você tem acesso às suas informações médicas. Informações do perfil público são visíveis para outros usuários, mas você pode ajustar suas configurações de privacidade a qualquer momento."
        }
      ]
    },
    {
      title: "Terapia Hormonal",
      questions: [
        {
          question: "Como acompanho minha terapia hormonal na plataforma?",
          answer: "Use a seção 'Medicações' para registrar seus hormônios, dosagens e horários. Você também pode agendar lembretes e acompanhar seu progresso através de gráficos."
        },
        {
          question: "Posso compartilhar meus dados com meu médico?",
          answer: "Sim! Você pode gerar relatórios dos seus dados de medicação e progresso para compartilhar com sua equipe médica."
        },
        {
          question: "A plataforma substitui o acompanhamento médico?",
          answer: "Não. Nossa plataforma é uma ferramenta de apoio para organizar e acompanhar sua jornada. O acompanhamento médico profissional continua sendo essencial."
        }
      ]
    },
    {
      title: "Comunidade",
      questions: [
        {
          question: "Como participo da comunidade?",
          answer: "Acesse a seção 'Fórum' para interagir com outros membros, fazer perguntas, compartilhar experiências e encontrar apoio na comunidade."
        },
        {
          question: "Existem regras de convivência?",
          answer: "Sim. Temos diretrizes claras de convivência que promovem respeito, inclusão e segurança para todos. Comportamentos discriminatórios não são tolerados."
        },
        {
          question: "Como encontro eventos próximos a mim?",
          answer: "Na seção 'Eventos' você pode filtrar por localização para encontrar encontros, grupos de apoio e atividades em sua região."
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap((category, categoryIndex) => 
    category.questions.map((q, qIndex) => ({
      ...q,
      categoryTitle: category.title,
      globalIndex: categoryIndex * 100 + qIndex
    }))
  );

  const filteredQuestions = searchTerm 
    ? allQuestions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <section className="py-20 bg-gradient-to-br from-trans-lavender/20 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="w-6 h-6 text-trans-purple mr-2" />
              <span className="text-sm font-medium text-trans-purple bg-trans-purple/10 px-3 py-1 rounded-full">
                Central de Ajuda
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre nossa plataforma
            </p>
          </div>

          {/* Search */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar perguntas..."
                className="pl-10 border-trans-pink/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Resultados da busca ({filteredQuestions.length})
              </h3>
              {filteredQuestions.length > 0 ? (
                <div className="space-y-4">
                  {filteredQuestions.map((item) => (
                    <Card key={item.globalIndex} className="border-trans-blue/20">
                      <CardContent className="p-6">
                        <div className="text-xs text-trans-purple mb-2">{item.categoryTitle}</div>
                        <h4 className="font-semibold text-gray-800 mb-2">{item.question}</h4>
                        <p className="text-gray-600">{item.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-trans-pink/20">
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600">Nenhuma pergunta encontrada para "{searchTerm}"</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* FAQ Categories */}
          {!searchTerm && (
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-trans-purple">
                      <MessageCircle className="w-6 h-6" />
                      <span>{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.questions.map((item, questionIndex) => {
                      const globalIndex = categoryIndex * 100 + questionIndex;
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div key={questionIndex} className="border-b border-trans-blue/20 pb-4 last:border-b-0">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full text-left flex items-center justify-between py-2 hover:text-trans-purple transition-colors"
                          >
                            <h4 className="font-medium text-gray-800">{item.question}</h4>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-trans-purple" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-trans-purple" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="mt-2 pl-4 border-l-2 border-trans-pink/30">
                              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-trans rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Não encontrou sua resposta?</h3>
            <p className="text-lg mb-6 opacity-90">
              Nossa equipe de suporte está sempre pronta para ajudar você
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-trans-purple"
              onClick={() => window.location.href = '/contato'}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Entrar em Contato
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
