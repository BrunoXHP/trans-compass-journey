
import { AlertTriangle, Shield, Mail, Phone, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

const ReportSection = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    evidence: '',
    contact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.description) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    toast.success('Denúncia enviada com sucesso. Nossa equipe irá analisar em breve.');
    setFormData({ type: '', description: '', evidence: '', contact: '' });
  };

  const reportTypes = [
    { value: 'harassment', label: 'Assédio ou Bullying' },
    { value: 'discrimination', label: 'Discriminação' },
    { value: 'spam', label: 'Spam ou Conteúdo Indesejado' },
    { value: 'inappropriate', label: 'Conteúdo Inapropriado' },
    { value: 'fake', label: 'Perfil Falso' },
    { value: 'other', label: 'Outro' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
              <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                Denúncias
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Denunciar Comportamento Inadequado
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sua segurança é nossa prioridade. Relate qualquer comportamento inadequado para mantermos nossa comunidade segura.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Formulário de Denúncia */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700">
                  <Shield className="w-6 h-6" />
                  <span>Fazer uma Denúncia</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Denúncia *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição do Problema *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descreva detalhadamente o que aconteceu..."
                      className="min-h-24"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="evidence">Evidências (opcional)</Label>
                    <Textarea
                      id="evidence"
                      value={formData.evidence}
                      onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                      placeholder="Links, capturas de tela ou outras evidências..."
                      className="min-h-16"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Seu Contato (opcional)</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="Email ou telefone para contato"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Enviar Denúncia
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Informações de Segurança */}
            <div className="space-y-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">Como Funciona</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">1</div>
                    <p className="text-sm text-gray-600">Você envia a denúncia através do formulário</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">2</div>
                    <p className="text-sm text-gray-600">Nossa equipe analisa o caso em até 24 horas</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">3</div>
                    <p className="text-sm text-gray-600">Tomamos as medidas necessárias para resolver</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">4</div>
                    <p className="text-sm text-gray-600">Você recebe uma resposta sobre as ações tomadas</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700">Contatos de Emergência</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Disque 100</p>
                      <p className="text-sm text-gray-600">Disque Direitos Humanos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">180</p>
                      <p className="text-sm text-gray-600">Central de Atendimento à Mulher</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">transcare@suporte.com</p>
                      <p className="text-sm text-gray-600">Suporte TransCare</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-700">Tipos de Violação</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Assédio, bullying ou intimidação</li>
                    <li>• Discriminação por identidade de gênero</li>
                    <li>• Conteúdo ofensivo ou hate speech</li>
                    <li>• Divulgação de informações pessoais</li>
                    <li>• Perfis falsos ou impersonação</li>
                    <li>• Spam ou conteúdo comercial não autorizado</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Garantias de Segurança */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Sua Segurança é Nossa Prioridade</h3>
            <p className="text-lg mb-6 opacity-90">
              Todas as denúncias são tratadas com total confidencialidade e seriedade. 
              Temos tolerância zero com comportamentos que prejudiquem nossa comunidade.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Confidencial</p>
                <p className="text-sm opacity-80">Sua identidade é protegida</p>
              </div>
              <div>
                <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Resposta Rápida</p>
                <p className="text-sm opacity-80">Análise em até 24h</p>
              </div>
              <div>
                <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Ação Efetiva</p>
                <p className="text-sm opacity-80">Medidas concretas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportSection;
