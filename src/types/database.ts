export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          status: 'draft' | 'processing' | 'completed' | 'error'
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          status?: 'draft' | 'processing' | 'completed' | 'error'
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          status?: 'draft' | 'processing' | 'completed' | 'error'
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      assets: {
        Row: {
          id: string
          project_id: string
          type: 'image' | 'video' | 'audio' | 'script'
          url: string
          cdn_url: string | null
          metadata: Json
          created_at: string
        }
      }
    }
  }
}
