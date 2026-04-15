"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Building2,
  Save,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const tabs = [
  { id: "profil", label: "Profil", icon: User },
  { id: "entreprise", label: "Entreprise", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "securite", label: "Sécurité", icon: Shield },
];

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState("profil");
  const [isSaved, setIsSaved] = useState(false);
  
  const [profileData, setProfileData] = useState({
    nom: "Admin DKA",
    email: "admin@dka-consulting.tg",
    telephone: "+228 90 00 00 00",
    poste: "Administrateur",
  });

  const [companyData, setCompanyData] = useState({
    nom: "DKA-Consulting SARL",
    rccm: "TG-LFW-01-2023-B 12-01723",
    nif: "1001889673",
    cnss: "180768",
    adresse: "Lomé, Togo",
    telephone: "+228 XX XX XX XX",
    email: "contact@dka-consulting.tg",
    description: "Cabinet spécialisé dans le domaine foncier et immobilier au Togo.",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    nouveauDossier: true,
    miseAJour: true,
    rappels: false,
  });

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-500 mt-1">
          Gérez les paramètres de votre compte et de l&apos;entreprise
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card hover={false} className="lg:col-span-1 h-fit">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Success Message */}
          {isSaved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">
                Paramètres enregistrés avec succès !
              </span>
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === "profil" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card hover={false}>
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-green-600" />
                    Informations du Profil
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      AD
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Photo de Profil
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        JPG, PNG ou GIF. Max 2MB.
                      </p>
                      <Button variant="outline" size="sm">
                        Changer la Photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom Complet
                      </label>
                      <Input
                        value={profileData.nom}
                        onChange={(e) =>
                          setProfileData({ ...profileData, nom: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <Input
                        value={profileData.telephone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            telephone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Poste
                      </label>
                      <Input
                        value={profileData.poste}
                        onChange={(e) =>
                          setProfileData({ ...profileData, poste: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Company Tab */}
          {activeTab === "entreprise" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card hover={false}>
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-green-600" />
                    Informations de l&apos;Entreprise
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l&apos;Entreprise
                      </label>
                      <Input
                        value={companyData.nom}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, nom: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        RCCM
                      </label>
                      <Input
                        value={companyData.rccm}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, rccm: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NIF
                      </label>
                      <Input
                        value={companyData.nif}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, nif: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNSS
                      </label>
                      <Input
                        value={companyData.cnss}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, cnss: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse
                      </label>
                      <Input
                        value={companyData.adresse}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            adresse: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <Input
                        value={companyData.telephone}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            telephone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={companyData.email}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <Textarea
                        rows={3}
                        value={companyData.description}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card hover={false}>
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-green-600" />
                    Préférences de Notification
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    {[
                      {
                        key: "email",
                        label: "Notifications par Email",
                        description: "Recevoir des notifications par email",
                      },
                      {
                        key: "nouveauDossier",
                        label: "Nouveaux Dossiers",
                        description:
                          "Être notifié lors de la création d'un nouveau dossier",
                      },
                      {
                        key: "miseAJour",
                        label: "Mises à Jour de Dossiers",
                        description:
                          "Être notifié lors de la mise à jour d'un dossier",
                      },
                      {
                        key: "rappels",
                        label: "Rappels",
                        description: "Recevoir des rappels pour les échéances",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={
                              notifications[
                                item.key as keyof typeof notifications
                              ]
                            }
                            onChange={(e) =>
                              setNotifications({
                                ...notifications,
                                [item.key]: e.target.checked,
                              })
                            }
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === "securite" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card hover={false}>
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Sécurité du Compte
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      Changer le Mot de Passe
                    </h3>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de Passe Actuel
                        </label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nouveau Mot de Passe
                        </label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le Nouveau Mot de Passe
                        </label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Sessions Actives
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            Session Actuelle
                          </p>
                          <p className="text-sm text-gray-500">
                            Lomé, Togo • Dernière activité: maintenant
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Actif
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Mettre à Jour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
