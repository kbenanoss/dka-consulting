"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  ArrowRightLeft,
  Grid3X3,
  Scale,
  ArrowRight,
  CheckCircle,
  Building2,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageContent } from "@/lib/supabase/content";

const services = [
  {
    icon: FileText,
    title: "Création de Titre Foncier",
    description:
      "Sécurisez votre propriété avec un titre foncier officiel. Nous vous accompagnons dans toutes les démarches administratives et techniques.",
    features: [
      "Constitution du dossier complet",
      "Levé topographique et bornage",
      "Suivi auprès des services fonciers",
      "Obtention du titre définitif",
    ],
    href: "/services/titre-foncier",
    color: "green",
  },
  {
    icon: ArrowRightLeft,
    title: "Mutation de Titre Foncier",
    description:
      "Transférez légalement la propriété d'un bien immobilier. Nous gérons l'ensemble du processus de mutation.",
    features: [
      "Vérification des documents existants",
      "Rédaction des actes de vente",
      "Enregistrement et publication",
      "Mise à jour du titre foncier",
    ],
    href: "/services/mutation",
    color: "blue",
  },
  {
    icon: Grid3X3,
    title: "Morcellement",
    description:
      "Divisez votre terrain en plusieurs lots conformément à la réglementation. Service complet de parcellement.",
    features: [
      "Étude de faisabilité",
      "Plan de morcellement",
      "Bornage des nouveaux lots",
      "Création des titres individuels",
    ],
    href: "/services/morcellement",
    color: "purple",
  },
  {
    icon: Scale,
    title: "Conseil Juridique",
    description:
      "Bénéficiez de conseils d'experts en droit foncier et immobilier. Nous vous guidons dans toutes vos décisions.",
    features: [
      "Analyse juridique des dossiers",
      "Résolution de litiges fonciers",
      "Accompagnement contractuel",
      "Veille réglementaire",
    ],
    href: "/services/conseil-juridique",
    color: "amber",
  },
];

const colorConfig = {
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    hover: "group-hover:bg-green-600",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    hover: "group-hover:bg-blue-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    hover: "group-hover:bg-purple-600",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    hover: "group-hover:bg-amber-600",
  },
};

export default function ServicesPage() {
  const { get } = usePageContent("services");

  const displayServices = services.map((svc) => {
    const keyMap: Record<string, string> = {
      "/services/titre-foncier": "titre_foncier",
      "/services/mutation": "mutation",
      "/services/morcellement": "morcellement",
      "/services/conseil-juridique": "conseil",
    };
    const key = keyMap[svc.href];
    return {
      ...svc,
      title: key ? get(`${key}_title`, svc.title) : svc.title,
      description: key ? get(`${key}_description`, svc.description) : svc.description,
    };
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              Nos Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {get("hero_title", "Solutions Complètes en Matière Foncière")}
            </h1>
            <p className="text-xl text-green-100">
              {get("hero_subtitle", "DKA-Consulting SARL vous accompagne dans toutes vos démarches foncières et immobilières avec professionnalisme et expertise.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {displayServices.map((service, index) => {
              const colors = colorConfig[service.color as keyof typeof colorConfig];
              return (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group h-full hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div
                        className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${colors.hover} group-hover:text-white`}
                      >
                        <service.icon className={`h-8 w-8 ${colors.text} group-hover:text-white transition-colors`} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className={`h-5 w-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link href={service.href}>
                        <Button className="w-full group/btn">
                          En Savoir Plus
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {get("additional_title", "Services Complémentaires")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {get("additional_subtitle", "En plus de nos services principaux, nous offrons un accompagnement complet pour tous vos projets immobiliers.")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: "Suivi de Chantier",
                description:
                  "Accompagnement et supervision de vos projets de construction.",
              },
              {
                icon: FileText,
                title: "Études Techniques",
                description:
                  "Réalisation d'études topographiques et géotechniques.",
              },
              {
                icon: Scale,
                title: "Médiation Foncière",
                description:
                  "Résolution amiable des conflits fonciers entre parties.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {get("cta_title", "Besoin d'un Service Personnalisé ?")}
            </h2>
            <p className="text-xl text-green-100 mb-8">
              {get("cta_text", "Notre équipe est à votre disposition pour étudier votre projet et vous proposer une solution adaptée à vos besoins.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  <Phone className="mr-2 h-5 w-5" />
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
