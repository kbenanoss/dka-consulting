"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Grid3X3,
  CheckCircle,
  ArrowRight,
  Ruler,
  MapPin,
  FileText,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageContent } from "@/lib/supabase/content";

const steps = [
  {
    number: "01",
    title: "Étude du Terrain",
    description: "Analyse technique du terrain et vérification de la faisabilité du morcellement.",
  },
  {
    number: "02",
    title: "Levé Topographique",
    description: "Réalisation des mesures et établissement du plan de morcellement.",
  },
  {
    number: "03",
    title: "Validation Administrative",
    description: "Obtention des autorisations nécessaires auprès des autorités compétentes.",
  },
  {
    number: "04",
    title: "Bornage des Parcelles",
    description: "Implantation des bornes délimitant les nouvelles parcelles.",
  },
  {
    number: "05",
    title: "Création des Nouveaux TF",
    description: "Établissement des titres fonciers individuels pour chaque parcelle.",
  },
];

const reasons = [
  {
    icon: Building2,
    title: "Vente Partielle",
    description: "Vendre une partie de votre terrain tout en conservant le reste.",
  },
  {
    icon: FileText,
    title: "Partage Familial",
    description: "Diviser un terrain entre héritiers ou membres de la famille.",
  },
  {
    icon: MapPin,
    title: "Lotissement",
    description: "Créer un lotissement pour un projet immobilier.",
  },
  {
    icon: Ruler,
    title: "Don de Terrain",
    description: "Donner une portion de terrain à un tiers.",
  },
];

export default function MorcellementPage() {
  const { get } = usePageContent("service-morcellement");

  const dynReasons = get<Array<{title: string; description: string}>>("reasons", []);
  const displayReasons = reasons.map((r, i) => ({
    ...r,
    title: dynReasons[i]?.title ?? r.title,
    description: dynReasons[i]?.description ?? r.description,
  }));

  const displaySteps = get<typeof steps>("steps", steps);
  const displayAdvantages = get<string[]>("advantages", [
    "Flexibilité dans la gestion du patrimoine",
    "Possibilité de vendre partiellement",
    "Facilitation des successions",
    "Création de valeur ajoutée",
  ]);

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
              <span>Services</span>
              <span>/</span>
              <span className="text-white">{get("breadcrumb", "Morcellement")}</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center">
                <Grid3X3 className="h-8 w-8 text-gray-900" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {get("hero_title", "Morcellement de Terrain")}
              </h1>
            </div>

            <p className="text-xl text-green-100 leading-relaxed">
              {get("hero_description", "Le morcellement est une opération juridique et technique consistant à diviser un terrain déjà immatriculé en plusieurs parcelles distinctes, créant ainsi de nouveaux titres fonciers individuels.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is Morcellement */}
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
                {get("what_title", "Qu'est-ce que le Morcellement ?")}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {get("what_text", "Le titre foncier peut subir un morcellement, qui est une opération juridique et technique consistant à diviser un terrain déjà immatriculé en plusieurs parcelles distinctes.")}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {get("what_text2", "C'est une opération qui permet de créer de nouveaux titres fonciers individuels pour chaque portion détachée, généralement dans le cadre de vente, de don, de partage ou de lotissement.")}
              </p>

              <div className="bg-green-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">{get("advantages_title", "Avantages du Morcellement")}</h4>
                <ul className="space-y-3">
                  {displayAdvantages.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {displayReasons.map((reason) => (
                <Card key={reason.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <reason.icon className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
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
              Processus
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {get("process_title", "Les Étapes du Morcellement")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {get("process_subtitle", "Une procédure technique et administrative rigoureuse pour garantir la validité des nouveaux titres.")}
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-200 -translate-x-1/2 hidden md:block" />

            {displaySteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <Card hover={false}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative z-10">
                  <span className="text-xl font-bold">{step.number}</span>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Aspects */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                {get("technical_subtitle", "Aspects Techniques")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {get("technical_title", "Notre Expertise Technique")}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Ruler className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {get("tech_1_title", "Levé Topographique")}
                  </h3>
                  <p className="text-gray-600">
                    {get("tech_1_desc", "Mesures précises par nos géomètres-topographes qualifiés.")}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {get("tech_2_title", "Bornage Officiel")}
                  </h3>
                  <p className="text-gray-600">
                    {get("tech_2_desc", "Implantation des bornes conformes aux normes en vigueur.")}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {get("tech_3_title", "Plans Cadastraux")}
                  </h3>
                  <p className="text-gray-600">
                    {get("tech_3_desc", "Établissement des plans conformes pour chaque parcelle.")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
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
            <Grid3X3 className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {get("cta_title", "Projet de Morcellement ?")}
            </h2>
            <p className="text-green-100 max-w-2xl mx-auto mb-8">
              {get("cta_text", "Que ce soit pour une vente partielle, un partage familial ou un lotissement, notre équipe de géomètres-topographes vous accompagne de A à Z.")}
            </p>
            <Link href="/contact">
              <Button size="xl" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900">
                {get("cta_button", "Demander un Devis Gratuit")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
