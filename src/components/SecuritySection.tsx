
import { Shield, Lock, Eye, Users, FileText, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Criptografia de Ponta a Ponta",
      description: "Todos os seus dados são criptografados com os mais altos padrões de segurança da indústria."
    },
    {
      icon: Eye,
      title: "Controle de Privacidade",
      description: "Você decide o que compartilhar e com quem. Opções de anonimato em fóruns e grupos."
    },
    {
      icon: Users,
      title: "Moderação 24/7",
      description: "Nossa equipe monitora constantemente para manter um ambiente seguro e respeitoso."
    },
    {
      icon: FileText,
      title: "Transparência Total",
      description: "Política de privacidade clara e acessível. Você sempre sabe como seus dados são usados."
    }
  ];

  const privacyOptions = [
    {
      setting: "Perfil Público",
      description: "Controle quem pode ver seu perfil e informações pessoais",
      status: "Configurável"
    },
    {
      setting: "Histórico de Posts",
      description: "Mantenha suas participações nos fóruns privadas ou públicas",
      status: "Privado por padrão"
    },
    {
      setting: "Agenda Médica",
      description: "Seus compromissos e medicações são sempre privados",
      status: "Sempre privado"
    },
    {
      setting: "Localização",
      description: "Compartilhe sua cidade apenas se desejar participar de grupos locais",
      status: "Opcional"
    }
  ];

  return (
    <section id="seguranca" className="py-20 bg-gradient-to-br from-trans-purple/10 to-trans-lavender/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent">
              Segurança e Privacidade
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sua segurança é nossa prioridade. Protegemos seus dados com tecnologia de ponta e criamos um ambiente acolhedor para toda a comunidade trans
            </p>
          </div>

          {/* Security Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="border-trans-purple/20 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-trans-purple mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Privacy Controls */}
            <Card className="border-trans-blue/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-trans-purple">
                  <Eye className="w-6 h-6" />
                  <span>Controles de Privacidade</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {privacyOptions.map((option, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border border-trans-blue/20 bg-gradient-to-r from-white to-trans-lavender/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{option.setting}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-trans-blue/20 text-trans-purple">
                        {option.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                ))}
                
                <Button className="w-full bg-gradient-trans text-white">
                  Gerenciar Configurações de Privacidade
                </Button>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-trans-purple">
                  <Shield className="w-6 h-6" />
                  <span>Diretrizes da Comunidade</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-trans-pink mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Respeito e Inclusão</h4>
                      <p className="text-sm text-gray-600">Todas as pessoas são bem-vindas, independente de onde estejam em sua jornada.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-trans-blue mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Informações Médicas</h4>
                      <p className="text-sm text-gray-600">Compartilhe experiências, mas lembre-se que cada caso é único. Sempre consulte profissionais.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-trans-purple mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Confidencialidade</h4>
                      <p className="text-sm text-gray-600">O que é compartilhado na comunidade, permanece na comunidade.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-trans-pink/10 to-trans-purple/10 p-4 rounded-lg border border-trans-pink/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-trans-purple" />
                    <h4 className="font-medium text-gray-800">Denunciar Comportamento Inadequado</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Se você presenciar qualquer comportamento que viole nossas diretrizes, denuncie imediatamente.
                  </p>
                  <Button size="sm" variant="outline" className="border-trans-purple text-trans-purple hover:bg-trans-purple/10">
                    Central de Denúncias
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Certifications */}
          <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-trans-purple/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-trans-purple">Certificações e Conformidade</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Atendemos aos mais rigorosos padrões internacionais de proteção de dados e segurança da informação
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="w-16 h-16 bg-gradient-trans rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">LGPD Compliant</h4>
                <p className="text-sm text-gray-600">Totalmente adequado à Lei Geral de Proteção de Dados</p>
              </div>
              
              <div className="p-4">
                <div className="w-16 h-16 bg-gradient-trans rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">SSL/TLS</h4>
                <p className="text-sm text-gray-600">Criptografia de nível bancário em todas as conexões</p>
              </div>
              
              <div className="p-4">
                <div className="w-16 h-16 bg-gradient-trans rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Auditoria Independente</h4>
                <p className="text-sm text-gray-600">Revisões regulares por empresas especializadas em segurança</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
