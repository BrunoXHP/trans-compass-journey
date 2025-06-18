import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Users, Plus, Heart, MessageCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  is_anonymous: boolean;
  tags: string[] | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string | null;
    username: string | null;
  } | null;
}

const CommunityForum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    is_anonymous: false,
    tags: ''
  });

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          profiles(
            full_name,
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        toast.error('Erro ao carregar posts');
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error in fetchPosts:', error);
      toast.error('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const { error } = await supabase
        .from('community_posts')
        .insert([
          {
            ...formData,
            user_id: user.id,
            tags
          }
        ]);

      if (error) throw error;

      toast.success('Post criado com sucesso!');
      setShowForm(false);
      setFormData({
        title: '',
        content: '',
        category: '',
        is_anonymous: false,
        tags: ''
      });
      fetchPosts();
    } catch (error) {
      toast.error('Erro ao criar post');
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return;

    try {
      // Verifica se já curtiu
      const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // Remove like
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        // Adiciona like
        await supabase
          .from('post_likes')
          .insert([{ post_id: postId, user_id: user.id }]);
      }

      fetchPosts();
    } catch (error) {
      toast.error('Erro ao curtir post');
    }
  };

  const categories = [
    { value: 'all', label: 'Todas as categorias' },
    { value: 'discussao', label: 'Discussão' },
    { value: 'pergunta', label: 'Pergunta' },
    { value: 'experiencia', label: 'Experiência' },
    { value: 'apoio', label: 'Apoio' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-trans-purple"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-trans-lavender/20 to-trans-pink/10">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-trans bg-clip-text text-transparent">
                Fórum da Comunidade
              </h1>
              <p className="text-gray-600">Conecte-se, compartilhe e apoie outros membros</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-trans text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Button>
          </div>

          <div className="mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showForm && (
            <Card className="mb-8 border-trans-pink/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-trans-purple">Novo Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Digite o título do seu post"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discussao">Discussão</SelectItem>
                        <SelectItem value="pergunta">Pergunta</SelectItem>
                        <SelectItem value="experiencia">Experiência</SelectItem>
                        <SelectItem value="apoio">Apoio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Compartilhe seus pensamentos..."
                      className="min-h-32"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="Ex: transição, hormônios, apoio"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_anonymous"
                      checked={formData.is_anonymous}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_anonymous: checked })}
                    />
                    <Label htmlFor="is_anonymous">Postar anonimamente</Label>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-gradient-trans text-white">
                      Publicar Post
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            {posts.length === 0 ? (
              <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Nenhum post encontrado
                  </h3>
                  <p className="text-gray-500">
                    Seja o primeiro a compartilhar algo com a comunidade!
                  </p>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-trans-purple mb-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>
                            Por: {post.is_anonymous 
                              ? 'Anônimo' 
                              : post.profiles?.full_name || post.profiles?.username || 'Usuário'
                            }
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDistanceToNow(new Date(post.created_at), { 
                              addSuffix: true, 
                              locale: ptBR 
                            })}
                          </span>
                        </div>
                      </div>
                      <span className="inline-block px-2 py-1 bg-trans-lavender/20 text-trans-purple text-xs rounded-full capitalize">
                        {post.category}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 whitespace-pre-line">
                      {post.content}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{post.likes_count}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 text-gray-600"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments_count}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityForum;
