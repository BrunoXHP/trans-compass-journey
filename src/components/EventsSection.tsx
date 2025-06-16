
import { Calendar, MapPin, Users, Clock, Plus, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EventsSection = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Roda de Conversa: Primeiros Passos na TH",
      date: "28 de Junho",
      time: "19:00",
      location: "Online (Zoom)",
      type: "Conversa",
      participants: 24,
      maxParticipants: 30,
      organizer: "Dr. Ana Ferreira",
      description: "Uma conversa acolhedora para pessoas que estão considerando ou começando a terapia hormonal."
    },
    {
      id: 2,
      title: "Encontro Presencial - São Paulo",
      date: "05 de Julho",
      time: "15:00",
      location: "Centro Cultural SP",
      type: "Presencial",
      participants: 18,
      maxParticipants: 25,
      organizer: "Grupo Trans SP",
      description: "Encontro para networking, troca de experiências e atividades culturais."
    },
    {
      id: 3,
      title: "Live: Nutrição e TH com Nutri Trans",
      date: "12 de Julho",
      time: "20:00",
      location: "Instagram Live",
      type: "Live",
      participants: 156,
      maxParticipants: null,
      organizer: "Nutri Trans Brasil",
      description: "Dicas de alimentação e suplementação durante a terapia hormonal."
    }
  ];

  const pastEvents = [
    {
      title: "Webinar: Direitos na Saúde Trans",
      date: "15 de Junho",
      participants: 89,
      rating: 4.8
    },
    {
      title: "Encontro Virtual - Rio de Janeiro",
      date: "10 de Junho",
      participants: 34,
      rating: 4.9
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Conversa': return 'bg-trans-pink/20 text-trans-purple border-trans-pink/30';
      case 'Presencial': return 'bg-trans-blue/20 text-trans-purple border-trans-blue/30';
      case 'Live': return 'bg-trans-purple/20 text-white border-trans-purple/30';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <section id="eventos" className="py-20 bg-gradient-to-br from-white to-trans-blue/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent">
              Eventos da Comunidade
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Participe de encontros, rodas de conversa, lives educativas e eventos que fortalecem nossa comunidade
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Próximos Eventos */}
            <div className="lg:col-span-2">
              <Card className="border-trans-blue/20 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-trans-purple">
                      <Calendar className="w-6 h-6" />
                      <span>Próximos Eventos</span>
                    </CardTitle>
                    <Button size="sm" className="bg-gradient-trans text-white">
                      <Plus className="w-4 h-4 mr-1" />
                      Criar Evento
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="p-6 rounded-lg border border-trans-pink/20 bg-gradient-to-r from-white to-trans-lavender/10 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-trans-blue" />
                              <span>{event.date} às {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-trans-pink" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-trans-purple" />
                              <span>
                                {event.participants} participantes
                                {event.maxParticipants && ` (${event.maxParticipants} vagas)`}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            Organizado por {event.organizer}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button className="bg-gradient-trans text-white flex-1">
                          Participar do Evento
                        </Button>
                        <Button variant="outline" size="sm" className="border-trans-purple text-trans-purple">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar com eventos passados e estatísticas */}
            <div className="space-y-6">
              {/* Eventos Passados */}
              <Card className="border-trans-purple/20 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-trans-purple">
                    <Clock className="w-6 h-6" />
                    <span>Eventos Recentes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pastEvents.map((event, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-lg bg-gradient-to-r from-trans-lavender/20 to-trans-pink/10 border border-trans-pink/20"
                    >
                      <h4 className="font-medium text-gray-800 mb-1">{event.title}</h4>
                      <div className="text-sm text-gray-600 mb-2">{event.date}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{event.participants} participaram</span>
                        <span className="text-trans-purple font-medium">⭐ {event.rating}</span>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full border-trans-purple text-trans-purple hover:bg-trans-purple/10">
                    Ver Histórico Completo
                  </Button>
                </CardContent>
              </Card>

              {/* Estatísticas */}
              <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <Calendar className="w-12 h-12 text-trans-blue mx-auto" />
                    <h3 className="font-semibold text-gray-800">Seus Eventos</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-trans-purple">8</div>
                        <div className="text-xs text-gray-600">Participados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-trans-pink">3</div>
                        <div className="text-xs text-gray-600">Confirmados</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full border-trans-blue text-trans-purple hover:bg-trans-blue/10">
                      Meu Histórico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-gradient-trans rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Quer organizar um evento?</h3>
            <p className="text-lg mb-6 opacity-90">
              Ajude a fortalecer nossa comunidade criando encontros, rodas de conversa ou ações educativas
            </p>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-trans-purple">
              Criar Meu Evento
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
