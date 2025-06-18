
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Clock } from 'lucide-react';
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
  user_profile?: {
    full_name: string | null;
    username: string | null;
  } | null;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  return (
    <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
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
                  : post.user_profile?.full_name || post.user_profile?.username || 'Usuário'
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
            onClick={() => onLike(post.id)}
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
  );
};

export default PostCard;
