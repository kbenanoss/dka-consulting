"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  Target,
  Heart,
  CheckCircle,
  ArrowRight,
  Building2,
  FileText,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Heart,
    title: "Intégrité",
    description: "Nous agissons avec honnêteté et transparence dans toutes nos interactions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Le travail bien fait est notre force et notre signature.",
  },
  {
    icon: Users,
    title: "Proximité",
    description: "Nous restons proches de nos clients pour mieux les servir.",
  },
  {
    icon: Target,
    title: "Engagement",
    description: "Nous nous engageons à atteindre les objectifs de nos clients.",
  },
];

const milestones = [
  {
    year: "2023",
    title: "Création de DKA-Consulting",
    description: "Fondation du cabinet par de jeunes diplômés en droit des affaires et géométrie-topographie.",
  },
  {
    year: "2023",
    title: "Enregistrement Officiel",
    description: "Inscription au RCCM et obtention du NIF, déclaration à la CNSS.",
  },
  {
    year: "2024",
    title: "Expansion des Services",
    description: "Développement de notre offre de conseil juridique et suivi de chantiers.",
  },
  {
    year: "2025",
    title: "Croissance Continue",
    description: "Renforcement de notre équipe et amélioration de nos processus.",
  },
];

const legalInfo = [
  { label: "RCCM", value: "TG-LFW-01-2023-B 12-01723" },
  { label: "NIF", value: "1001889673" },
  { label: "CNSS", value: "180768" },
  { label: "Régime Fiscal", value: "Sans TVA" },
];

export default function AProposPage() {
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
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-white/10 text-green-100 rounded-full text-sm font-medium mb-6">
              À Propos de Nous
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DKA-Consulting Sarl
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Un cabinet foncier et immobilier créé par de jeunes entrepreneurs 
              togolais déterminés à accompagner leurs concitoyens dans la sécurisation 
              de leur patrimoine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                Notre Histoire
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Née d&apos;une Vision Entrepreneuriale
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Le foncier de nos jours est devenu un <strong>casse-tête pour la population</strong> en 
                Afrique et particulièrement au Togo. Afin donc de permettre aux gens d&apos;être dans le 
                bain pour ne pas être surpris désagréablement par les innovations et les exigences 
                légales nouvelles en la matière, <strong>DKA-Consulting Sarl</strong> est créée pour 
                leur jouer ce rôle et ceci de façon claire et transparente.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Jeune entreprise, DKA-Consulting est créée en <strong>2023</strong> dans les conditions 
                légales au Togo, et plus précisément à Lomé par de <strong>jeunes diplômés en droit des 
                affaires et en géométrie-topographie</strong>. C&apos;est un cabinet qui évolue grâce à la 
                volonté et à la détermination de ses fondateurs qui veulent prendre leur destin en main 
                par l&apos;entreprenariat.
              </p>

              <blockquote className="border-l-4 border-green-600 pl-6 py-2 italic text-gray-700">
                &quot;Le travail bien fait est notre force car c&apos;est ce qui crée la confiance et une 
                relation d&apos;affaire continue avec nos clients.&quot;
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Informations Légales</h3>
                <div className="space-y-4">
                  {legalInfo.map((info) => (
                    <div
                      key={info.label}
                      className="flex justify-between items-center p-4 bg-white/10 rounded-xl"
                    >
                      <span className="text-green-100">{info.label}</span>
                      <span className="font-semibold">{info.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-yellow-500 text-gray-900 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Building2 className="h-8 w-8" />
                    <div>
                      <p className="font-semibold">Siège Social</p>
                      <p className="text-sm">Lomé, Togo</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Nos Valeurs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce Qui Nous Guide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nos valeurs fondamentales définissent notre approche et notre engagement 
              envers nos clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-xl mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Notre Parcours
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Les Étapes Clés
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-green-200 mt-4" />
                  )}
                </div>
                <Card hover={false} className="flex-1">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 text-green-100 rounded-full text-sm font-medium mb-4">
                Notre Vision
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Se Démarquer par l&apos;Excellence
              </h2>
              <p className="text-green-100 mb-8 leading-relaxed">
                La plus grande vision du cabinet c&apos;est de se faire remarquer et se 
                démarquer parmi les entreprises qui interviennent dans le même domaine 
                dans les prochaines années. Et on ne peut parvenir à cela que par du bon travail.
              </p>

              <div className="space-y-4">
                {[
                  "Devenir le cabinet de référence au Togo",
                  "Accompagner toujours plus de Togolais",
                  "Innover dans nos services",
                  "Former les nouvelles générations",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: FileText, value: "100+", label: "Dossiers Traités" },
                { icon: Users, value: "3", label: "Experts" },
                { icon: Award, value: "100%", label: "Satisfaction" },
                { icon: Shield, value: "24/7", label: "Support" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <stat.icon className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-green-200 text-sm">{stat.label}</p>
                </div>
              ))}
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
            className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prêt à Travailler avec Nous ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Contactez-nous dès aujourd&apos;hui pour discuter de votre projet foncier 
              et découvrir comment nous pouvons vous accompagner.
            </p>
            <Link href="/contact">
              <Button size="xl">
                Nous Contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
