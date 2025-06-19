import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useDeleteActions } from '@/hooks/useDeleteActions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Pill, Plus, Clock, Calendar, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  schedule_times: string[];
  start_date: string;
  end_date: string | null;
  notes: string | null;
  is_active: boolean;
}

const Medications = () => {
  const { user } = useAuth();
  const { deleteMedication } = useDeleteActions();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    schedule_times: [''],
    start_date: '',
    end_date: '',
    notes: '',
    is_active: true
  });

  useEffect(() => {
    if (user) {
      fetchMedications();
    }
  }, [user]);

  const fetchMedications = async () => {
    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedications(data || []);
    } catch (error) {
      toast.error('Erro ao carregar medicações');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('medications')
        .insert([
          {
            ...formData,
            user_id: user.id,
            schedule_times: formData.schedule_times.filter(time => time.trim() !== '')
          }
        ]);

      if (error) throw error;

      toast.success('Medicação adicionada com sucesso!');
      setShowForm(false);
      setFormData({
        name: '',
        dosage: '',
        frequency: '',
        schedule_times: [''],
        start_date: '',
        end_date: '',
        notes: '',
        is_active: true
      });
      fetchMedications();
    } catch (error) {
      toast.error('Erro ao adicionar medicação');
    }
  };

  const addTimeSlot = () => {
    setFormData({
      ...formData,
      schedule_times: [...formData.schedule_times, '']
    });
  };

  const updateTimeSlot = (index: number, value: string) => {
    const newTimes = [...formData.schedule_times];
    newTimes[index] = value;
    setFormData({ ...formData, schedule_times: newTimes });
  };

  const removeTimeSlot = (index: number) => {
    const newTimes = formData.schedule_times.filter((_, i) => i !== index);
    setFormData({ ...formData, schedule_times: newTimes });
  };

  const handleDelete = async (medicationId: string) => {
    const success = await deleteMedication(medicationId);
    if (success) {
      fetchMedications();
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
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-trans bg-clip-text text-transparent">
                Minhas Medicações
              </h1>
              <p className="text-gray-600">Controle seus medicamentos e horários</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-trans text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Medicação
            </Button>
          </div>

          {showForm && (
            <Card className="mb-8 border-trans-pink/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-trans-purple">Nova Medicação</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome do Medicamento</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Estradiol 2mg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dosage">Dosagem</Label>
                      <Input
                        id="dosage"
                        value={formData.dosage}
                        onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                        placeholder="Ex: 1 comprimido"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequência</Label>
                    <Select
                      value={formData.frequency}
                      onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1x ao dia">1x ao dia</SelectItem>
                        <SelectItem value="2x ao dia">2x ao dia</SelectItem>
                        <SelectItem value="3x ao dia">3x ao dia</SelectItem>
                        <SelectItem value="4x ao dia">4x ao dia</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="conforme necessário">Conforme necessário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Horários</Label>
                    {formData.schedule_times.map((time, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => updateTimeSlot(index, e.target.value)}
                          className="flex-1"
                        />
                        {formData.schedule_times.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeTimeSlot(index)}
                          >
                            Remover
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTimeSlot}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Horário
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start_date">Data de Início</Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end_date">Data de Fim (opcional)</Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Adicione observações importantes..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Medicação ativa</Label>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-gradient-trans text-white">
                      Salvar Medicação
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

          <div className="grid gap-4">
            {medications.length === 0 ? (
              <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Nenhuma medicação encontrada
                  </h3>
                  <p className="text-gray-500">
                    Clique em "Nova Medicação" para começar
                  </p>
                </CardContent>
              </Card>
            ) : (
              medications.map((medication) => (
                <Card key={medication.id} className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-trans-purple mb-1">
                          {medication.name}
                        </h3>
                        <p className="text-gray-600">{medication.dosage} - {medication.frequency}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          medication.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {medication.is_active ? 'Ativa' : 'Inativa'}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(medication.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {medication.schedule_times && medication.schedule_times.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Horários:</h4>
                        <div className="flex flex-wrap gap-2">
                          {medication.schedule_times.map((time, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 bg-trans-lavender/20 text-trans-purple text-sm rounded-full"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Início: {format(new Date(medication.start_date), 'dd/MM/yyyy')}</span>
                      </div>
                      {medication.end_date && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Fim: {format(new Date(medication.end_date), 'dd/MM/yyyy')}</span>
                        </div>
                      )}
                    </div>

                    {medication.notes && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{medication.notes}</p>
                      </div>
                    )}
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

export default Medications;
