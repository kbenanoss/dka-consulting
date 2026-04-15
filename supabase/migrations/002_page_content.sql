-- ============================================
-- PAGE CONTENT table (CMS)
-- Run this in your Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS public.page_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on page_content" ON public.page_content FOR ALL USING (true) WITH CHECK (true);

CREATE TRIGGER page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- Seed: Homepage
-- ============================================
INSERT INTO public.page_content (page_slug, title, content) VALUES
('home', 'Accueil', '{
  "hero_slides": [
    {
      "badge": "Cabinet Foncier & Immobilier au Togo",
      "title": "Sécurisez Votre",
      "highlight": "Patrimoine",
      "titleEnd": "Foncier",
      "description": "DKA-Consulting vous accompagne dans toutes vos démarches foncières au Togo : création, mutation et morcellement de titres fonciers avec expertise et transparence.",
      "cta": "Demander un Devis Gratuit",
      "ctaLink": "/contact",
      "secondaryCta": "Découvrir nos Services",
      "secondaryLink": "/services/titre-foncier"
    },
    {
      "badge": "Service Phare",
      "title": "Création de",
      "highlight": "Titre Foncier",
      "titleEnd": "",
      "description": "Procédure complète d''immatriculation foncière auprès du guichet unique. Obtenez votre titre définitif et protégez votre terrain contre toute contestation.",
      "cta": "Démarrer la Procédure",
      "ctaLink": "/contact",
      "secondaryCta": "En Savoir Plus",
      "secondaryLink": "/services/titre-foncier"
    },
    {
      "badge": "Transfert de Propriété",
      "title": "Mutation &",
      "highlight": "Morcellement",
      "titleEnd": "Simplifiés",
      "description": "Transférez ou divisez vos propriétés en toute légalité. Notre équipe d''experts gère l''ensemble des formalités administratives et juridiques pour vous.",
      "cta": "Nous Consulter",
      "ctaLink": "/contact",
      "secondaryCta": "Voir les Détails",
      "secondaryLink": "/services/mutation"
    }
  ],
  "services_title": "Des Solutions Complètes pour Votre Foncier",
  "services_subtitle": "Nous vous accompagnons dans toutes vos démarches foncières avec expertise, transparence et professionnalisme.",
  "services": [
    { "title": "Création de Titre Foncier", "description": "Procédure complète d''immatriculation foncière auprès du guichet unique foncier pour obtenir votre titre définitif." },
    { "title": "Mutation de Titre Foncier", "description": "Transfert de propriété d''un bien immobilier d''une personne à une autre avec mise à jour du livre foncier." },
    { "title": "Morcellement", "description": "Division d''un terrain immatriculé en plusieurs parcelles distinctes pour créer de nouveaux titres individuels." },
    { "title": "Conseil Juridique", "description": "Accompagnement juridique expert pour toutes vos questions liées au foncier et à l''immobilier." }
  ],
  "about_title": "Votre Partenaire de Confiance en Matière Foncière",
  "about_text": "Créée en 2023 à Lomé par de jeunes diplômés en droit des affaires et en géométrie-topographie, DKA-Consulting Sarl est un cabinet qui évolue grâce à la volonté et à la détermination de ses fondateurs.",
  "about_text2": "Le foncier étant devenu un véritable casse-tête pour la population en Afrique et particulièrement au Togo, nous avons décidé de permettre aux gens d''être dans le bain pour ne pas être surpris désagréablement par les innovations et les exigences légales nouvelles en la matière.",
  "about_quote": "Le travail bien fait est notre force car c''est ce qui crée la confiance et une relation d''affaire continue avec nos clients.",
  "advantages_title": "Les Avantages d''un Titre Foncier",
  "advantages_subtitle": "Transformez un droit coutumier ou précaire en un droit de propriété formel et protégé par l''État.",
  "advantages": [
    { "title": "Sécurité Juridique", "description": "Protection contre la spoliation, les doubles ventes et les litiges fonciers." },
    { "title": "Accès au Crédit", "description": "Un terrain titré est une garantie solide pour obtenir des prêts bancaires." },
    { "title": "Valorisation du Patrimoine", "description": "Un bien avec titre foncier a une valeur supérieure et attire les investisseurs." },
    { "title": "Tranquillité d''Esprit", "description": "Élimination des risques de contestation par des tiers." }
  ],
  "cta_title": "Prêt à Sécuriser Votre Propriété ?",
  "cta_text": "Contactez-nous dès aujourd''hui pour une consultation gratuite et découvrez comment nous pouvons vous aider à protéger votre patrimoine foncier."
}'::jsonb)
ON CONFLICT (page_slug) DO NOTHING;

-- ============================================
-- Seed: À Propos
-- ============================================
INSERT INTO public.page_content (page_slug, title, content) VALUES
('a-propos', 'À Propos', '{
  "hero_title": "DKA-Consulting Sarl",
  "hero_subtitle": "Un cabinet foncier et immobilier créé par de jeunes entrepreneurs togolais déterminés à accompagner leurs concitoyens dans la sécurisation de leur patrimoine.",
  "history_title": "Née d''une Vision Entrepreneuriale",
  "history_text": "Le foncier de nos jours est devenu un casse-tête pour la population en Afrique et particulièrement au Togo. Afin donc de permettre aux gens d''être dans le bain pour ne pas être surpris désagréablement par les innovations et les exigences légales nouvelles en la matière, DKA-Consulting Sarl est créée pour leur jouer ce rôle et ceci de façon claire et transparente.",
  "history_text2": "Jeune entreprise, DKA-Consulting est créée en 2023 dans les conditions légales au Togo, et plus précisément à Lomé par de jeunes diplômés en droit des affaires et en géométrie-topographie. C''est un cabinet qui évolue grâce à la volonté et à la détermination de ses fondateurs qui veulent prendre leur destin en main par l''entreprenariat.",
  "quote": "Le travail bien fait est notre force car c''est ce qui crée la confiance et une relation d''affaire continue avec nos clients.",
  "legal_info": [
    { "label": "RCCM", "value": "TG-LFW-01-2023-B 12-01723" },
    { "label": "NIF", "value": "1001889673" },
    { "label": "CNSS", "value": "180768" },
    { "label": "Régime Fiscal", "value": "Sans TVA" }
  ],
  "values": [
    { "title": "Intégrité", "description": "Nous agissons avec honnêteté et transparence dans toutes nos interactions." },
    { "title": "Excellence", "description": "Le travail bien fait est notre force et notre signature." },
    { "title": "Proximité", "description": "Nous restons proches de nos clients pour mieux les servir." },
    { "title": "Engagement", "description": "Nous nous engageons à atteindre les objectifs de nos clients." }
  ],
  "milestones": [
    { "year": "2023", "title": "Création de DKA-Consulting", "description": "Fondation du cabinet par de jeunes diplômés en droit des affaires et géométrie-topographie." },
    { "year": "2023", "title": "Enregistrement Officiel", "description": "Inscription au RCCM et obtention du NIF, déclaration à la CNSS." },
    { "year": "2024", "title": "Expansion des Services", "description": "Développement de notre offre de conseil juridique et suivi de chantiers." },
    { "year": "2025", "title": "Croissance Continue", "description": "Renforcement de notre équipe et amélioration de nos processus." }
  ],
  "vision_title": "Se Démarquer par l''Excellence",
  "vision_text": "La plus grande vision du cabinet c''est de se faire remarquer et se démarquer parmi les entreprises qui interviennent dans le même domaine dans les prochaines années. Et on ne peut parvenir à cela que par du bon travail.",
  "vision_goals": [
    "Devenir le cabinet de référence au Togo",
    "Accompagner toujours plus de Togolais",
    "Innover dans nos services",
    "Former les nouvelles générations"
  ],
  "cta_title": "Prêt à Travailler avec Nous ?",
  "cta_text": "Contactez-nous dès aujourd''hui pour discuter de votre projet foncier et découvrir comment nous pouvons vous accompagner."
}'::jsonb)
ON CONFLICT (page_slug) DO NOTHING;

-- ============================================
-- Seed: Contact
-- ============================================
INSERT INTO public.page_content (page_slug, title, content) VALUES
('contact', 'Contact', '{
  "hero_title": "Contactez-Nous",
  "hero_subtitle": "Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets fonciers.",
  "address": "Lomé, Togo",
  "phone": "+228 XX XX XX XX",
  "email": "contact@dka-consulting.tg",
  "hours": "Lun-Ven: 8h-18h / Sam: 9h-13h"
}'::jsonb)
ON CONFLICT (page_slug) DO NOTHING;

-- ============================================
-- Seed: Services
-- ============================================
INSERT INTO public.page_content (page_slug, title, content) VALUES
('services', 'Services', '{
  "hero_title": "Nos Services",
  "hero_subtitle": "DKA-Consulting vous propose une gamme complète de services fonciers et immobiliers pour sécuriser votre patrimoine au Togo.",
  "titre_foncier_title": "Création de Titre Foncier",
  "titre_foncier_description": "La procédure d''immatriculation foncière permet de transformer un droit de propriété coutumier ou précaire en un droit de propriété formel, définitif et inattaquable, inscrit au livre foncier.",
  "mutation_title": "Mutation de Titre Foncier",
  "mutation_description": "La mutation est le transfert officiel de propriété d''un bien immobilier titré d''une personne à une autre, avec mise à jour du livre foncier.",
  "morcellement_title": "Morcellement de Terrain",
  "morcellement_description": "Le morcellement consiste à diviser un terrain immatriculé en plusieurs parcelles distinctes, chacune recevant un nouveau titre foncier.",
  "conseil_title": "Conseil Juridique Foncier",
  "conseil_description": "Notre équipe d''experts vous accompagne dans toutes vos questions juridiques liées au foncier et à l''immobilier."
}'::jsonb)
ON CONFLICT (page_slug) DO NOTHING;

-- ============================================
-- Seed: Service - Titre Foncier (detail page)
-- ============================================
INSERT INTO public.page_content (page_slug, title, content) VALUES
('service-titre-foncier', 'Création de Titre Foncier', '{
  "breadcrumb": "Création de Titre Foncier",
  "hero_title": "Création de Titre Foncier",
  "hero_description": "Le titre foncier est un acte administratif définitif, inattaquable et irrévocable attestant la propriété immobilière. Nous vous accompagnons dans toute la procédure d''immatriculation foncière auprès du guichet unique foncier.",
  "what_title": "Qu''est-ce qu''un Titre Foncier ?",
  "what_text": "Le titre foncier (TF) est avant tout un acte administratif définitif, inattaquable et irrévocable attestant la propriété immobilière, inscrit dans les livres fonciers. Il constitue la preuve absolue du droit de propriété.",
  "what_text2": "L''obtention du titre foncier au Togo suit une procédure d''immatriculation foncière auprès du guichet unique foncier. Cette procédure requiert une connaissance approfondie des exigences légales et administratives.",
  "important_text": "Toute personne détentrice d''un titre foncier transforme un droit coutumier ou précaire en un droit de propriété formel et protégé par l''État.",
  "benefits": [
    {"title": "Inattaquable et Définitif", "description": "Le titre foncier est la preuve absolue de propriété, inscrite dans les livres fonciers."},
    {"title": "Garantie Bancaire", "description": "Un terrain titré constitue une garantie solide pour obtenir des prêts."},
    {"title": "Transmission Simplifiée", "description": "Facilite les procédures de vente, location ou succession."}
  ],
  "process_title": "Les Étapes de la Création",
  "process_subtitle": "Un accompagnement personnalisé à chaque étape de votre procédure d''immatriculation.",
  "steps": [
    {"number": "01", "title": "Consultation Initiale", "description": "Analyse de votre situation et vérification des documents existants."},
    {"number": "02", "title": "Constitution du Dossier", "description": "Rassemblement de tous les documents nécessaires pour l''immatriculation."},
    {"number": "03", "title": "Dépôt au Guichet Unique", "description": "Soumission du dossier complet auprès du guichet unique foncier."},
    {"number": "04", "title": "Suivi de la Procédure", "description": "Accompagnement à chaque étape jusqu''à l''obtention du titre."},
    {"number": "05", "title": "Remise du Titre Foncier", "description": "Réception et vérification du titre foncier définitif."}
  ],
  "docs_title": "Pièces à Fournir",
  "docs_text": "Pour constituer un dossier complet d''immatriculation foncière, plusieurs documents sont généralement nécessaires. Notre équipe vous accompagne dans la collecte et la vérification de ces pièces.",
  "documents": [
    "Acte de vente ou de donation",
    "Plan de situation du terrain",
    "Procès-verbal de bornage",
    "Attestation de non-litige",
    "Pièces d''identité des parties",
    "Certificat de propriété coutumière"
  ],
  "timeline_title": "Délais Moyens",
  "timeline_subtitle": "Variable selon les dossiers",
  "timeline_1_label": "Constitution du dossier",
  "timeline_1_duration": "1-2 semaines",
  "timeline_2_label": "Procédure administrative",
  "timeline_2_duration": "2-6 mois",
  "timeline_3_label": "Délivrance du titre",
  "timeline_3_duration": "1-2 semaines",
  "timeline_cta": "Demander un Devis",
  "cta_title": "Prêt à Obtenir Votre Titre Foncier ?",
  "cta_text": "Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons vous accompagner dans votre procédure d''immatriculation.",
  "cta_button": "Demander un Devis Gratuit"
}'::jsonb)
ON CONFLICT (page_slug) DO NOTHING;

-- ============================================
-- Seed: Service - Mutation (detail page)
-- ============================================
INSERT INTO public.page_content (page_slug, title, content) VALUES
('service-mutation', 'Mutation de Titre Foncier', '{
  "breadcrumb": "Mutation de Titre Foncier",
  "hero_title": "Mutation de Titre Foncier",
  "hero_description": "La mutation du titre foncier est la procédure administrative et juridique permettant le transfert de propriété d''un bien immobilier d''une personne à une autre en mettant à jour le livre foncier.",
  "what_title": "Qu''est-ce que la Mutation ?",
  "what_text": "Le titre foncier (TF) créé peut subir une mutation d''une personne à une autre. La mutation du TF est donc la procédure administrative et juridique permettant le transfert de propriété d''un bien immobilier (terrain ou bâtiment) d''une personne à une autre.",
  "what_text2": "Cette procédure implique la mise à jour du livre foncier auprès de la conservation foncière pour que le nouveau propriétaire soit officiellement reconnu comme tel.",
  "accompaniment_title": "Notre Accompagnement",
  "accompaniment_text": "Nous gérons l''intégralité de la procédure de mutation pour vous.",
  "types": [
    {"title": "Vente Immobilière", "description": "Transfert de propriété suite à une transaction commerciale entre vendeur et acheteur."},
    {"title": "Donation", "description": "Transmission gratuite de la propriété d''une personne à une autre."},
    {"title": "Succession", "description": "Transfert de propriété dans le cadre d''un héritage ou d''une succession."},
    {"title": "Échange", "description": "Permutation de biens immobiliers entre deux propriétaires."}
  ],
  "process_title": "Les Étapes de la Mutation",
  "process_subtitle": "Une procédure rigoureuse pour garantir la validité du transfert de propriété.",
  "steps": [
    {"number": "01", "title": "Vérification du Titre", "description": "Contrôle de l''authenticité et de la validité du titre foncier existant."},
    {"number": "02", "title": "Rédaction de l''Acte", "description": "Préparation de l''acte de vente ou de donation par un notaire."},
    {"number": "03", "title": "Paiement des Droits", "description": "Règlement des droits d''enregistrement et taxes de mutation."},
    {"number": "04", "title": "Dépôt du Dossier", "description": "Soumission du dossier complet à la conservation foncière."},
    {"number": "05", "title": "Mise à Jour du Livre", "description": "Inscription du nouveau propriétaire dans les livres fonciers."}
  ],
  "docs_title": "Documents Nécessaires",
  "seller_docs": ["Titre foncier original", "Pièce d''identité valide", "Certificat de situation juridique", "Quitus fiscal"],
  "buyer_docs": ["Pièce d''identité valide", "Justificatif de domicile", "Attestation de paiement", "Acte de vente notarié"],
  "cta_title": "Besoin d''une Mutation de Titre ?",
  "cta_text": "Que ce soit pour une vente, une donation ou une succession, nous vous accompagnons dans toutes les étapes de la mutation de votre titre foncier.",
  "cta_button": "Demander un Devis Gratuit"
}'::jsonb)
ON CONFLICT (page_slug) DO NOTHING;

-- ============================================
-- Seed: Service - Morcellement (detail page)
-- ============================================
INSERT INTO public.page_content (page_slug, title, content) VALUES
('service-morcellement', 'Morcellement de Terrain', '{
  "breadcrumb": "Morcellement",
  "hero_title": "Morcellement de Terrain",
  "hero_description": "Le morcellement est une opération juridique et technique consistant à diviser un terrain déjà immatriculé en plusieurs parcelles distinctes, créant ainsi de nouveaux titres fonciers individuels.",
  "what_title": "Qu''est-ce que le Morcellement ?",
  "what_text": "Le titre foncier peut subir un morcellement, qui est une opération juridique et technique consistant à diviser un terrain déjà immatriculé en plusieurs parcelles distinctes.",
  "what_text2": "C''est une opération qui permet de créer de nouveaux titres fonciers individuels pour chaque portion détachée, généralement dans le cadre de vente, de don, de partage ou de lotissement.",
  "advantages_title": "Avantages du Morcellement",
  "advantages": ["Flexibilité dans la gestion du patrimoine", "Possibilité de vendre partiellement", "Facilitation des successions", "Création de valeur ajoutée"],
  "reasons": [
    {"title": "Vente Partielle", "description": "Vendre une partie de votre terrain tout en conservant le reste."},
    {"title": "Partage Familial", "description": "Diviser un terrain entre héritiers ou membres de la famille."},
    {"title": "Lotissement", "description": "Créer un lotissement pour un projet immobilier."},
    {"title": "Don de Terrain", "description": "Donner une portion de terrain à un tiers."}
  ],
  "process_title": "Les Étapes du Morcellement",
  "process_subtitle": "Une procédure technique et administrative rigoureuse pour garantir la validité des nouveaux titres.",
  "steps": [
    {"number": "01", "title": "Étude du Terrain", "description": "Analyse technique du terrain et vérification de la faisabilité du morcellement."},
    {"number": "02", "title": "Levé Topographique", "description": "Réalisation des mesures et établissement du plan de morcellement."},
    {"number": "03", "title": "Validation Administrative", "description": "Obtention des autorisations nécessaires auprès des autorités compétentes."},
    {"number": "04", "title": "Bornage des Parcelles", "description": "Implantation des bornes délimitant les nouvelles parcelles."},
    {"number": "05", "title": "Création des Nouveaux TF", "description": "Établissement des titres fonciers individuels pour chaque parcelle."}
  ],
  "technical_title": "Notre Expertise Technique",
  "technical_subtitle": "Aspects Techniques",
  "tech_1_title": "Levé Topographique",
  "tech_1_desc": "Mesures précises par nos géomètres-topographes qualifiés.",
  "tech_2_title": "Bornage Officiel",
  "tech_2_desc": "Implantation des bornes conformes aux normes en vigueur.",
  "tech_3_title": "Plans Cadastraux",
  "tech_3_desc": "Établissement des plans conformes pour chaque parcelle.",
  "cta_title": "Projet de Morcellement ?",
  "cta_text": "Que ce soit pour une vente partielle, un partage familial ou un lotissement, notre équipe de géomètres-topographes vous accompagne de A à Z.",
  "cta_button": "Demander un Devis Gratuit"
}'::jsonb)
ON CONFLICT (page_slug) DO NOTHING;

-- ============================================
-- Seed: Service - Conseil Juridique (detail page)
-- ============================================
INSERT INTO public.page_content (page_slug, title, content) VALUES
('service-conseil', 'Conseil Juridique', '{
  "breadcrumb": "Conseil Juridique",
  "hero_title": "Conseil Juridique",
  "hero_description": "Outre les activités foncières et immobilières, DKA-Consulting traite d''autres questions juridiques. Notre équipe de juristes vous accompagne dans tous vos besoins légaux liés au foncier.",
  "services_title": "Un Accompagnement Juridique Complet",
  "services_subtitle": "Bénéficiez de l''expertise de nos juristes spécialisés en droit foncier et immobilier pour tous vos projets.",
  "services_list": [
    {"title": "Audit Foncier", "description": "Vérification complète de la situation juridique de votre bien immobilier."},
    {"title": "Résolution de Litiges", "description": "Accompagnement dans la résolution des conflits fonciers et immobiliers."},
    {"title": "Médiation", "description": "Facilitation des négociations entre parties dans les transactions immobilières."},
    {"title": "Conseil en Transactions", "description": "Accompagnement juridique pour les ventes, achats et locations."},
    {"title": "Suivi de Chantiers", "description": "Supervision et gestion de vos projets de construction."},
    {"title": "Expertise Juridique", "description": "Consultation juridique pour toutes questions liées au foncier."}
  ],
  "expertise_title": "Des Juristes Spécialisés à Votre Service",
  "expertise_text": "Notre équipe est composée de diplômés en droit des affaires, formés pour répondre à toutes vos questions juridiques liées au foncier et à l''immobilier au Togo.",
  "expertise_list": ["Droit foncier togolais", "Droit immobilier", "Droit des contrats", "Droit de la construction", "Droit des successions", "Droit des sociétés"],
  "why_choose_title": "Pourquoi Nous Choisir ?",
  "why_choose_list": ["Expertise reconnue en droit foncier togolais", "Accompagnement personnalisé", "Transparence dans nos démarches", "Tarifs compétitifs", "Suivi rigoureux de vos dossiers", "Disponibilité et réactivité"],
  "chantier_title": "Suivi de Chantiers",
  "chantier_text": "En plus de nos services juridiques, DKA-Consulting propose un service de suivi de chantiers pour ceux qui le sollicitent. Nos experts assurent la supervision et la gestion de vos projets de construction.",
  "chantier_items": [
    {"title": "Supervision", "desc": "Contrôle régulier de l''avancement des travaux"},
    {"title": "Coordination", "desc": "Gestion des intervenants sur le chantier"},
    {"title": "Reporting", "desc": "Rapports détaillés sur l''état du projet"}
  ],
  "cta_title": "Besoin d''un Conseil Juridique ?",
  "cta_text": "Notre équipe de juristes est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos démarches.",
  "cta_button": "Prendre Rendez-vous"
}'::jsonb)
ON CONFLICT (page_slug) DO NOTHING;
