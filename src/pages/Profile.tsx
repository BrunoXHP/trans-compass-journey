import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccountDeletionModal from '@/components/feedback/AccountDeletionModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Save, Edit, Trash2, Camera, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface Profile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  pronouns: string | null;
  location: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    bio: '',
    pronouns: '',
    location: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          username: data.username || '',
          bio: data.bio || '',
          pronouns: data.pronouns || '',
          location: data.location || ''
        });
      }
    } catch (error) {
      toast.error('Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    // Validar tamanho do arquivo (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    setUploading(true);

    try {
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      // Upload da imagem
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Obter URL pública da imagem
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Atualizar perfil com nova URL do avatar
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: data.publicUrl,
          updated_at: new Date().toISOString()
        });

      if (updateError) throw updateError;

      toast.success('Foto de perfil atualizada com sucesso!');
      fetchProfile();
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast.error('Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success('Perfil atualizado com sucesso!');
      setEditing(false);
      fetchProfile();
    } catch (error) {
      toast.error('Erro ao atualizar perfil');
    }
  };

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
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-trans bg-clip-text text-transparent mb-2">
              Meu Perfil
            </h1>
            <p className="text-gray-600">Gerencie suas informações pessoais</p>
          </div>

          <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4 relative">
                <div className="relative group">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile?.avatar_url || ''} />
                    <AvatarFallback className="bg-gradient-trans text-white text-2xl">
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white border-trans-purple text-trans-purple hover:bg-trans-purple hover:text-white"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
              <CardTitle className="text-trans-purple">
                {profile?.full_name || user?.email}
              </CardTitle>
              <div className="flex justify-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditing(!editing)}
                  className="border-trans-purple text-trans-purple hover:bg-trans-purple hover:text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editing ? 'Cancelar' : 'Editar Perfil'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {editing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nome Completo</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de Usuário</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="@seuusername"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pronouns">Pronomes</Label>
                    <Input
                      id="pronouns"
                      value={formData.pronouns}
                      onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
                      placeholder="ela/dela, ele/dele, elu/delu, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Sua cidade ou região"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Conte um pouco sobre você..."
                      className="min-h-24"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-trans text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  {profile?.username && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Username</Label>
                      <p className="text-gray-600">@{profile.username}</p>
                    </div>
                  )}

                  {profile?.pronouns && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Pronomes</Label>
                      <p className="text-gray-600">{profile.pronouns}</p>
                    </div>
                  )}

                  {profile?.location && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Localização</Label>
                      <p className="text-gray-600">{profile.location}</p>
                    </div>
                  )}

                  {profile?.bio && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Biografia</Label>
                      <p className="text-gray-600 whitespace-pre-line">{profile.bio}</p>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>

                  {(!profile?.full_name && !profile?.username && !profile?.bio && !profile?.pronouns && !profile?.location) && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        Seu perfil ainda não foi preenchido.
                      </p>
                      <p className="text-gray-500">
                        Clique em "Editar Perfil" para adicionar suas informações.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Zona de Perigo */}
          <Card className="mt-6 border-red-200 bg-red-50/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center space-x-2">
                <Trash2 className="w-5 h-5" />
                <span>Zona de Perigo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">Excluir Conta</h3>
                  <p className="text-sm text-red-700 mb-4">
                    Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Minha Conta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />

      <AccountDeletionModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default Profile;
