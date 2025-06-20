
import { AlertTriangle, Shield, Lock, Phone, Mail, MessageCircle, Send, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ReportSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    evidence: '',
    contact: '',
    anonymous: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.description) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o tipo de denúncia e a descrição.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Denúncia enviada!",
      description: "Sua denúncia foi recebida e será analisada em até 24 horas.",
    });

    // Reset form
    setFormData({
      type: '',
      description: '',
      evidence: '',
      contact: '',
      anonymous: false
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const reportTypes = [
    { value: 'harassment', label: 'Assédio ou Bullying' },
    { value: 'discrimination', label: 'Discriminação' },
    { value: 'spam', label: 'Spam ou Conteúdo Indesejado' },
    { value: 'hate-speech', label: 'Discurso de Ódio' },
    { value: 'inappropriate-content', label: 'Conteúdo Inadequado' },
    { value: 'fake-profile', label: 'Perfil Falso' },
    { value: 'other', label: 'Outro' }
  ];

  const emergencyContacts = [
    {
      title: "Emergência 24h",
      description: "Para situações de risco imediato",
      contact: "+55 (11) 9999-9999",
      icon: Phone,
      action: () => window.open('tel:+5511999999999')
    },
    {
      title: "E-mail Urgente",
      description: "Para denúncias graves",
      contact: "urgencia@transcare.com",
      icon: Mail,
      action: () => window.open('mailto:urgencia@transcare.com')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-white to-trans-lavender/20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-red-500 mr-2" />
              <span className="text-sm font-medium text-red-500 bg-red-100 px-3 py-1 rounded-full">
                Central de Denúncias
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Denunciar Comportamento Inadequado
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sua segurança é nossa prioridade. Denuncie qualquer comportamento inadequado de forma segura e confidencial.
            </p>
          </div>

          {/* Emergency Contacts */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="border-red-200 bg-red-50">
                <CardContent className="p-6 text-center">
                  <contact.icon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">{contact.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{contact.description}</p>
                  <div className="text-sm font-medium text-red-600 mb-4">{contact.contact}</div>
                  <Button 
                    size="sm" 
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={contact.action}
                  >
                    Contatar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Report Form */}
            <Card className="border-red-200 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-6 h-6" />
                  <span>Formulário de Denúncia</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Denúncia</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      required
                    >
                      <option value="">Selecione o tipo</option>
                      {reportTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Ocorrido</label>
                    <Textarea 
                      rows={5} 
                      placeholder="Descreva detalhadamente o que aconteceu, quando e onde..."
                      className="border-red-200"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Evidências (opcional)</label>
                    <Textarea 
                      rows={3} 
                      placeholder="Links, prints, ou outras evidências que possam ajudar na investigação..."
                      className="border-red-200"
                      value={formData.evidence}
                      onChange={(e) => handleInputChange('evidence', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contato para Retorno (opcional)</label>
                    <Input 
                      placeholder="E-mail ou telefone para atualizações sobre sua denúncia"
                      className="border-red-200"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input 
                      type="checkbox" 
                      id="anonymous" 
                      className="mt-1"
                      checked={formData.anonymous}
                      onChange={(e) => handleInputChange('anonymous', e.target.checked)}
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600">
                      Fazer denúncia anônima (não será possível acompanhar o andamento)
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Denúncia
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Information and Process */}
            <div className="space-y-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-700">
                    <Lock className="w-6 h-6" />
                    <span>Confidencialidade Garantida</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-800">100% Confidencial</h4>
                      <p className="text-sm text-gray-600">Suas informações são protegidas e tratadas com total sigilo.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-800">Sem Retaliação</h4>
                      <p className="text-sm text-gray-600">Temos políticas rígidas contra qualquer tipo de retaliação.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-800">Investigação Séria</h4>
                      <p className="text-sm text-gray-600">Todas as denúncias são investigadas por nossa equipe especializada.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-purple-700">
                    <Clock className="w-6 h-6" />
                    <span>Como Funciona o Processo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Recebimento (Imediato)</h4>
                        <p className="text-gray-600">Sua denúncia é recebida e registrada em nosso sistema.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Análise (24-48h)</h4>
                        <p className="text-gray-600">Nossa equipe analisa a denúncia e coleta evidências.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Investigação (3-7 dias)</h4>
                        <p className="text-gray-600">Investigação completa com todas as partes envolvidas.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Resolução</h4>
                        <p className="text-gray-600">Ações apropriadas são tomadas e você é informado do resultado.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Resources */}
          <div className="mt-16 bg-gradient-to-r from-trans-blue/10 to-trans-purple/10 rounded-2xl p-8 border border-white/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Precisa de Apoio Adicional?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Além das denúncias, oferecemos recursos de apoio e orientação para situações difíceis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-trans-purple text-trans-purple hover:bg-trans-purple/10"
                  onClick={() => window.location.href = '/contato'}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar com Suporte
                </Button>
                <Button 
                  className="bg-gradient-trans text-white"
                  onClick={() => window.location.href = '/recursos'}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Ver Recursos de Apoio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportSection;
