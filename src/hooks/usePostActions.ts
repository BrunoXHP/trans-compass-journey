
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePostActions = (refetchPosts: () => void) => {
  const { user } = useAuth();

  const createPost = async (formData: {
    title: string;
    content: string;
    category: string;
    is_anonymous: boolean;
    tags: string;
  }) => {
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
      refetchPosts();
    } catch (error) {
      toast.error('Erro ao criar post');
    }
  };

  const deletePost = async (postId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', user.id); // Garantir que só pode deletar próprios posts

      if (error) throw error;

      toast.success('Post excluído com sucesso!');
      refetchPosts();
      return true;
    } catch (error) {
      toast.error('Erro ao excluir post');
      return false;
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

      refetchPosts();
    } catch (error) {
      toast.error('Erro ao curtir post');
    }
  };

  return { createPost, deletePost, handleLike };
};
