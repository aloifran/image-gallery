export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          title: string | null;
          url: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          title?: string | null;
          url: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          title?: string | null;
          url?: string;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Image = Database["public"]["Tables"]["images"]["Row"];
