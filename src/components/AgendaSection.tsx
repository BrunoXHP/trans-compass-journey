
import { Calendar, Clock, User, Bell, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AgendaSection = () => {
  const appointments = [
    {
      date: "25 Jun",
      time: "14:30",
      type: "Consulta Endocrinologista",
      status: "próxima",
      icon: User
    },
    {
      date: "28 Jun",
      time: "09:00",
      type: "Exame de Sangue",
      status: "agendado",
      icon: Clock
    },
    {
      date: "02 Jul",
      time: "16:00",
      type: "Consulta Ginecologista",
      status: "agendado",
      icon: User
    }
  ];

  const medications = [
    {
      name: "Estradiol",
      dosage: "2mg",
      schedule: "2x ao dia - 8h e 20h",
      nextDose: "em 3 horas"
    },
    {
      name: "Espironolactona",
      dosage: "100mg",
      schedule: "1x ao dia - 8h",
      nextDose: "amanhã às 8h"
    }
  ];

  return (
    <section id="agenda" className="py-20 bg-gradient-to-br from-trans-blue/10 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent">
              Sua Agenda Personalizada
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organize suas consultas, medicações e exames com lembretes inteligentes para nunca perder um compromisso importante
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Próximos Compromissos */}
            <Card className="border-trans-blue/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-trans-purple">
                  <Calendar className="w-6 h-6" />
                  <span>Próximos Compromissos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-trans-lavender/20 to-trans-pink/10 border border-trans-pink/20"
                  >
                    <div className="text-center min-w-[60px]">
                      <div className="text-lg font-bold text-trans-purple">{appointment.date.split(' ')[0]}</div>
                      <div className="text-sm text-gray-600">{appointment.date.split(' ')[1]}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{appointment.type}</div>
                      <div className="text-sm text-gray-600 flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <appointment.icon className="w-6 h-6 text-trans-blue" />
                  </div>
                ))}
                
                <Button className="w-full bg-gradient-trans text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Compromisso
                </Button>
              </CardContent>
            </Card>

            {/* Medicações */}
            <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-trans-purple">
                  <Bell className="w-6 h-6" />
                  <span>Medicações</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {medications.map((med, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg bg-gradient-to-r from-trans-pink/10 to-trans-lavender/20 border border-trans-pink/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-gray-800">{med.name}</div>
                      <div className="text-sm font-medium text-trans-purple">{med.dosage}</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{med.schedule}</div>
                    <div className="text-xs text-trans-blue font-medium">Próxima dose: {med.nextDose}</div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full border-trans-pink text-trans-purple hover:bg-trans-pink/10">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Medicação
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Características da Agenda */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-trans-blue/20">
              <Bell className="w-12 h-12 text-trans-blue mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Lembretes Inteligentes</h3>
              <p className="text-sm text-gray-600">Nunca esqueça uma medicação ou consulta com notificações personalizadas</p>
            </div>
            
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-trans-pink/20">
              <Calendar className="w-12 h-12 text-trans-pink mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Sincronização</h3>
              <p className="text-sm text-gray-600">Integre-se com seu calendário favorito e acesse de qualquer dispositivo</p>
            </div>
            
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-trans-purple/20">
              <User className="w-12 h-12 text-trans-purple mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Privacidade Total</h3>
              <p className="text-sm text-gray-600">Seus dados de saúde são protegidos com criptografia de ponta a ponta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
