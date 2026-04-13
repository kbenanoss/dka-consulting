"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowRightLeft,
  Grid3X3,
  Scale,
  HardHat,
  Shield,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Building2,
  Landmark,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: FileText,
    title: "Création de Titre Foncier",
    description:
      "Procédure complète d'immatriculation foncière auprès du guichet unique foncier pour obtenir votre titre définitif.",
    href: "/services/titre-foncier",
  },
  {
    icon: ArrowRightLeft,
    title: "Mutation de Titre Foncier",
    description:
      "Transfert de propriété d'un bien immobilier d'une personne à une autre avec mise à jour du livre foncier.",
    href: "/services/mutation",
  },
  {
    icon: Grid3X3,
    title: "Morcellement",
    description:
      "Division d'un terrain immatriculé en plusieurs parcelles distinctes pour créer de nouveaux titres individuels.",
    href: "/services/morcellement",
  },
  {
    icon: Scale,
    title: "Conseil Juridique",
    description:
      "Accompagnement juridique expert pour toutes vos questions liées au foncier et à l'immobilier.",
    href: "/services/conseil-juridique",
  },
];

const advantages = [
  {
    icon: Shield,
    title: "Sécurité Juridique",
    description: "Protection contre la spoliation, les doubles ventes et les litiges fonciers.",
  },
  {
    icon: Landmark,
    title: "Accès au Crédit",
    description: "Un terrain titré est une garantie solide pour obtenir des prêts bancaires.",
  },
  {
    icon: TrendingUp,
    title: "Valorisation du Patrimoine",
    description: "Un bien avec titre foncier a une valeur supérieure et attire les investisseurs.",
  },
  {
    icon: CheckCircle,
    title: "Tranquillité d'Esprit",
    description: "Élimination des risques de contestation par des tiers.",
  },
];

const stats = [
  { value: "2023", label: "Année de création" },
  { value: "3", label: "Experts dédiés" },
  { value: "100%", label: "Satisfaction client" },
  { value: "24/7", label: "Support disponible" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Animated Shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-sm">Cabinet Foncier & Immobilier au Togo</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Sécurisez Votre{" "}
                <span className="text-yellow-400">Patrimoine</span> Foncier
              </h1>

              <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed">
                DKA-Consulting vous accompagne dans toutes vos démarches foncières au Togo : 
                création, mutation et morcellement de titres fonciers avec expertise et transparence.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="xl" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900">
                    Demander un Devis Gratuit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services/titre-foncier">
                  <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-green-800">
                    Découvrir nos Services
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold">Clients Satisfaits</p>
                  <p className="text-green-200 text-sm">Rejoignez-les dès aujourd&apos;hui</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-white/10 rounded-2xl p-6 text-center"
                      >
                        <p className="text-3xl font-bold text-yellow-400">{stat.value}</p>
                        <p className="text-green-100 text-sm mt-1">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-white/10 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-gray-900" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">RCCM Enregistré</p>
                        <p className="text-green-200 text-sm">TG-LFW-01-2023-B 12-01723</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-yellow-500 text-gray-900 rounded-2xl p-4 shadow-xl"
                >
                  <Award className="h-8 w-8" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
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
              Des Solutions Complètes pour Votre Foncier
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous vous accompagnons dans toutes vos démarches foncières avec expertise,
              transparence et professionnalisme.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={itemVariants}>
                <Link href={service.href}>
                  <Card className="h-full group cursor-pointer">
                    <CardHeader>
                      <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors duration-300">
                        <service.icon className="h-7 w-7 text-green-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <CardTitle className="group-hover:text-green-600 transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{service.description}</p>
                      <div className="mt-4 flex items-center text-green-600 font-medium">
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                À Propos de Nous
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Votre Partenaire de Confiance en Matière Foncière
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Créée en 2023 à Lomé par de jeunes diplômés en droit des affaires et en 
                géométrie-topographie, <strong>DKA-Consulting Sarl</strong> est un cabinet qui 
                évolue grâce à la volonté et à la détermination de ses fondateurs.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Le foncier étant devenu un véritable casse-tête pour la population en Afrique 
                et particulièrement au Togo, nous avons décidé de permettre aux gens d&apos;être 
                dans le bain pour ne pas être surpris désagréablement par les innovations et 
                les exigences légales nouvelles en la matière.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Légalement Enregistré</h4>
                    <p className="text-sm text-gray-500">RCCM & NIF valides</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Équipe Qualifiée</h4>
                    <p className="text-sm text-gray-500">Experts en droit & topographie</p>
                  </div>
                </div>
              </div>

              <Link href="/a-propos">
                <Button size="lg">
                  En Savoir Plus sur Nous
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white">
                <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                  &quot;Le travail bien fait est notre force car c&apos;est ce qui crée la confiance 
                  et une relation d&apos;affaire continue avec nos clients.&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">DK</span>
                  </div>
                  <div>
                    <p className="font-semibold">DKA-Consulting</p>
                    <p className="text-green-200">Fondateurs</p>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <HardHat className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Suivi de Chantiers</p>
                    <p className="text-sm text-gray-500">Service inclus</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-white/10 text-green-100 rounded-full text-sm font-medium mb-4">
              Pourquoi Nous Choisir
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Les Avantages d&apos;un Titre Foncier
            </h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              Transformez un droit coutumier ou précaire en un droit de propriété 
              formel et protégé par l&apos;État.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {advantages.map((advantage) => (
              <motion.div
                key={advantage.title}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-colors"
              >
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center mb-4">
                  <advantage.icon className="h-7 w-7 text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                <p className="text-green-100">{advantage.description}</p>
              </motion.div>
            ))}
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
            className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à Sécuriser Votre Propriété ?
              </h2>
              <p className="text-green-100 max-w-2xl mx-auto mb-8 text-lg">
                Contactez-nous dès aujourd&apos;hui pour une consultation gratuite et 
                découvrez comment nous pouvons vous aider à protéger votre patrimoine foncier.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="xl" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900">
                    Contactez-nous
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services/titre-foncier">
                  <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700">
                    Voir nos Services
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
