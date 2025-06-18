
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface PostFormData {
  title: string;
  content: string;
  category: string;
  is_anonymous: boolean;
  tags: string;
}

interface PostFormProps {
  formData: PostFormData;
  setFormData: (data: PostFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ formData, setFormData, onSubmit, onCancel }) => {
  return (
    <Card className="mb-8 border-trans-pink/20 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-trans-purple">Novo Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
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
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
