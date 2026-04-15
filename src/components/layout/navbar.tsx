"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Accueil" },
  {
    label: "Services",
    children: [
      { href: "/services/titre-foncier", label: "Création de Titre Foncier" },
      { href: "/services/mutation", label: "Mutation de Titre Foncier" },
      { href: "/services/morcellement", label: "Morcellement" },
      { href: "/services/conseil-juridique", label: "Conseil Juridique" },
    ],
  },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-700 text-white py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Lomé, Togo
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +228 XX XX XX XX
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              contact@dka-consulting.tg
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>RCCM: TG-LFW-01-2023-B 12-01723</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-xl">DK</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-xl text-gray-900">DKA-Consulting SARL</h1>
                <p className="text-xs text-gray-500">Foncier & Immobilier</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium">
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 mt-1"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Administration
                </Button>
              </Link>
              <Link href="/contact">
                <Button>Demander un Devis</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.label} className="space-y-1">
                      <span className="block px-4 py-2 font-medium text-gray-900">
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-8 py-2 text-gray-600 hover:text-green-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <div className="pt-4 space-y-2">
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Administration
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Demander un Devis</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
