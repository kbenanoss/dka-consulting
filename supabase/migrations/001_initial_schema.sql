-- ============================================
-- DKA-Consulting Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS table
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client', 'agent')),
  status TEXT NOT NULL DEFAULT 'actif' CHECK (status IN ('actif', 'inactif')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- DOSSIERS table
-- ============================================
CREATE TABLE IF NOT EXISTS public.dossiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference TEXT NOT NULL UNIQUE,
  client TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'en_attente' CHECK (status IN ('en_cours', 'termine', 'en_attente')),
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- ACTIVITIES table
-- ============================================
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for now (tighten when you add auth)
CREATE POLICY "Allow all on users" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on dossiers" ON public.dossiers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on activities" ON public.activities FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Auto-update updated_at on dossiers
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER dossiers_updated_at
  BEFORE UPDATE ON public.dossiers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- Seed data (optional — matches your current mock data)
-- ============================================
INSERT INTO public.users (nom, email, telephone, role, status) VALUES
  ('Admin DKA', 'admin@dka-consulting.tg', '+228 90 00 00 00', 'admin', 'actif'),
  ('Kofi Mensah', 'kofi.mensah@email.com', '+228 90 12 34 56', 'client', 'actif'),
  ('Ama Dosseh', 'ama.dosseh@email.com', '+228 91 23 45 67', 'client', 'actif'),
  ('Yao Agbeko', 'yao.agbeko@email.com', '+228 92 34 56 78', 'client', 'inactif'),
  ('Ablavi Teko', 'ablavi.teko@email.com', '+228 93 45 67 89', 'agent', 'actif')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.dossiers (reference, client, type, status, description) VALUES
  ('DKA-2025-001', 'Kofi Mensah', 'Création TF', 'en_cours', 'Création de titre foncier pour terrain à Adidogomé'),
  ('DKA-2025-002', 'Ama Dosseh', 'Mutation', 'termine', 'Mutation de titre foncier suite à vente'),
  ('DKA-2025-003', 'Yao Agbeko', 'Morcellement', 'en_attente', 'Morcellement de terrain en 4 lots'),
  ('DKA-2025-004', 'Ablavi Teko', 'Conseil Juridique', 'en_cours', 'Conseil pour litige foncier'),
  ('DKA-2025-005', 'Kossi Amouzou', 'Création TF', 'termine', 'Création de titre foncier pour terrain à Baguida')
ON CONFLICT (reference) DO NOTHING;

INSERT INTO public.activities (user_name, action, target) VALUES
  ('Admin DKA', 'a créé un nouveau dossier', 'DKA-2025-001'),
  ('Admin DKA', 'a mis à jour le statut de', 'DKA-2025-002'),
  ('Admin DKA', 'a ajouté un document à', 'DKA-2025-003'),
  ('Admin DKA', 'a créé un utilisateur', 'Kofi Mensah');
