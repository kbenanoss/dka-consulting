"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Save,
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  CheckCircle,
  Globe,
  Home,
  Info,
  Phone,
  Briefcase,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSupabase } from "@/lib/supabase/hooks";

interface PageData {
  id?: string;
  page_slug: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any>;
}

const PAGE_TABS = [
  { slug: "home", label: "Accueil", icon: Home },
  { slug: "a-propos", label: "À Propos", icon: Info },
  { slug: "contact", label: "Contact", icon: Phone },
  { slug: "services", label: "Services", icon: Briefcase },
];

export default function ContenuPage() {
  const supabase = useSupabase();
  const [pages, setPages] = useState<PageData[]>([]);
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchPages = useCallback(async () => {
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .order("page_slug");

    if (!error && data) {
      setPages(data);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const currentPage = pages.find((p) => p.page_slug === activeTab);

  const updateField = (key: string, value: unknown) => {
    setPages((prev) =>
      prev.map((p) =>
        p.page_slug === activeTab
          ? { ...p, content: { ...p.content, [key]: value } }
          : p
      )
    );
    setSaved(false);
  };

  const updateArrayItem = (
    key: string,
    index: number,
    field: string,
    value: string
  ) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.page_slug !== activeTab) return p;
        const arr = [...((p.content[key] as Array<Record<string, string>>) || [])];
        arr[index] = { ...arr[index], [field]: value };
        return { ...p, content: { ...p.content, [key]: arr } };
      })
    );
    setSaved(false);
  };

  const addArrayItem = (key: string, template: Record<string, string>) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.page_slug !== activeTab) return p;
        const arr = [...((p.content[key] as Array<Record<string, string>>) || []), template];
        return { ...p, content: { ...p.content, [key]: arr } };
      })
    );
    setSaved(false);
  };

  const removeArrayItem = (key: string, index: number) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.page_slug !== activeTab) return p;
        const arr = ((p.content[key] as Array<Record<string, string>>) || []).filter(
          (_, i) => i !== index
        );
        return { ...p, content: { ...p.content, [key]: arr } };
      })
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    let hasError = false;

    if (activeTab === "services") {
      // Save the services listing page + all service-* detail pages
      const serviceSlugs = pages
        .filter((p) => p.page_slug === "services" || p.page_slug.startsWith("service-"))
        .map((p) => p.page_slug);
      for (const slug of serviceSlugs) {
        const pg = pages.find((p) => p.page_slug === slug);
        if (!pg) continue;
        const { error } = await supabase
          .from("page_content")
          .update({ content: pg.content })
          .eq("page_slug", slug);
        if (error) hasError = true;
      }
    } else {
      if (!currentPage) { setSaving(false); return; }
      const { error } = await supabase
        .from("page_content")
        .update({ content: currentPage.content })
        .eq("page_slug", activeTab);
      if (error) hasError = true;
    }

    setSaving(false);
    if (!hasError) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contenu du Site</h1>
          <p className="text-gray-500 mt-1">
            Modifiez le contenu de toutes les pages du site
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving || saved}>
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : saved ? (
            <CheckCircle className="h-4 w-4 mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {saving ? "Enregistrement..." : saved ? "Enregistré !" : "Enregistrer"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {PAGE_TABS.map((tab) => (
          <button
            key={tab.slug}
            onClick={() => setActiveTab(tab.slug)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.slug
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Editor */}
      {currentPage ? (
        <div className="space-y-6">
          {activeTab === "home" && <HomeEditor page={currentPage} updateField={updateField} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />}
          {activeTab === "a-propos" && <AProposEditor page={currentPage} updateField={updateField} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />}
          {activeTab === "contact" && <ContactEditor page={currentPage} updateField={updateField} />}
          {activeTab === "services" && <ServicesEditor page={currentPage} updateField={updateField} allPages={pages} setAllPages={setPages} setSaved={setSaved} supabase={supabase} />}
        </div>
      ) : (
        <Card hover={false}>
          <CardContent className="p-12 text-center">
            <Globe className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Aucun contenu trouvé pour cette page. Exécutez la migration SQL.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ============================================
   Editor Props
   ============================================ */
interface EditorProps {
  page: PageData;
  updateField: (key: string, value: unknown) => void;
  updateArrayItem?: (key: string, index: number, field: string, value: string) => void;
  addArrayItem?: (key: string, template: Record<string, string>) => void;
  removeArrayItem?: (key: string, index: number) => void;
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
      <FileText className="h-5 w-5 text-green-600" />
      {title}
    </h3>
  );
}

/* ============================================
   Home Editor
   ============================================ */
function HomeEditor({ page, updateField, updateArrayItem, addArrayItem, removeArrayItem }: EditorProps) {
  const c = page.content;
  const slides = (c.hero_slides || []) as Array<Record<string, string>>;
  const services = (c.services || []) as Array<Record<string, string>>;
  const advantages = (c.advantages || []) as Array<Record<string, string>>;

  return (
    <>
      {/* Hero Slides */}
      <Card hover={false}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Slides du Hero</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addArrayItem?.("hero_slides", {
                  badge: "",
                  title: "",
                  highlight: "",
                  titleEnd: "",
                  description: "",
                  cta: "",
                  ctaLink: "/contact",
                  secondaryCta: "",
                  secondaryLink: "/services",
                })
              }
            >
              <Plus className="h-4 w-4 mr-1" /> Ajouter un slide
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {slides.map((slide, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-gray-50 rounded-xl space-y-3 relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <GripVertical className="h-4 w-4" /> Slide {i + 1}
                </span>
                {slides.length > 1 && (
                  <button
                    onClick={() => removeArrayItem?.("hero_slides", i)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <FieldGroup label="Badge">
                  <Input value={slide.badge} onChange={(e) => updateArrayItem?.("hero_slides", i, "badge", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Titre">
                  <Input value={slide.title} onChange={(e) => updateArrayItem?.("hero_slides", i, "title", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Mot en surbrillance">
                  <Input value={slide.highlight} onChange={(e) => updateArrayItem?.("hero_slides", i, "highlight", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Fin du titre">
                  <Input value={slide.titleEnd} onChange={(e) => updateArrayItem?.("hero_slides", i, "titleEnd", e.target.value)} />
                </FieldGroup>
              </div>
              <FieldGroup label="Description">
                <Textarea value={slide.description} onChange={(e) => updateArrayItem?.("hero_slides", i, "description", e.target.value)} rows={2} />
              </FieldGroup>
              <div className="grid md:grid-cols-2 gap-3">
                <FieldGroup label="Bouton principal">
                  <Input value={slide.cta} onChange={(e) => updateArrayItem?.("hero_slides", i, "cta", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Lien principal">
                  <Input value={slide.ctaLink} onChange={(e) => updateArrayItem?.("hero_slides", i, "ctaLink", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Bouton secondaire">
                  <Input value={slide.secondaryCta} onChange={(e) => updateArrayItem?.("hero_slides", i, "secondaryCta", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Lien secondaire">
                  <Input value={slide.secondaryLink} onChange={(e) => updateArrayItem?.("hero_slides", i, "secondaryLink", e.target.value)} />
                </FieldGroup>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Services Section */}
      <Card hover={false}>
        <CardHeader><CardTitle>Section Services</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Titre de la section">
            <Input value={c.services_title as string || ""} onChange={(e) => updateField("services_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Sous-titre">
            <Textarea value={c.services_subtitle as string || ""} onChange={(e) => updateField("services_subtitle", e.target.value)} rows={2} />
          </FieldGroup>
          {services.map((svc, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl grid md:grid-cols-2 gap-3">
              <FieldGroup label={`Service ${i + 1} — Titre`}>
                <Input value={svc.title} onChange={(e) => updateArrayItem?.("services", i, "title", e.target.value)} />
              </FieldGroup>
              <FieldGroup label="Description">
                <Input value={svc.description} onChange={(e) => updateArrayItem?.("services", i, "description", e.target.value)} />
              </FieldGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* About Section */}
      <Card hover={false}>
        <CardHeader><CardTitle>Section À Propos</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Titre">
            <Input value={c.about_title as string || ""} onChange={(e) => updateField("about_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Texte paragraphe 1">
            <Textarea value={c.about_text as string || ""} onChange={(e) => updateField("about_text", e.target.value)} rows={3} />
          </FieldGroup>
          <FieldGroup label="Texte paragraphe 2">
            <Textarea value={c.about_text2 as string || ""} onChange={(e) => updateField("about_text2", e.target.value)} rows={3} />
          </FieldGroup>
          <FieldGroup label="Citation">
            <Textarea value={c.about_quote as string || ""} onChange={(e) => updateField("about_quote", e.target.value)} rows={2} />
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Advantages */}
      <Card hover={false}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Section Avantages</CardTitle>
            <Button variant="outline" size="sm" onClick={() => addArrayItem?.("advantages", { title: "", description: "" })}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Titre de la section">
            <Input value={c.advantages_title as string || ""} onChange={(e) => updateField("advantages_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Sous-titre">
            <Textarea value={c.advantages_subtitle as string || ""} onChange={(e) => updateField("advantages_subtitle", e.target.value)} rows={2} />
          </FieldGroup>
          {advantages.map((adv, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl flex gap-3 items-start">
              <div className="flex-1 grid md:grid-cols-2 gap-3">
                <FieldGroup label="Titre">
                  <Input value={adv.title} onChange={(e) => updateArrayItem?.("advantages", i, "title", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Description">
                  <Input value={adv.description} onChange={(e) => updateArrayItem?.("advantages", i, "description", e.target.value)} />
                </FieldGroup>
              </div>
              <button onClick={() => removeArrayItem?.("advantages", i)} className="p-1 text-red-400 hover:text-red-600 mt-6">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* CTA */}
      <Card hover={false}>
        <CardHeader><CardTitle>Section Appel à l&apos;Action</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Titre">
            <Input value={c.cta_title as string || ""} onChange={(e) => updateField("cta_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Texte">
            <Textarea value={c.cta_text as string || ""} onChange={(e) => updateField("cta_text", e.target.value)} rows={2} />
          </FieldGroup>
        </CardContent>
      </Card>
    </>
  );
}

/* ============================================
   À Propos Editor
   ============================================ */
function AProposEditor({ page, updateField, updateArrayItem, addArrayItem, removeArrayItem }: EditorProps) {
  const c = page.content;
  const values = (c.values || []) as Array<Record<string, string>>;
  const milestones = (c.milestones || []) as Array<Record<string, string>>;
  const goals = (c.vision_goals || []) as string[];

  return (
    <>
      <Card hover={false}>
        <CardHeader><CardTitle>En-tête</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Titre">
            <Input value={c.hero_title as string || ""} onChange={(e) => updateField("hero_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Sous-titre">
            <Textarea value={c.hero_subtitle as string || ""} onChange={(e) => updateField("hero_subtitle", e.target.value)} rows={2} />
          </FieldGroup>
        </CardContent>
      </Card>

      <Card hover={false}>
        <CardHeader><CardTitle>Notre Histoire</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Titre">
            <Input value={c.history_title as string || ""} onChange={(e) => updateField("history_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Paragraphe 1">
            <Textarea value={c.history_text as string || ""} onChange={(e) => updateField("history_text", e.target.value)} rows={4} />
          </FieldGroup>
          <FieldGroup label="Paragraphe 2">
            <Textarea value={c.history_text2 as string || ""} onChange={(e) => updateField("history_text2", e.target.value)} rows={4} />
          </FieldGroup>
          <FieldGroup label="Citation">
            <Textarea value={c.quote as string || ""} onChange={(e) => updateField("quote", e.target.value)} rows={2} />
          </FieldGroup>
        </CardContent>
      </Card>

      <Card hover={false}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Nos Valeurs</CardTitle>
            <Button variant="outline" size="sm" onClick={() => addArrayItem?.("values", { title: "", description: "" })}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {values.map((v, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl flex gap-3 items-start">
              <div className="flex-1 grid md:grid-cols-2 gap-3">
                <FieldGroup label="Titre">
                  <Input value={v.title} onChange={(e) => updateArrayItem?.("values", i, "title", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Description">
                  <Input value={v.description} onChange={(e) => updateArrayItem?.("values", i, "description", e.target.value)} />
                </FieldGroup>
              </div>
              <button onClick={() => removeArrayItem?.("values", i)} className="p-1 text-red-400 hover:text-red-600 mt-6">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card hover={false}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Étapes Clés</CardTitle>
            <Button variant="outline" size="sm" onClick={() => addArrayItem?.("milestones", { year: "", title: "", description: "" })}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {milestones.map((m, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl flex gap-3 items-start">
              <div className="flex-1 grid md:grid-cols-3 gap-3">
                <FieldGroup label="Année">
                  <Input value={m.year} onChange={(e) => updateArrayItem?.("milestones", i, "year", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Titre">
                  <Input value={m.title} onChange={(e) => updateArrayItem?.("milestones", i, "title", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Description">
                  <Input value={m.description} onChange={(e) => updateArrayItem?.("milestones", i, "description", e.target.value)} />
                </FieldGroup>
              </div>
              <button onClick={() => removeArrayItem?.("milestones", i)} className="p-1 text-red-400 hover:text-red-600 mt-6">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card hover={false}>
        <CardHeader><CardTitle>Notre Vision</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Titre">
            <Input value={c.vision_title as string || ""} onChange={(e) => updateField("vision_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Texte">
            <Textarea value={c.vision_text as string || ""} onChange={(e) => updateField("vision_text", e.target.value)} rows={3} />
          </FieldGroup>
          <SectionTitle title="Objectifs" />
          {goals.map((goal, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input
                value={goal}
                onChange={(e) => {
                  const arr = [...goals];
                  arr[i] = e.target.value;
                  updateField("vision_goals", arr);
                }}
              />
              <button
                onClick={() => updateField("vision_goals", goals.filter((_, j) => j !== i))}
                className="p-2 text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => updateField("vision_goals", [...goals, ""])}>
            <Plus className="h-4 w-4 mr-1" /> Ajouter un objectif
          </Button>
        </CardContent>
      </Card>

      <Card hover={false}>
        <CardHeader><CardTitle>Appel à l&apos;Action</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Titre">
            <Input value={c.cta_title as string || ""} onChange={(e) => updateField("cta_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Texte">
            <Textarea value={c.cta_text as string || ""} onChange={(e) => updateField("cta_text", e.target.value)} rows={2} />
          </FieldGroup>
        </CardContent>
      </Card>
    </>
  );
}

/* ============================================
   Contact Editor
   ============================================ */
function ContactEditor({ page, updateField }: EditorProps) {
  const c = page.content;

  return (
    <>
      <Card hover={false}>
        <CardHeader><CardTitle>En-tête</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Titre">
            <Input value={c.hero_title as string || ""} onChange={(e) => updateField("hero_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Sous-titre">
            <Textarea value={c.hero_subtitle as string || ""} onChange={(e) => updateField("hero_subtitle", e.target.value)} rows={2} />
          </FieldGroup>
        </CardContent>
      </Card>

      <Card hover={false}>
        <CardHeader><CardTitle>Informations de Contact</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Adresse">
              <Input value={c.address as string || ""} onChange={(e) => updateField("address", e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Téléphone">
              <Input value={c.phone as string || ""} onChange={(e) => updateField("phone", e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Email">
              <Input value={c.email as string || ""} onChange={(e) => updateField("email", e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Horaires">
              <Input value={c.hours as string || ""} onChange={(e) => updateField("hours", e.target.value)} />
            </FieldGroup>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

/* ============================================
   Services Editor — unified view for listing + all detail pages
   ============================================ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ServicesEditor({ page, updateField, allPages, setAllPages, setSaved, supabase }: EditorProps & { allPages: PageData[]; setAllPages: React.Dispatch<React.SetStateAction<PageData[]>>; setSaved: React.Dispatch<React.SetStateAction<boolean>>; supabase: any }) {
  const c = page.content;
  const [expanded, setExpanded] = useState<string | null>(null);

  const servicePages = allPages.filter((p) => p.page_slug.startsWith("service-"));

  const toggleExpand = (slug: string) => {
    setExpanded((prev) => (prev === slug ? null : slug));
  };

  const updateServiceField = (slug: string, key: string, value: unknown) => {
    setAllPages((prev) =>
      prev.map((p) =>
        p.page_slug === slug
          ? { ...p, content: { ...p.content, [key]: value } }
          : p
      )
    );
    setSaved(false);
  };

  const updateServiceArrayItem = (slug: string, key: string, index: number, field: string, value: string) => {
    setAllPages((prev) =>
      prev.map((p) => {
        if (p.page_slug !== slug) return p;
        const arr = [...((p.content[key] as Array<Record<string, string>>) || [])];
        arr[index] = { ...arr[index], [field]: value };
        return { ...p, content: { ...p.content, [key]: arr } };
      })
    );
    setSaved(false);
  };

  const addServiceArrayItem = (slug: string, key: string, template: Record<string, string>) => {
    setAllPages((prev) =>
      prev.map((p) => {
        if (p.page_slug !== slug) return p;
        const arr = [...((p.content[key] as Array<Record<string, string>>) || []), template];
        return { ...p, content: { ...p.content, [key]: arr } };
      })
    );
    setSaved(false);
  };

  const removeServiceArrayItem = (slug: string, key: string, index: number) => {
    setAllPages((prev) =>
      prev.map((p) => {
        if (p.page_slug !== slug) return p;
        const arr = ((p.content[key] as Array<Record<string, string>>) || []).filter(
          (_, i) => i !== index
        );
        return { ...p, content: { ...p.content, [key]: arr } };
      })
    );
    setSaved(false);
  };

  const deleteService = async (slug: string) => {
    if (!confirm(`Supprimer le service "${allPages.find((p) => p.page_slug === slug)?.title}" ? Cette action est irréversible.`)) return;
    const { error } = await supabase.from("page_content").delete().eq("page_slug", slug);
    if (!error) {
      setAllPages((prev) => prev.filter((p) => p.page_slug !== slug));
      if (expanded === slug) setExpanded(null);
    }
  };

  const addNewService = async () => {
    const name = prompt("Nom du nouveau service (ex: Bornage de Terrain):");
    if (!name) return;
    const slug = "service-" + name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const newPage: PageData = {
      page_slug: slug,
      title: name,
      content: {
        breadcrumb: name,
        hero_title: name,
        hero_description: "",
        cta_title: "",
        cta_text: "",
        cta_button: "Demander un Devis Gratuit",
      },
    };
    const { error } = await supabase.from("page_content").insert(newPage);
    if (!error) {
      setAllPages((prev) => [...prev, newPage]);
      setExpanded(slug);
    }
  };

  const fieldLabel = (key: string) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());

  return (
    <>
      {/* Services Listing Page Header */}
      <Card hover={false}>
        <CardHeader><CardTitle>Page Services — En-tête</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Titre">
            <Input value={c.hero_title as string || ""} onChange={(e) => updateField("hero_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Sous-titre">
            <Textarea value={c.hero_subtitle as string || ""} onChange={(e) => updateField("hero_subtitle", e.target.value)} rows={2} />
          </FieldGroup>
          <FieldGroup label="Titre section complémentaire">
            <Input value={c.additional_title as string || ""} onChange={(e) => updateField("additional_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Sous-titre section complémentaire">
            <Textarea value={c.additional_subtitle as string || ""} onChange={(e) => updateField("additional_subtitle", e.target.value)} rows={2} />
          </FieldGroup>
          <FieldGroup label="Titre CTA">
            <Input value={c.cta_title as string || ""} onChange={(e) => updateField("cta_title", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Texte CTA">
            <Textarea value={c.cta_text as string || ""} onChange={(e) => updateField("cta_text", e.target.value)} rows={2} />
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Service Detail Pages */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Services ({servicePages.length})</h2>
        <Button onClick={addNewService} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Ajouter un service
        </Button>
      </div>

      {servicePages.length === 0 && (
        <Card hover={false}>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Aucun service trouvé. Exécutez la migration SQL ou ajoutez un nouveau service.</p>
          </CardContent>
        </Card>
      )}

      {servicePages.map((sp) => {
        const isOpen = expanded === sp.page_slug;
        const sc = sp.content;

        const stringFields = Object.entries(sc).filter(
          ([, v]) => typeof v === "string"
        ) as [string, string][];

        const stringArrayFields = Object.entries(sc).filter(
          ([, v]) => Array.isArray(v) && v.length > 0 && typeof v[0] === "string"
        ) as [string, string[]][];

        const objectArrayFields = Object.entries(sc).filter(
          ([, v]) => Array.isArray(v) && v.length > 0 && typeof v[0] === "object"
        ) as [string, Array<Record<string, string>>][];

        return (
          <Card key={sp.page_slug} hover={false} className="overflow-hidden">
            {/* Accordion Header */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => toggleExpand(sp.page_slug)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleExpand(sp.page_slug); }}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {isOpen ? <ChevronDown className="h-5 w-5 text-green-600" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
                <div>
                  <h3 className="font-semibold text-gray-900">{sp.title}</h3>
                  <p className="text-sm text-gray-500">{sp.page_slug}</p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteService(sp.page_slug); }}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer ce service"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Accordion Body */}
            {isOpen && (
              <CardContent className="border-t pt-6 space-y-6">
                {/* Text Fields */}
                <div>
                  <SectionTitle title="Contenu Texte" />
                  <div className="space-y-4">
                    {stringFields.map(([key, val]) => (
                      <FieldGroup key={key} label={fieldLabel(key)}>
                        {val.length > 80 ? (
                          <Textarea value={val} onChange={(e) => updateServiceField(sp.page_slug, key, e.target.value)} rows={3} />
                        ) : (
                          <Input value={val} onChange={(e) => updateServiceField(sp.page_slug, key, e.target.value)} />
                        )}
                      </FieldGroup>
                    ))}
                  </div>
                </div>

                {/* String Array Fields */}
                {stringArrayFields.map(([key, arr]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-3">
                      <SectionTitle title={fieldLabel(key)} />
                      <Button variant="outline" size="sm" onClick={() => {
                        const newArr = [...arr, ""];
                        updateServiceField(sp.page_slug, key, newArr);
                      }}>
                        <Plus className="h-4 w-4 mr-1" /> Ajouter
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {arr.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            value={item}
                            onChange={(e) => {
                              const newArr = [...arr];
                              newArr[i] = e.target.value;
                              updateServiceField(sp.page_slug, key, newArr);
                            }}
                          />
                          <button
                            onClick={() => {
                              const newArr = arr.filter((_, idx) => idx !== i);
                              updateServiceField(sp.page_slug, key, newArr);
                            }}
                            className="p-1.5 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Object Array Fields */}
                {objectArrayFields.map(([key, arr]) => {
                  const fields = arr.length > 0 ? Object.keys(arr[0]) : [];
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-3">
                        <SectionTitle title={fieldLabel(key)} />
                        <Button variant="outline" size="sm" onClick={() => {
                          const template: Record<string, string> = {};
                          fields.forEach((f) => (template[f] = ""));
                          addServiceArrayItem(sp.page_slug, key, template);
                        }}>
                          <Plus className="h-4 w-4 mr-1" /> Ajouter
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {arr.map((item, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                <GripVertical className="h-4 w-4" /> {fieldLabel(key)} {i + 1}
                              </span>
                              {arr.length > 1 && (
                                <button
                                  onClick={() => removeServiceArrayItem(sp.page_slug, key, i)}
                                  className="p-1 text-red-400 hover:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                              {fields.map((field) => (
                                <FieldGroup key={field} label={fieldLabel(field)}>
                                  {(item[field] || "").length > 60 ? (
                                    <Textarea
                                      value={item[field] || ""}
                                      onChange={(e) => updateServiceArrayItem(sp.page_slug, key, i, field, e.target.value)}
                                      rows={2}
                                    />
                                  ) : (
                                    <Input
                                      value={item[field] || ""}
                                      onChange={(e) => updateServiceArrayItem(sp.page_slug, key, i, field, e.target.value)}
                                    />
                                  )}
                                </FieldGroup>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            )}
          </Card>
        );
      })}
    </>
  );
}
