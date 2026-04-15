"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FolderOpen,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  CheckCircle,
  AlertCircle,
  Calendar,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSupabase } from "@/lib/supabase/hooks";
import type { Dossier, Activity } from "@/lib/supabase/types";

const statusConfig = {
  en_cours: { label: "En Cours", variant: "default" as const },
  termine: { label: "Terminé", variant: "success" as const },
  en_attente: { label: "En Attente", variant: "warning" as const },
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const timeAgo = (dateStr: string) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours} heures`;
  if (diffDays === 1) return "Hier";
  return `Il y a ${diffDays} jours`;
};

export default function AdminDashboard() {
  const supabase = useSupabase();
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [dossiersEnCours, setDossiersEnCours] = useState(0);
  const [dossiersTermines, setDossiersTermines] = useState(0);
  const [dossiersEnAttente, setDossiersEnAttente] = useState(0);
  const [recentDossiers, setRecentDossiers] = useState<Dossier[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchDashboardData = useCallback(async () => {
    const [usersRes, dossiersRes, activitiesRes] = await Promise.all([
      supabase.from("users").select("id", { count: "exact", head: true }),
      supabase.from("dossiers").select("*").order("created_at", { ascending: false }),
      supabase.from("activities").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    if (usersRes.count !== null) setTotalUsers(usersRes.count);
    if (dossiersRes.data) {
      setRecentDossiers(dossiersRes.data.slice(0, 5));
      setDossiersEnCours(dossiersRes.data.filter((d) => d.status === "en_cours").length);
      setDossiersTermines(dossiersRes.data.filter((d) => d.status === "termine").length);
      setDossiersEnAttente(dossiersRes.data.filter((d) => d.status === "en_attente").length);
    }
    if (activitiesRes.data) setActivities(activitiesRes.data);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const stats = [
    {
      title: "Total Utilisateurs",
      value: String(totalUsers),
      change: "",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Dossiers Actifs",
      value: String(dossiersEnCours),
      change: "",
      trend: "up",
      icon: FolderOpen,
      color: "bg-green-500",
    },
    {
      title: "Dossiers Terminés",
      value: String(dossiersTermines),
      change: "",
      trend: "up",
      icon: CheckCircle,
      color: "bg-emerald-500",
    },
    {
      title: "En Attente",
      value: String(dossiersEnAttente),
      change: "",
      trend: "down",
      icon: Clock,
      color: "bg-yellow-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord</h1>
        <p className="text-gray-500 mt-1">
          Bienvenue sur votre espace d&apos;administration DKA-Consulting SARL
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover={false}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-400">vs mois dernier</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Dossiers */}
        <div className="lg:col-span-2">
          <Card hover={false}>
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Dossiers Récents
                </CardTitle>
                <a
                  href="/admin/dossiers"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Voir tout
                </a>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {recentDossiers.map((dossier) => (
                  <motion.div
                    key={dossier.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FolderOpen className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {dossier.reference}
                        </p>
                        <p className="text-sm text-gray-500">
                          {dossier.client} • {dossier.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={statusConfig[dossier.status as keyof typeof statusConfig].variant}>
                        {statusConfig[dossier.status as keyof typeof statusConfig].label}
                      </Badge>
                      <span className="text-sm text-gray-400 hidden sm:block">
                        {formatDate(dossier.created_at)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card hover={false}>
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4"
                  >
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{activity.user_name}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-green-600">
                        {activity.target}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{timeAgo(activity.created_at)}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card hover={false}>
        <CardHeader className="border-b border-gray-100">
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Nouvel Utilisateur", href: "/admin/utilisateurs" },
              { icon: FolderOpen, label: "Nouveau Dossier", href: "/admin/dossiers" },
              { icon: Calendar, label: "Planifier RDV", href: "#" },
              { icon: AlertCircle, label: "Voir Alertes", href: "#" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-green-600 transition-colors group"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-green-100">
                  <action.icon className="h-5 w-5 text-gray-600 group-hover:text-green-600" />
                </div>
                <span className="font-medium">{action.label}</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
