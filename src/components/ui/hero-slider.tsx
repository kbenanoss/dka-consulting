"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  ArrowRightLeft,
  Scale,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideText {
  badge: string;
  title: string;
  highlight: string;
  titleEnd: string;
  description: string;
  cta: string;
  ctaLink: string;
  secondaryCta: string;
  secondaryLink: string;
}

export interface HeroSliderProps {
  dynamicSlides?: SlideText[];
}

const defaultSlides: SlideText[] = [
  {
    badge: "Cabinet Foncier & Immobilier au Togo",
    title: "Sécurisez Votre",
    highlight: "Patrimoine",
    titleEnd: "Foncier",
    description: "DKA-Consulting SARL vous accompagne dans toutes vos démarches foncières au Togo : création, mutation et morcellement de titres fonciers avec expertise et transparence.",
    cta: "Demander un Devis Gratuit",
    ctaLink: "/contact",
    secondaryCta: "Découvrir nos Services",
    secondaryLink: "/services/titre-foncier",
  },
  {
    badge: "Service Phare",
    title: "Création de",
    highlight: "Titre Foncier",
    titleEnd: "",
    description: "Procédure complète d'immatriculation foncière auprès du guichet unique. Obtenez votre titre définitif et protégez votre terrain contre toute contestation.",
    cta: "Démarrer la Procédure",
    ctaLink: "/contact",
    secondaryCta: "En Savoir Plus",
    secondaryLink: "/services/titre-foncier",
  },
  {
    badge: "Transfert de Propriété",
    title: "Mutation &",
    highlight: "Morcellement",
    titleEnd: "Simplifiés",
    description: "Transférez ou divisez vos propriétés en toute légalité. Notre équipe d'experts gère l'ensemble des formalités administratives et juridiques pour vous.",
    cta: "Nous Consulter",
    ctaLink: "/contact",
    secondaryCta: "Voir les Détails",
    secondaryLink: "/services/mutation",
  },
];

const slideVisuals = [
  {
    gradient: "from-green-900 via-green-800 to-green-700",
    image: (
      <div className="grid grid-cols-2 gap-4">
        {[
          { value: "2023", label: "Année de création" },
          { value: "3", label: "Experts dédiés" },
          { value: "100%", label: "Satisfaction client" },
          { value: "24/7", label: "Support disponible" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
            <p className="text-3xl font-bold text-yellow-400">{stat.value}</p>
            <p className="text-green-100 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    gradient: "from-emerald-900 via-emerald-800 to-teal-700",
    image: (
      <div className="space-y-4">
        {[
          { step: "01", text: "Consultation & analyse du dossier" },
          { step: "02", text: "Constitution du dossier administratif" },
          { step: "03", text: "Dépôt au guichet unique foncier" },
          { step: "04", text: "Obtention du titre foncier" },
        ].map((item) => (
          <div key={item.step} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <span className="text-2xl font-bold text-amber-400 w-12">{item.step}</span>
            <p className="text-white/90">{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    gradient: "from-green-950 via-green-900 to-emerald-800",
    image: (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <ArrowRightLeft className="h-6 w-6 text-lime-400" />
            <h4 className="text-white font-semibold text-lg">Mutation</h4>
          </div>
          <p className="text-white/70 text-sm">Transfert officiel de propriété avec mise à jour du livre foncier</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-6 w-6 text-lime-400" />
            <h4 className="text-white font-semibold text-lg">Conseil Juridique</h4>
          </div>
          <p className="text-white/70 text-sm">Accompagnement expert pour litiges et questions foncières</p>
        </div>
      </div>
    ),
  },
];

export default function HeroSlider({ dynamicSlides }: HeroSliderProps) {
  const slides = dynamicSlides && dynamicSlides.length > 0 ? dynamicSlides : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const visual = slideVisuals[current % slideVisuals.length];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section
      className={`relative min-h-[90vh] flex items-center bg-gradient-to-br ${visual.gradient} overflow-hidden transition-colors duration-1000`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated Background Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"
      />

      {/* Slide Content */}
      <div className="container mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Text */}
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-sm">{slide.badge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                {slide.title}{" "}
                <span className="text-yellow-400">{slide.highlight}</span>{" "}
                {slide.titleEnd}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href={slide.ctaLink}>
                  <Button
                    size="xl"
                    className="bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={slide.secondaryLink}>
                  <Button
                    size="xl"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-green-800"
                  >
                    {slide.secondaryCta}
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                {visual.image}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
        aria-label="Slide suivant"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`relative h-3 rounded-full transition-all duration-500 ${
              i === current ? "w-10 bg-yellow-400" : "w-3 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Aller au slide ${i + 1}`}
          >
            {i === current && (
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-400"
                layoutId="activeDot"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-20 left-0 right-0 z-20 h-0.5 bg-white/10">
        <motion.div
          key={current}
          className="h-full bg-yellow-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
        />
      </div>

    </section>
  );
}
