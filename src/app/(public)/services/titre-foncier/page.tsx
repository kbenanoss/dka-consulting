"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle,
  ArrowRight,
  Clock,
  FileCheck,
  Users,
  Building,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageContent } from "@/lib/supabase/content";

const steps = [
  {
    number: "01",
    title: "Consultation Initiale",
    description: "Analyse de votre situation et vérification des documents existants.",
  },
  {
    number: "02",
    title: "Constitution du Dossier",
    description: "Rassemblement de tous les documents nécessaires pour l'immatriculation.",
  },
  {
    number: "03",
    title: "Dépôt au Guichet Unique",
    description: "Soumission du dossier complet auprès du guichet unique foncier.",
  },
  {
    number: "04",
    title: "Suivi de la Procédure",
    description: "Accompagnement à chaque étape jusqu'à l'obtention du titre.",
  },
  {
    number: "05",
    title: "Remise du Titre Foncier",
    description: "Réception et vérification du titre foncier définitif.",
  },
];

const documents = [
  "Acte de vente ou de donation",
  "Plan de situation du terrain",
  "Procès-verbal de bornage",
  "Attestation de non-litige",
  "Pièces d'identité des parties",
  "Certificat de propriété coutumière",
];

const benefits = [
  {
    icon: Shield,
    title: "Inattaquable et Définitif",
    description: "Le titre foncier est la preuve absolue de propriété, inscrite dans les livres fonciers.",
  },
  {
    icon: Building,
    title: "Garantie Bancaire",
    description: "Un terrain titré constitue une garantie solide pour obtenir des prêts.",
  },
  {
    icon: Users,
    title: "Transmission Simplifiée",
    description: "Facilite les procédures de vente, location ou succession.",
  },
];

export default function TitreFoncierPage() {
  const { get } = usePageContent("service-titre-foncier");

  const dynBenefits = get<Array<{title: string; description: string}>>("benefits", []);
  const displayBenefits = benefits.map((b, i) => ({
    ...b,
    title: dynBenefits[i]?.title ?? b.title,
    description: dynBenefits[i]?.description ?? b.description,
  }));

  const displaySteps = get<typeof steps>("steps", steps);
  const displayDocuments = get<string[]>("documents", documents);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-green-900 to-green-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-green-200 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/services/titre-foncier" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span className="text-white">{get("breadcrumb", "Création de Titre Foncier")}</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-900" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {get("hero_title", "Création de Titre Foncier")}
              </h1>
            </div>

            <p className="text-xl text-green-100 leading-relaxed">
              {get("hero_description", "Le titre foncier est un acte administratif définitif, inattaquable et irrévocable attestant la propriété immobilière. Nous vous accompagnons dans toute la procédure d'immatriculation foncière auprès du guichet unique foncier.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is Title Foncier */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                Comprendre
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {get("what_title", "Qu'est-ce qu'un Titre Foncier ?")}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {get("what_text", "Le titre foncier (TF) est avant tout un acte administratif définitif, inattaquable et irrévocable attestant la propriété immobilière, inscrit dans les livres fonciers. Il constitue la preuve absolue du droit de propriété.")}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {get("what_text2", "L'obtention du titre foncier au Togo suit une procédure d'immatriculation foncière auprès du guichet unique foncier. Cette procédure requiert une connaissance approfondie des exigences légales et administratives.")}
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Important</h4>
                    <p className="text-gray-600 text-sm">
                      {get("important_text", "Toute personne détentrice d'un titre foncier transforme un droit coutumier ou précaire en un droit de propriété formel et protégé par l'État.")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6"
            >
              {displayBenefits.map((benefit, index) => (
                <Card key={benefit.title} hover={false} className="border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Notre Processus
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {get("process_title", "Les Étapes de la Création")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {get("process_subtitle", "Un accompagnement personnalisé à chaque étape de votre procédure d'immatriculation.")}
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-4xl h-0.5 bg-green-200 hidden lg:block" />

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {displaySteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
                      <span className="text-xl font-bold">{step.number}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                Documents Requis
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {get("docs_title", "Pièces à Fournir")}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {get("docs_text", "Pour constituer un dossier complet d'immatriculation foncière, plusieurs documents sont généralement nécessaires. Notre équipe vous accompagne dans la collecte et la vérification de ces pièces.")}
              </p>

              <div className="space-y-4">
                {displayDocuments.map((doc, index) => (
                  <motion.div
                    key={doc}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">{doc}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white border-0">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Clock className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{get("timeline_title", "Délais Moyens")}</h3>
                      <p className="text-green-100">{get("timeline_subtitle", "Variable selon les dossiers")}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>{get("timeline_1_label", "Constitution du dossier")}</span>
                        <span className="font-semibold">{get("timeline_1_duration", "1-2 semaines")}</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: "20%" }} />
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>{get("timeline_2_label", "Procédure administrative")}</span>
                        <span className="font-semibold">{get("timeline_2_duration", "2-6 mois")}</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: "60%" }} />
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>{get("timeline_3_label", "Délivrance du titre")}</span>
                        <span className="font-semibold">{get("timeline_3_duration", "1-2 semaines")}</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: "20%" }} />
                      </div>
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900">
                      {get("timeline_cta", "Demander un Devis")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-center text-white"
          >
            <FileCheck className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {get("cta_title", "Prêt à Obtenir Votre Titre Foncier ?")}
            </h2>
            <p className="text-green-100 max-w-2xl mx-auto mb-8">
              {get("cta_text", "Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons vous accompagner dans votre procédure d'immatriculation.")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="xl" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900">
                  {get("cta_button", "Demander un Devis Gratuit")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
