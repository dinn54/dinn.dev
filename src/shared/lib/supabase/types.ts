export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      dinn_post_tags: {
        Row: {
          count: number | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          count?: number | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          count?: number | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      dinn_post_tags_connect: {
        Row: {
          created_at: string | null
          post_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string | null
          post_id: string
          tag_id: string
        }
        Update: {
          created_at?: string | null
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dinn_post_tags_connect_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "dinn_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dinn_post_tags_connect_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "dinn_post_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      dinn_posts: {
        Row: {
          author_avatar: string | null
          author_name: string | null
          author_role: string | null
          content: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_visible: boolean | null
          like_count: number
          published_at: string | null
          read_time: number
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          author_avatar?: string | null
          author_name?: string | null
          author_role?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean | null
          like_count?: number
          published_at?: string | null
          read_time?: number
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          author_avatar?: string | null
          author_name?: string | null
          author_role?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean | null
          like_count?: number
          published_at?: string | null
          read_time?: number
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_view_count: { Args: { post_id: string }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type DinnPost = Tables<"dinn_posts">
export type DinnPostTag = Tables<"dinn_post_tags">
