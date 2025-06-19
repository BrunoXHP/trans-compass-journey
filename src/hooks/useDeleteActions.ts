
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useDeleteActions = () => {
  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      toast.success('Post excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      toast.error('Erro ao excluir post');
      return false;
    }
  };

  const deleteAppointment = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId);

      if (error) throw error;
      toast.success('Agendamento excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      toast.error('Erro ao excluir agendamento');
      return false;
    }
  };

  const deleteMedication = async (medicationId: string) => {
    try {
      const { error } = await supabase
        .from('medications')
        .delete()
        .eq('id', medicationId);

      if (error) throw error;
      toast.success('Medicação excluída com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir medicação:', error);
      toast.error('Erro ao excluir medicação');
      return false;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      // Primeiro excluir registros do evento
      await supabase
        .from('event_registrations')
        .delete()
        .eq('event_id', eventId);

      // Depois excluir o evento
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      toast.success('Evento excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      toast.error('Erro ao excluir evento');
      return false;
    }
  };

  return {
    deletePost,
    deleteAppointment,
    deleteMedication,
    deleteEvent
  };
};
