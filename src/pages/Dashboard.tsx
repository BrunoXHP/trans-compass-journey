
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Pill, Users, BookOpen, Calendar as CalendarIcon, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: 'Agendamentos',
      description: 'Gerencie suas consultas e exames',
      href: '/agendamentos',
      color: 'bg-blue-500'
    },
    {
      icon: Pill,
      title: 'Medicações',
      description: 'Controle seus medicamentos e horários',
      href: '/medicacoes',
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Conecte-se com outras pessoas',
      href: '/comunidade',
      color: 'bg-purple-500'
    },
    {
      icon: BookOpen,
      title: 'Recursos',
      description: 'Acesse guias e materiais educativos',
      href: '/recursos',
      color: 'bg-orange-500'
    },
    {
      icon: CalendarIcon,
      title: 'Eventos',
      description: 'Participe de workshops e grupos',
      href: '/eventos',
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-trans-lavender/20 to-trans-pink/10">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-trans rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-trans bg-clip-text text-transparent">
                  Bem-vindo, {user?.user_metadata?.full_name || 'Usuário'}!
                </h1>
                <p className="text-gray-600">
                  Aqui você pode acessar todas as funcionalidades da plataforma TransCare
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.href}
                  className="border-trans-pink/20 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => navigate(feature.href)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-trans-purple">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <Button className="w-full bg-gradient-trans text-white">
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-trans-purple">Próximos Agendamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Você não tem agendamentos próximos.</p>
                <Button
                  variant="outline"
                  onClick={() => navigate('/agendamentos')}
                  className="border-trans-purple text-trans-purple hover:bg-trans-purple hover:text-white"
                >
                  Agendar Consulta
                </Button>
              </CardContent>
            </Card>

            <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-trans-purple">Lembretes de Medicação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Nenhum lembrete para hoje.</p>
                <Button
                  variant="outline"
                  onClick={() => navigate('/medicacoes')}
                  className="border-trans-purple text-trans-purple hover:bg-trans-purple hover:text-white"
                >
                  Gerenciar Medicações
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
