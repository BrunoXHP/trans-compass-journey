
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

export const useCommunityPosts = (selectedCategory: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data: postsData, error: postsError } = await query;

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        toast.error('Erro ao carregar posts');
        return;
      }

      if (!postsData) {
        setPosts([]);
        return;
      }

      // Fetch profiles separately for non-anonymous posts
      const userIds = postsData
        .filter(post => !post.is_anonymous)
        .map(post => post.user_id);

      let profilesMap: Record<string, any> = {};

      if (userIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, username')
          .in('id', userIds);

        if (!profilesError && profilesData) {
          profilesMap = profilesData.reduce((acc, profile) => {
            acc[profile.id] = profile;
            return acc;
          }, {} as Record<string, any>);
        }
      }

      // Combine posts with profiles
      const postsWithProfiles = postsData.map(post => ({
        ...post,
        user_profile: post.is_anonymous ? null : profilesMap[post.user_id] || null
      }));

      setPosts(postsWithProfiles);
    } catch (error) {
      console.error('Error in fetchPosts:', error);
      toast.error('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  return { posts, loading, refetch: fetchPosts };
};
