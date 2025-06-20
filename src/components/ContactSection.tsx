
import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ContactSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    toast.success('Mensagem enviada com sucesso! Responderemos em breve.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "E-mail",
      value: "contato@transcare.com",
      description: "Resposta em até 24 horas",
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Telefone",
      value: "(11) 9999-9999",
      description: "Seg-Sex: 9h às 18h",
      color: "text-green-600"
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: "São Paulo, SP",
      description: "Atendimento presencial agendado",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Horário",
      value: "24/7 Online",
      description: "Plataforma sempre disponível",
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    {
      icon: HelpCircle,
      title: "Perguntas Frequentes",
      description: "Encontre respostas para dúvidas comuns",
      action: () => navigate('/faq'),
      color: "bg-blue-500"
    },
    {
      icon: Shield,
      title: "Denunciar Comportamento",
      description: "Reporte situações inadequadas",
      action: () => navigate('/denunciar'),
      color: "bg-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-trans-lavender/20 to-trans-pink/10 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-trans-purple mr-2" />
              <span className="text-sm font-medium text-trans-purple bg-trans-purple/10 px-3 py-1 rounded-full">
                Suporte
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estamos aqui para ajudar você em sua jornada. Entre em contato conosco!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow border-trans-pink/20" onClick={action.action}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{action.title}</h3>
                      <p className="text-gray-600 text-sm">{action.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Acessar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-trans-purple">
                  <Mail className="w-6 h-6" />
                  <span>Envie uma Mensagem</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Suporte Técnico</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="partnership">Parcerias</SelectItem>
                        <SelectItem value="medical">Dúvidas Médicas</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Descreva sua dúvida ou mensagem..."
                      className="min-h-32"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-trans text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Mens​agem
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-trans-blue/20 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-trans-blue">Como nos Encontrar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${method.color}`}>
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{method.title}</h4>
                        <p className="text-gray-700">{method.value}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-trans-pink">Nosso Compromisso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-trans-pink mt-2"></div>
                    <p className="text-sm text-gray-600">
                      <strong>Resposta Rápida:</strong> Respondemos todas as mensagens em até 24 horas
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-trans-pink mt-2"></div>
                    <p className="text-sm text-gray-600">
                      <strong>Confidencialidade:</strong> Suas informações são tratadas com total sigilo
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-trans-pink mt-2"></div>
                    <p className="text-sm text-gray-600">
                      <strong>Acolhimento:</strong> Nossa equipe é especializada em questões trans
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-trans-pink mt-2"></div>
                    <p className="text-sm text-gray-600">
                      <strong>Suporte Gratuito:</strong> Todos os nossos serviços são oferecidos sem custo
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-trans rounded-2xl p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-3">Emergência?</h3>
                <p className="mb-4 opacity-90">
                  Para situações de emergência, utilize nossos canais prioritários
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Disque 100</strong> - Direitos Humanos</p>
                  <p><strong>CVV 188</strong> - Apoio Emocional 24h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
