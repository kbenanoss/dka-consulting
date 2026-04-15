"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  X,
  FileText,
  User,
  Calendar,
  Filter,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSupabase } from "@/lib/supabase/hooks";
import type { Dossier, DossierStatus } from "@/lib/supabase/types";

const typeOptions = [
  "Création TF",
  "Mutation",
  "Morcellement",
  "Conseil Juridique",
  "Suivi Chantier",
];

const statusConfig = {
  en_cours: { label: "En Cours", variant: "default" as const, color: "bg-blue-500" },
  termine: { label: "Terminé", variant: "success" as const, color: "bg-green-500" },
  en_attente: { label: "En Attente", variant: "warning" as const, color: "bg-yellow-500" },
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function DossiersPage() {
  const supabase = useSupabase();
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingDossier, setEditingDossier] = useState<Dossier | null>(null);
  const [viewingDossier, setViewingDossier] = useState<Dossier | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    client: "",
    type: "Création TF",
    description: "",
    status: "en_attente" as DossierStatus,
  });

  const fetchDossiers = useCallback(async () => {
    const { data, error } = await supabase
      .from("dossiers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setDossiers(data);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchDossiers();
  }, [fetchDossiers]);

  const filteredDossiers = dossiers.filter((dossier) => {
    const matchesSearch =
      dossier.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dossier.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || dossier.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const generateReference = () => {
    const year = new Date().getFullYear();
    const num = String(dossiers.length + 1).padStart(3, "0");
    return `DKA-${year}-${num}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingDossier) {
      const { error } = await supabase
        .from("dossiers")
        .update({
          client: formData.client,
          type: formData.type,
          description: formData.description,
          status: formData.status,
        })
        .eq("id", editingDossier.id);

      if (!error) {
        await fetchDossiers();
      }
    } else {
      const { error } = await supabase.from("dossiers").insert({
        reference: generateReference(),
        client: formData.client,
        type: formData.type,
        description: formData.description,
        status: formData.status,
      });

      if (!error) {
        await fetchDossiers();
      }
    }
    closeModal();
  };

  const openModal = (dossier?: Dossier) => {
    if (dossier) {
      setEditingDossier(dossier);
      setFormData({
        client: dossier.client,
        type: dossier.type,
        description: dossier.description,
        status: dossier.status,
      });
    } else {
      setEditingDossier(null);
      setFormData({
        client: "",
        type: "Création TF",
        description: "",
        status: "en_attente",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDossier(null);
  };

  const deleteDossier = async (id: string) => {
    const { error } = await supabase.from("dossiers").delete().eq("id", id);
    if (!error) {
      setDossiers(dossiers.filter((d) => d.id !== id));
    }
    setOpenMenu(null);
  };

  const viewDossier = (dossier: Dossier) => {
    setViewingDossier(dossier);
    setIsViewModalOpen(true);
    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dossiers</h1>
          <p className="text-gray-500 mt-1">
            Gérez les dossiers clients de DKA-Consulting SARL
          </p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Dossier
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => (
          <Card key={key} hover={false}>
            <CardContent className="p-4 flex items-center gap-4">
              <div
                className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center`}
              >
                <FolderOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {dossiers.filter((d) => d.status === key).length}
                </p>
                <p className="text-sm text-gray-500">{config.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Table */}
      <Card hover={false}>
        <CardHeader className="border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Liste des Dossiers</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-10 w-full sm:w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm w-full sm:w-40"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="en_cours">En Cours</option>
                  <option value="termine">Terminé</option>
                  <option value="en_attente">En Attente</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-600">
                    Référence
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Client
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 hidden md:table-cell">
                    Type
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Statut
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 hidden lg:table-cell">
                    Mise à Jour
                  </th>
                  <th className="text-right p-4 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDossiers.map((dossier) => (
                  <motion.tr
                    key={dossier.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {dossier.reference}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{dossier.client}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 hidden md:table-cell">
                      {dossier.type}
                    </td>
                    <td className="p-4">
                      <Badge variant={statusConfig[dossier.status].variant}>
                        {statusConfig[dossier.status].label}
                      </Badge>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="h-4 w-4" />
                        {formatDate(dossier.updated_at)}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu === dossier.id ? null : dossier.id
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                        <AnimatePresence>
                          {openMenu === dossier.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10"
                            >
                              <button
                                onClick={() => viewDossier(dossier)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Eye className="h-4 w-4" />
                                Voir
                              </button>
                              <button
                                onClick={() => {
                                  openModal(dossier);
                                  setOpenMenu(null);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="h-4 w-4" />
                                Modifier
                              </button>
                              <hr className="my-1 border-gray-100" />
                              <button
                                onClick={() => deleteDossier(dossier.id)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 className="h-4 w-4" />
                                Supprimer
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {loading && (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 text-gray-300 mx-auto mb-4 animate-spin" />
              <p className="text-gray-500">Chargement...</p>
            </div>
          )}

          {!loading && filteredDossiers.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun dossier trouvé</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingDossier ? "Modifier le Dossier" : "Nouveau Dossier"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client *
                  </label>
                  <Input
                    required
                    placeholder="Nom du client"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de Dossier
                  </label>
                  <select
                    className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    {typeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as
                          | "en_cours"
                          | "termine"
                          | "en_attente",
                      })
                    }
                  >
                    <option value="en_attente">En Attente</option>
                    <option value="en_cours">En Cours</option>
                    <option value="termine">Terminé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Détails du dossier..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={closeModal}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingDossier ? "Enregistrer" : "Créer"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && viewingDossier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setIsViewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {viewingDossier.reference}
                    </h2>
                    <Badge variant={statusConfig[viewingDossier.status].variant}>
                      {statusConfig[viewingDossier.status].label}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="font-medium text-gray-900">
                      {viewingDossier.client}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium text-gray-900">
                      {viewingDossier.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date de Création</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(viewingDossier.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dernière Mise à Jour</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(viewingDossier.updated_at)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">
                    {viewingDossier.description || "Aucune description"}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsViewModalOpen(false)}
                  >
                    Fermer
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setIsViewModalOpen(false);
                      openModal(viewingDossier);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
