
import { Mail, MessageCircle, Phone, AlertTriangle, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacy: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      toast({
        title: "Erro",
        description: "Você deve aceitar nossa política de privacidade para continuar.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Mensagem enviada!",
      description: "Recebemos sua mensagem e responderemos em breve.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      privacy: false
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/5511999999999', '_blank');
  };

  const handleEmailContact = () => {
    window.open('mailto:suporte@transcare.com.br', '_blank');
  };

  const contactOptions = [
    {
      icon: Mail,
      title: "E-mail de Suporte",
      description: "Para dúvidas gerais e suporte técnico",
      contact: "suporte@transcare.com.br",
      responseTime: "Resposta em até 24h",
      color: "bg-trans-blue/20 border-trans-blue/30",
      action: handleEmailContact
    },
    {
      icon: MessageCircle,
      title: "Chat da Comunidade",
      description: "Tire dúvidas com outros membros",
      contact: "Acesse o fórum",
      responseTime: "Resposta imediata",
      color: "bg-trans-pink/20 border-trans-pink/30",
      action: () => window.location.href = '/forum'
    },
    {
      icon: Phone,
      title: "WhatsApp de Emergência",
      description: "Para situações urgentes relacionadas à segurança",
      contact: "+55 (11) 9999-9999",
      responseTime: "24/7",
      color: "bg-trans-purple/20 border-trans-purple/30",
      action: handleWhatsAppContact
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
            {contactOptions.map((option, index) => (
              <Card key={index} className={`${option.color} hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-6 text-center">
                  <option.icon className="w-12 h-12 text-trans-purple mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  <div className="text-sm font-medium text-trans-purple mb-2">{option.contact}</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center space-x-1 mb-4">
                    <Clock className="w-3 h-3" />
                    <span>{option.responseTime}</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-gradient-trans text-white"
                    onClick={option.action}
                  >
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
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                      <Input 
                        placeholder="Seu nome ou nome social" 
                        className="border-trans-pink/30"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                      <Input 
                        type="email" 
                        placeholder="seu@email.com" 
                        className="border-trans-pink/30"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assunto</label>
                    <Input 
                      placeholder="Sobre o que você gostaria de falar?" 
                      className="border-trans-pink/30"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                    <Textarea 
                      rows={5} 
                      placeholder="Descreva sua dúvida, sugestão ou preocupação..."
                      className="border-trans-pink/30"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input 
                      type="checkbox" 
                      id="privacy" 
                      className="mt-1"
                      checked={formData.privacy}
                      onChange={(e) => handleInputChange('privacy', e.target.checked)}
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      Concordo com o tratamento dos meus dados conforme nossa 
                      <button 
                        type="button"
                        className="text-trans-purple hover:underline ml-1"
                        onClick={() => window.open('#', '_blank')}
                      >
                        política de privacidade
                      </button>
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-trans text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ and Report */}
            <div className="space-y-6">
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
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-trans-blue text-trans-purple hover:bg-trans-blue/10"
                    onClick={() => window.location.href = '/faq'}
                  >
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
                    <Button 
                      className="w-full bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => window.location.href = '/denunciar'}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Fazer Denúncia Urgente
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => window.location.href = '/denunciar'}
                    >
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
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-trans-purple"
                onClick={handleWhatsAppContact}
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp: (11) 9999-9999
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-trans-purple"
                onClick={() => window.open('mailto:urgencia@transcare.com.br', '_blank')}
              >
                <Mail className="w-5 h-5 mr-2" />
                urgencia@transcare.com.br
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
