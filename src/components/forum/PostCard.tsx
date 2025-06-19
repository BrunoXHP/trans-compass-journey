
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Clock, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useDeleteActions } from '@/hooks/useDeleteActions';
import { format } from 'date-fns';
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
  user_profile?: {
    full_name: string | null;
    username: string | null;
  } | null;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete?: () => void;
}

const PostCard = ({ post, onLike, onDelete }: PostCardProps) => {
  const { user } = useAuth();
  const { deletePost } = useDeleteActions();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;
    
    setDeleting(true);
    const success = await deletePost(post.id);
    if (success && onDelete) {
      onDelete();
    }
    setDeleting(false);
  };

  const authorName = post.is_anonymous 
    ? 'Usuário Anônimo' 
    : post.user_profile?.full_name || post.user_profile?.username || 'Usuário';

  const canDelete = user && user.id === post.user_id;

  return (
    <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3 flex-1">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-trans text-white text-sm">
                {post.is_anonymous ? 'A' : authorName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-gray-800">{authorName}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-trans-pink/20 text-trans-purple">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{format(new Date(post.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</span>
                </span>
              </div>
            </div>
          </div>
          
          {canDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-600 hover:text-red-800 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 whitespace-pre-line">{post.content}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-trans-lavender/20 text-trans-purple rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className="flex items-center space-x-1 hover:text-red-500"
          >
            <Heart className="w-4 h-4" />
            <span>{post.likes_count}</span>
          </Button>
          <span className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments_count}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
