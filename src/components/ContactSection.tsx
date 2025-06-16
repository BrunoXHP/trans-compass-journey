
import { Mail, MessageCircle, Phone, AlertTriangle, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  const contactOptions = [
    {
      icon: Mail,
      title: "E-mail de Suporte",
      description: "Para dúvidas gerais e suporte técnico",
      contact: "suporte@transcuidado.com.br",
      responseTime: "Resposta em até 24h",
      color: "bg-trans-blue/20 border-trans-blue/30"
    },
    {
      icon: MessageCircle,
      title: "Chat da Comunidade",
      description: "Tire dúvidas com outros membros",
      contact: "Acesse o fórum",
      responseTime: "Resposta imediata",
      color: "bg-trans-pink/20 border-trans-pink/30"
    },
    {
      icon: Phone,
      title: "WhatsApp de Emergência",
      description: "Para situações urgentes relacionadas à segurança",
      contact: "+55 (11) 9999-9999",
      responseTime: "24/7",
      color: "bg-trans-purple/20 border-trans-purple/30"
    }
  ];

  const faqItems = [
    {
      question: "Como faço para redefinir minha senha?",
      answer: "Vá para a página de login e clique em 'Esqueci minha senha'. Você receberá um e-mail com instruções."
    },
    {
      question: "Posso usar um nome social na plataforma?",
      answer: "Sim! Você pode usar seu nome social em todos os lugares da plataforma. Respeitamos sua identidade."
    },
    {
      question: "Como denuncio um comportamento inadequado?",
      answer: "Use o botão 'Denunciar' presente em todos os posts e perfis, ou entre em contato conosco diretamente."
    },
    {
      question: "Meus dados médicos são seguros?",
      answer: "Sim. Todos os dados são criptografados e nunca compartilhados com terceiros. Sua privacidade é nossa prioridade."
    }
  ];

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-trans-lavender/20 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent">
              Contato e Suporte
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aqui para ajudar! Entre em contato conosco para dúvidas, sugestões ou denúncias
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Options */}
            {contactOptions.map((option, index) => (
              <Card key={index} className={`${option.color} hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-6 text-center">
                  <option.icon className="w-12 h-12 text-trans-purple mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  <div className="text-sm font-medium text-trans-purple mb-2">{option.contact}</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{option.responseTime}</span>
                  </div>
                  <Button size="sm" className="mt-4 bg-gradient-trans text-white">
                    Entrar em Contato
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-trans-purple">
                  <Send className="w-6 h-6" />
                  <span>Envie sua Mensagem</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                    <Input placeholder="Seu nome ou nome social" className="border-trans-pink/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                    <Input type="email" placeholder="seu@email.com" className="border-trans-pink/30" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assunto</label>
                  <Input placeholder="Sobre o que você gostaria de falar?" className="border-trans-pink/30" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                  <Textarea 
                    rows={5} 
                    placeholder="Descreva sua dúvida, sugestão ou preocupação..."
                    className="border-trans-pink/30"
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="privacy" className="mt-1" />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    Concordo com o tratamento dos meus dados conforme nossa 
                    <a href="#" className="text-trans-purple hover:underline ml-1">política de privacidade</a>
                  </label>
                </div>
                
                <Button className="w-full bg-gradient-trans text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>

            {/* FAQ and Report */}
            <div className="space-y-6">
              {/* FAQ */}
              <Card className="border-trans-blue/20 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-trans-purple">
                    <MessageCircle className="w-6 h-6" />
                    <span>Perguntas Frequentes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b border-trans-blue/20 pb-4 last:border-b-0">
                      <h4 className="font-medium text-gray-800 mb-2">{item.question}</h4>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full border-trans-blue text-trans-purple hover:bg-trans-blue/10">
                    Ver Todas as Perguntas
                  </Button>
                </CardContent>
              </Card>

              {/* Report Inappropriate Behavior */}
              <Card className="border-red-200 bg-red-50/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Denunciar Comportamento Inadequado</h3>
                      <p className="text-sm text-gray-600">Sua segurança é nossa prioridade</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Se você presenciou ou sofreu qualquer tipo de assédio, discriminação ou comportamento inadequado, 
                    denuncie imediatamente. Todas as denúncias são tratadas com confidencialidade.
                  </p>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Fazer Denúncia Urgente
                    </Button>
                    <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                      Central de Denúncias
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-16 bg-gradient-trans rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Precisa de Ajuda Imediata?</h3>
            <p className="text-lg mb-6 opacity-90">
              Se você está em uma situação de emergência ou risco, entre em contato conosco imediatamente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-trans-purple">
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp: (11) 9999-9999
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-trans-purple">
                <Mail className="w-5 h-5 mr-2" />
                urgencia@transcuidado.com.br
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
