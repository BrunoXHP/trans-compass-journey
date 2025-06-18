
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import PostForm from '@/components/forum/PostForm';
import PostCard from '@/components/forum/PostCard';
import EmptyState from '@/components/forum/EmptyState';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';
import { usePostActions } from '@/hooks/usePostActions';

const CommunityForum = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    is_anonymous: false,
    tags: ''
  });

  const { posts, loading, refetch } = useCommunityPosts(selectedCategory);
  const { createPost, handleLike } = usePostActions(refetch);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(formData);
    setShowForm(false);
    setFormData({
      title: '',
      content: '',
      category: '',
      is_anonymous: false,
      tags: ''
    });
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
            <PostForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          )}

          <div className="space-y-6">
            {posts.length === 0 ? (
              <EmptyState />
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                />
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
