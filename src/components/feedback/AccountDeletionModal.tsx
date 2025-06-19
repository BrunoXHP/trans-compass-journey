
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AccountDeletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountDeletionModal = ({ isOpen, onClose }: AccountDeletionModalProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'feedback' | 'confirm'>('feedback');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: '',
    feedback_text: '',
    suggestions: ''
  });

  const handleFeedbackSubmit = async () => {
    if (!user || !feedback.rating || !feedback.feedback_text) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('user_feedback')
        .insert([
          {
            user_id: user.id,
            feedback_type: 'account_deletion',
            rating: parseInt(feedback.rating),
            feedback_text: feedback.feedback_text,
            suggestions: feedback.suggestions || null
          }
        ]);

      if (error) throw error;

      setStep('confirm');
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      toast.error('Erro ao enviar feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Deletar dados do usuário das tabelas relacionadas
      await Promise.all([
        supabase.from('appointments').delete().eq('user_id', user.id),
        supabase.from('medications').delete().eq('user_id', user.id),
        supabase.from('community_posts').delete().eq('user_id', user.id),
        supabase.from('events').delete().eq('organizer_id', user.id),
        supabase.from('event_registrations').delete().eq('user_id', user.id),
        supabase.from('profiles').delete().eq('id', user.id)
      ]);

      // Deletar conta do usuário
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) throw error;

      toast.success('Conta excluída com sucesso');
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      toast.error('Erro ao excluir conta. Entre em contato com o suporte.');
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setStep('feedback');
    setFeedback({ rating: '', feedback_text: '', suggestions: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <span>Excluir Conta</span>
          </DialogTitle>
        </DialogHeader>

        {step === 'feedback' ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Antes de excluir sua conta, gostaríamos de saber sua opinião para melhorarmos nossos serviços.
            </p>

            <div className="space-y-2">
              <Label htmlFor="rating">Como você avalia nossa plataforma? *</Label>
              <Select value={feedback.rating} onValueChange={(value) => setFeedback({ ...feedback, rating: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma nota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Muito ruim</SelectItem>
                  <SelectItem value="2">2 - Ruim</SelectItem>
                  <SelectItem value="3">3 - Regular</SelectItem>
                  <SelectItem value="4">4 - Bom</SelectItem>
                  <SelectItem value="5">5 - Excelente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback_text">Por que você está excluindo sua conta? *</Label>
              <Textarea
                id="feedback_text"
                value={feedback.feedback_text}
                onChange={(e) => setFeedback({ ...feedback, feedback_text: e.target.value })}
                placeholder="Conte-nos o motivo..."
                className="min-h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="suggestions">Sugestões para melhorias (opcional)</Label>
              <Textarea
                id="suggestions"
                value={feedback.suggestions}
                onChange={(e) => setFeedback({ ...feedback, suggestions: e.target.value })}
                placeholder="Como podemos melhorar?"
                className="min-h-16"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={resetModal} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={handleFeedbackSubmit} 
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {loading ? 'Enviando...' : 'Continuar'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-red-800 font-medium mb-2">
                ⚠️ Esta ação é irreversível!
              </p>
              <p className="text-sm text-red-700">
                Todos os seus dados serão permanentemente excluídos, incluindo:
              </p>
              <ul className="text-sm text-red-700 mt-2 ml-4 list-disc">
                <li>Perfil e informações pessoais</li>
                <li>Posts e comentários</li>
                <li>Agendamentos e medicações</li>
                <li>Eventos criados</li>
              </ul>
            </div>

            <p className="text-sm text-gray-600">
              Tem certeza de que deseja excluir permanentemente sua conta?
            </p>

            <div className="flex space-x-2">
              <Button onClick={resetModal} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={handleAccountDeletion} 
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {loading ? 'Excluindo...' : 'Excluir Conta'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AccountDeletionModal;
