"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  CheckCircle,
  ArrowRight,
  FileText,
  Users,
  Building,
  Scale,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Vérification du Titre",
    description: "Contrôle de l'authenticité et de la validité du titre foncier existant.",
  },
  {
    number: "02",
    title: "Rédaction de l'Acte",
    description: "Préparation de l'acte de vente ou de donation par un notaire.",
  },
  {
    number: "03",
    title: "Paiement des Droits",
    description: "Règlement des droits d'enregistrement et taxes de mutation.",
  },
  {
    number: "04",
    title: "Dépôt du Dossier",
    description: "Soumission du dossier complet à la conservation foncière.",
  },
  {
    number: "05",
    title: "Mise à Jour du Livre",
    description: "Inscription du nouveau propriétaire dans les livres fonciers.",
  },
];

const typesOfMutation = [
  {
    icon: FileText,
    title: "Vente Immobilière",
    description: "Transfert de propriété suite à une transaction commerciale entre vendeur et acheteur.",
  },
  {
    icon: Users,
    title: "Donation",
    description: "Transmission gratuite de la propriété d'une personne à une autre.",
  },
  {
    icon: Scale,
    title: "Succession",
    description: "Transfert de propriété dans le cadre d'un héritage ou d'une succession.",
  },
  {
    icon: Building,
    title: "Échange",
    description: "Permutation de biens immobiliers entre deux propriétaires.",
  },
];

export default function MutationPage() {
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
              <span className="text-white">Mutation de Titre Foncier</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center">
                <ArrowRightLeft className="h-8 w-8 text-gray-900" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Mutation de Titre Foncier
              </h1>
            </div>

            <p className="text-xl text-green-100 leading-relaxed">
              La mutation du titre foncier est la procédure administrative et juridique 
              permettant le transfert de propriété d&apos;un bien immobilier d&apos;une personne 
              à une autre en mettant à jour le livre foncier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is Mutation */}
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
                Qu&apos;est-ce que la Mutation ?
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Le titre foncier (TF) créé peut subir une <strong>mutation</strong> d&apos;une 
                personne à une autre. La mutation du TF est donc la procédure administrative 
                et juridique permettant le <strong>transfert de propriété</strong> d&apos;un bien 
                immobilier (terrain ou bâtiment) d&apos;une personne à une autre.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Cette procédure implique la <strong>mise à jour du livre foncier</strong> auprès 
                de la conservation foncière pour que le nouveau propriétaire soit officiellement 
                reconnu comme tel.
              </p>

              <div className="flex items-center gap-4 p-6 bg-green-50 rounded-2xl">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClipboardCheck className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Notre Accompagnement</h4>
                  <p className="text-gray-600">
                    Nous gérons l&apos;intégralité de la procédure de mutation pour vous.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {typesOfMutation.map((type) => (
                <Card key={type.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <type.icon className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600 text-sm">{type.description}</p>
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
              Les Étapes de la Mutation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une procédure rigoureuse pour garantir la validité du transfert de propriété.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-8 mb-8 ${
                  index % 2 === 0 ? "" : "flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-xl font-bold">{step.number}</span>
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
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
                Documentation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Documents Nécessaires
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card hover={false} className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Pour le Vendeur</h3>
                  <ul className="space-y-3">
                    {[
                      "Titre foncier original",
                      "Pièce d'identité valide",
                      "Certificat de situation juridique",
                      "Quitus fiscal",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card hover={false} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Pour l&apos;Acquéreur</h3>
                  <ul className="space-y-3">
                    {[
                      "Pièce d'identité valide",
                      "Justificatif de domicile",
                      "Attestation de paiement",
                      "Acte de vente notarié",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
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
            <ArrowRightLeft className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Besoin d&apos;une Mutation de Titre ?
            </h2>
            <p className="text-green-100 max-w-2xl mx-auto mb-8">
              Que ce soit pour une vente, une donation ou une succession, nous vous 
              accompagnons dans toutes les étapes de la mutation de votre titre foncier.
            </p>
            <Link href="/contact">
              <Button size="xl" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900">
                Demander un Devis Gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
