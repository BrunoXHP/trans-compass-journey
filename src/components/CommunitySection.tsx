
import { Users, MessageCircle, Heart, Shield, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const CommunitySection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleForumNavigation = () => {
    if (user) {
      navigate('/forum');
    } else {
      navigate('/auth');
    }
  };

  const handleJoinGroup = () => {
    if (user) {
      navigate('/forum');
    } else {
      navigate('/auth');
    }
  };

  const forumPosts = [
    {
      id: 1,
      author: "Maria Silva",
      avatar: "MS",
      title: "Como foi minha primeira consulta com endocrinologista",
      preview: "Queria compartilhar minha experiência para ajudar outras pessoas que estão começando...",
      category: "Experiências",
      time: "2h atrás",
      likes: 12,
      comments: 8
    },
    {
      id: 2,
      author: "João Santos",
      avatar: "JS",
      title: "Dicas para lidar com efeitos colaterais da TH",
      preview: "Depois de 6 meses de TH, aprendi algumas coisas que podem ajudar...",
      category: "Dicas",
      time: "4h atrás",
      likes: 18,
      comments: 15
    },
    {
      id: 3,
      author: "Ana Costa",
      avatar: "AC",
      title: "Grupo de apoio - São Paulo",
      preview: "Estamos organizando encontros mensais para pessoas em TH na região...",
      category: "Grupos Locais",
      time: "1 dia atrás",
      likes: 25,
      comments: 12
    }
  ];

  const communityGroups = [
    {
      name: "TH Feminina - Iniciantes",
      members: 342,
      description: "Grupo para quem está começando a terapia hormonal feminina",
      color: "bg-trans-pink/20 border-trans-pink/30"
    },
    {
      name: "TH Masculina - Experiências",
      members: 198,
      description: "Compartilhe e aprenda sobre TH masculina",
      color: "bg-trans-blue/20 border-trans-blue/30"
    },
    {
      name: "São Paulo - Encontros",
      members: 156,
      description: "Grupo regional para encontros e eventos em SP",
      color: "bg-trans-purple/20 border-trans-purple/30"
    }
  ];

  return (
    <section id="comunidade" className="py-20 bg-gradient-to-br from-trans-lavender/20 to-trans-pink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent">
              Nossa Comunidade
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conecte-se com outras pessoas, compartilhe experiências e encontre o apoio que você precisa em sua jornada
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Forum Posts */}
            <div className="lg:col-span-2">
              <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-trans-purple">
                    <MessageCircle className="w-6 h-6" />
                    <span>Discussões Recentes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {forumPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="p-4 rounded-lg border border-trans-pink/20 bg-gradient-to-r from-white to-trans-lavender/10 hover:shadow-md transition-all duration-200 cursor-pointer"
                      onClick={handleForumNavigation}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-trans text-white text-sm">
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-800">{post.author}</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-trans-pink/20 text-trans-purple">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.time}</span>
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-800 mb-2">{post.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{post.preview}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{post.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{post.comments}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    onClick={handleForumNavigation}
                    className="w-full bg-gradient-trans text-white"
                  >
                    Ver Todas as Discussões
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Community Groups */}
            <div>
              <Card className="border-trans-blue/20 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-trans-purple">
                    <Users className="w-6 h-6" />
                    <span>Grupos da Comunidade</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {communityGroups.map((group, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${group.color} hover:shadow-md transition-all duration-200 cursor-pointer`}
                    >
                      <h3 className="font-semibold text-gray-800 mb-2">{group.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{group.members} membros</span>
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs"
                          onClick={handleJoinGroup}
                        >
                          Participar
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-trans-blue text-trans-purple hover:bg-trans-blue/10"
                    onClick={handleForumNavigation}
                  >
                    Ver Todos os Grupos
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6 border-trans-purple/20 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <Shield className="w-12 h-12 text-trans-purple mx-auto" />
                    <h3 className="font-semibold text-gray-800">Ambiente Seguro</h3>
                    <p className="text-sm text-gray-600">
                      Nossa comunidade é moderada 24/7 para garantir um espaço respeitoso e acolhedor para todas as pessoas.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-trans-purple">1.2k+</div>
                        <div className="text-xs text-gray-600">Membros Ativos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-trans-pink">95%</div>
                        <div className="text-xs text-gray-600">Satisfação</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
