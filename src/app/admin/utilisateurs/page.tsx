"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  X,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSupabase } from "@/lib/supabase/hooks";
import type { AppUser, UserRole, UserStatus } from "@/lib/supabase/types";

const roleConfig = {
  admin: { label: "Admin", className: "bg-purple-100 text-purple-700" },
  client: { label: "Client", className: "bg-blue-100 text-blue-700" },
  agent: { label: "Agent", className: "bg-green-100 text-green-700" },
};

const statusConfig = {
  actif: { label: "Actif", variant: "success" as const },
  inactif: { label: "Inactif", variant: "secondary" as const },
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function UtilisateursPage() {
  const supabase = useSupabase();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    role: "client" as UserRole,
  });

  const fetchUsers = useCallback(async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      const { error } = await supabase
        .from("users")
        .update({
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          role: formData.role,
        })
        .eq("id", editingUser.id);

      if (!error) {
        await fetchUsers();
      }
    } else {
      const { error } = await supabase.from("users").insert({
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        role: formData.role,
      });

      if (!error) {
        await fetchUsers();
      }
    }
    closeModal();
  };

  const openModal = (user?: AppUser) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nom: user.nom,
        email: user.email,
        telephone: user.telephone,
        role: user.role as UserRole,
      });
    } else {
      setEditingUser(null);
      setFormData({ nom: "", email: "", telephone: "", role: "client" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ nom: "", email: "", telephone: "", role: "client" });
  };

  const deleteUser = async (id: string) => {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (!error) {
      setUsers(users.filter((u) => u.id !== id));
    }
    setOpenMenu(null);
  };

  const toggleStatus = async (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const newStatus: UserStatus = user.status === "actif" ? "inactif" : "actif";
    const { error } = await supabase
      .from("users")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setUsers(
        users.map((u) =>
          u.id === id ? { ...u, status: newStatus } : u
        )
      );
    }
    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-500 mt-1">
            Gérez les utilisateurs de la plateforme
          </p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel Utilisateur
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card hover={false}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-500">Total Utilisateurs</p>
            </div>
          </CardContent>
        </Card>
        <Card hover={false}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter((u) => u.status === "actif").length}
              </p>
              <p className="text-sm text-gray-500">Utilisateurs Actifs</p>
            </div>
          </CardContent>
        </Card>
        <Card hover={false}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter((u) => u.role === "client").length}
              </p>
              <p className="text-sm text-gray-500">Clients</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Table */}
      <Card hover={false}>
        <CardHeader className="border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Liste des Utilisateurs</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-600">
                    Utilisateur
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 hidden md:table-cell">
                    Contact
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Rôle
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Statut
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-right p-4 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {user.nom
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.nom}</p>
                          <p className="text-sm text-gray-500 md:hidden">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {user.telephone}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          roleConfig[user.role].className
                        }`}
                      >
                        {roleConfig[user.role].label}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="flex items-center gap-2 group"
                        title={user.status === "actif" ? "Désactiver" : "Activer"}
                      >
                        <div className={`relative w-10 h-5 rounded-full transition-colors ${user.status === "actif" ? "bg-green-500" : "bg-gray-300"}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${user.status === "actif" ? "translate-x-5" : "translate-x-0"}`} />
                        </div>
                        <span className={`text-xs font-medium ${user.status === "actif" ? "text-green-600" : "text-gray-500"}`}>
                          {statusConfig[user.status].label}
                        </span>
                      </button>
                    </td>
                    <td className="p-4 text-gray-500 text-sm hidden lg:table-cell">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="p-4 text-right">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === user.id ? null : user.id)
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                        <AnimatePresence>
                          {openMenu === user.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10"
                            >
                              <button
                                onClick={() => {
                                  openModal(user);
                                  setOpenMenu(null);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="h-4 w-4" />
                                Modifier
                              </button>
                              <button
                                onClick={() => toggleStatus(user.id)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <CheckCircle className="h-4 w-4" />
                                {user.status === "actif"
                                  ? "Désactiver"
                                  : "Activer"}
                              </button>
                              <hr className="my-1 border-gray-100" />
                              <button
                                onClick={() => deleteUser(user.id)}
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

          {!loading && filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun utilisateur trouvé</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
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
                  {editingUser ? "Modifier l'Utilisateur" : "Nouvel Utilisateur"}
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
                    Nom Complet *
                  </label>
                  <Input
                    required
                    placeholder="Ex: Kofi Mensah"
                    value={formData.nom}
                    onChange={(e) =>
                      setFormData({ ...formData, nom: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="email@exemple.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <Input
                    placeholder="+228 XX XX XX XX"
                    value={formData.telephone}
                    onChange={(e) =>
                      setFormData({ ...formData, telephone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôle
                  </label>
                  <select
                    className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as "admin" | "client" | "agent",
                      })
                    }
                  >
                    <option value="client">Client</option>
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                  </select>
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
                    {editingUser ? "Enregistrer" : "Créer"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
