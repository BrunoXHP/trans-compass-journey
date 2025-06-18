
-- Tabela para agendamentos/consultas
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  appointment_type TEXT NOT NULL, -- 'consulta', 'exame', 'procedimento'
  status TEXT NOT NULL DEFAULT 'agendado', -- 'agendado', 'confirmado', 'cancelado', 'concluido'
  doctor_name TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabela para medicações
CREATE TABLE public.medications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL, -- '1x ao dia', '2x ao dia', etc
  schedule_times TEXT[], -- array de horários ['08:00', '20:00']
  start_date DATE NOT NULL,
  end_date DATE,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabela para posts da comunidade
CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- 'discussao', 'pergunta', 'experiencia', 'apoio'
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[],
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabela para comentários dos posts
CREATE TABLE public.post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabela para likes dos posts
CREATE TABLE public.post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Tabela para recursos educacionais
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- 'guia', 'artigo', 'video', 'documento'
  tags TEXT[],
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_published BOOLEAN NOT NULL DEFAULT true,
  views_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabela para eventos
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  is_online BOOLEAN NOT NULL DEFAULT false,
  meeting_link TEXT,
  max_participants INTEGER,
  organizer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL, -- 'workshop', 'palestra', 'grupo-apoio', 'social'
  tags TEXT[],
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabela para inscrições em eventos
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'registered', -- 'registered', 'attended', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para appointments
CREATE POLICY "Usuários podem ver próprios agendamentos" ON public.appointments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem criar próprios agendamentos" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar próprios agendamentos" ON public.appointments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar próprios agendamentos" ON public.appointments FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para medications
CREATE POLICY "Usuários podem ver próprias medicações" ON public.medications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem criar próprias medicações" ON public.medications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar próprias medicações" ON public.medications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar próprias medicações" ON public.medications FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para community_posts
CREATE POLICY "Todos podem ver posts da comunidade" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Usuários autenticados podem criar posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar próprios posts" ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar próprios posts" ON public.community_posts FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para post_comments
CREATE POLICY "Todos podem ver comentários" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Usuários autenticados podem comentar" ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar próprios comentários" ON public.post_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar próprios comentários" ON public.post_comments FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para post_likes
CREATE POLICY "Todos podem ver likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Usuários autenticados podem dar like" ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem remover próprios likes" ON public.post_likes FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para resources
CREATE POLICY "Todos podem ver recursos publicados" ON public.resources FOR SELECT USING (is_published = true);
CREATE POLICY "Autores podem ver próprios recursos" ON public.resources FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Usuários autenticados podem criar recursos" ON public.resources FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Autores podem atualizar próprios recursos" ON public.resources FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Autores podem deletar próprios recursos" ON public.resources FOR DELETE USING (auth.uid() = author_id);

-- Políticas RLS para events
CREATE POLICY "Todos podem ver eventos publicados" ON public.events FOR SELECT USING (is_published = true);
CREATE POLICY "Organizadores podem ver próprios eventos" ON public.events FOR SELECT USING (auth.uid() = organizer_id);
CREATE POLICY "Usuários autenticados podem criar eventos" ON public.events FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Organizadores podem atualizar próprios eventos" ON public.events FOR UPDATE USING (auth.uid() = organizer_id);
CREATE POLICY "Organizadores podem deletar próprios eventos" ON public.events FOR DELETE USING (auth.uid() = organizer_id);

-- Políticas RLS para event_registrations
CREATE POLICY "Usuários podem ver próprias inscrições" ON public.event_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Organizadores podem ver inscrições de seus eventos" ON public.event_registrations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND organizer_id = auth.uid())
);
CREATE POLICY "Usuários autenticados podem se inscrever" ON public.event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar próprias inscrições" ON public.event_registrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem cancelar próprias inscrições" ON public.event_registrations FOR DELETE USING (auth.uid() = user_id);

-- Funções para atualizar contadores
CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts 
    SET comments_count = comments_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers para contadores
CREATE TRIGGER trigger_update_comments_count
  AFTER INSERT OR DELETE ON public.post_comments
  FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();

CREATE TRIGGER trigger_update_likes_count
  AFTER INSERT OR DELETE ON public.post_likes
  FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();
