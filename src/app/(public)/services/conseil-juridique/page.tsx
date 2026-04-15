"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scale,
  CheckCircle,
  ArrowRight,
  Shield,
  FileSearch,
  Users,
  Briefcase,
  HardHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageContent } from "@/lib/supabase/content";

const services = [
  {
    icon: FileSearch,
    title: "Audit Foncier",
    description: "Vérification complète de la situation juridique de votre bien immobilier.",
  },
  {
    icon: Shield,
    title: "Résolution de Litiges",
    description: "Accompagnement dans la résolution des conflits fonciers et immobiliers.",
  },
  {
    icon: Users,
    title: "Médiation",
    description: "Facilitation des négociations entre parties dans les transactions immobilières.",
  },
  {
    icon: Briefcase,
    title: "Conseil en Transactions",
    description: "Accompagnement juridique pour les ventes, achats et locations.",
  },
  {
    icon: HardHat,
    title: "Suivi de Chantiers",
    description: "Supervision et gestion de vos projets de construction.",
  },
  {
    icon: Scale,
    title: "Expertise Juridique",
    description: "Consultation juridique pour toutes questions liées au foncier.",
  },
];

const expertise = [
  "Droit foncier togolais",
  "Droit immobilier",
  "Droit des contrats",
  "Droit de la construction",
  "Droit des successions",
  "Droit des sociétés",
];

export default function ConseilJuridiquePage() {
  const { get } = usePageContent("service-conseil");

  const dynServices = get<Array<{title: string; description: string}>>("services_list", []);
  const displayServices = services.map((s, i) => ({
    ...s,
    title: dynServices[i]?.title ?? s.title,
    description: dynServices[i]?.description ?? s.description,
  }));

  const displayExpertise = get<string[]>("expertise_list", expertise);
  const displayWhyChoose = get<string[]>("why_choose_list", [
    "Expertise reconnue en droit foncier togolais",
    "Accompagnement personnalis\u00e9",
    "Transparence dans nos d\u00e9marches",
    "Tarifs comp\u00e9titifs",
    "Suivi rigoureux de vos dossiers",
    "Disponibilit\u00e9 et r\u00e9activit\u00e9",
  ]);
  const displayChantierItems = get<Array<{title: string; desc: string}>>("chantier_items", [
    { title: "Supervision", desc: "Contr\u00f4le r\u00e9gulier de l'avancement des travaux" },
    { title: "Coordination", desc: "Gestion des intervenants sur le chantier" },
    { title: "Reporting", desc: "Rapports d\u00e9taill\u00e9s sur l'\u00e9tat du projet" },
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
              <span className="text-white">{get("breadcrumb", "Conseil Juridique")}</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center">
                <Scale className="h-8 w-8 text-gray-900" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {get("hero_title", "Conseil Juridique")}
              </h1>
            </div>

            <p className="text-xl text-green-100 leading-relaxed">
              {get("hero_description", "Outre les activités foncières et immobilières, DKA-Consulting SARL traite d'autres questions juridiques. Notre équipe de juristes vous accompagne dans tous vos besoins légaux liés au foncier.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Nos Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {get("services_title", "Un Accompagnement Juridique Complet")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {get("services_subtitle", "Bénéficiez de l'expertise de nos juristes spécialisés en droit foncier et immobilier pour tous vos projets.")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                      <service.icon className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-xl mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                Notre Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {get("expertise_title", "Des Juristes Spécialisés à Votre Service")}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {get("expertise_text", "Notre équipe est composée de diplômés en droit des affaires, formés pour répondre à toutes vos questions juridiques liées au foncier et à l'immobilier au Togo.")}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {displayExpertise.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
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
                  <h3 className="text-2xl font-bold mb-6">
                    {get("why_choose_title", "Pourquoi Nous Choisir ?")}
                  </h3>
                  <ul className="space-y-4">
                    {displayWhyChoose.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-gray-900" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Suivi de Chantiers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-yellow-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <HardHat className="h-10 w-10 text-yellow-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {get("chantier_title", "Suivi de Chantiers")}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              {get("chantier_text", "En plus de nos services juridiques, DKA-Consulting SARL propose un service de suivi de chantiers pour ceux qui le sollicitent. Nos experts assurent la supervision et la gestion de vos projets de construction.")}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {displayChantierItems.map((item) => (
                <Card key={item.title} hover={false} className="border-t-4 border-t-yellow-500">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
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
            <Scale className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {get("cta_title", "Besoin d'un Conseil Juridique ?")}
            </h2>
            <p className="text-green-100 max-w-2xl mx-auto mb-8">
              {get("cta_text", "Notre équipe de juristes est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos démarches.")}
            </p>
            <Link href="/contact">
              <Button size="xl" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900">
                {get("cta_button", "Prendre Rendez-vous")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
