export type DossierStatus = "en_cours" | "termine" | "en_attente";
export type UserRole = "admin" | "client" | "agent";
export type UserStatus = "actif" | "inactif";

export interface Database {
  public: {
    Tables: {
      dossiers: {
        Row: {
          id: string;
          reference: string;
          client: string;
          type: string;
          status: DossierStatus;
          description: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference: string;
          client: string;
          type: string;
          status?: DossierStatus;
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference?: string;
          client?: string;
          type?: string;
          status?: DossierStatus;
          description?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          nom: string;
          email: string;
          telephone: string;
          role: UserRole;
          status: UserStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          nom: string;
          email: string;
          telephone?: string;
          role?: UserRole;
          status?: UserStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          nom?: string;
          email?: string;
          telephone?: string;
          role?: UserRole;
          status?: UserStatus;
        };
        Relationships: [];
      };
      activities: {
        Row: {
          id: string;
          user_name: string;
          action: string;
          target: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_name: string;
          action: string;
          target: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_name?: string;
          action?: string;
          target?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Dossier = Database["public"]["Tables"]["dossiers"]["Row"];
export type DossierInsert = Database["public"]["Tables"]["dossiers"]["Insert"];
export type DossierUpdate = Database["public"]["Tables"]["dossiers"]["Update"];

export type AppUser = Database["public"]["Tables"]["users"]["Row"];
export type AppUserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type AppUserUpdate = Database["public"]["Tables"]["users"]["Update"];

export type Activity = Database["public"]["Tables"]["activities"]["Row"];
