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
      m_menu_items: {
        Row: {
          created_at: string
          menu_item_id: string
          menu_item_name: string
          menu_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          menu_item_id?: string
          menu_item_name: string
          menu_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          menu_item_id?: string
          menu_item_name?: string
          menu_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      m_store_tables: {
        Row: {
          created_at: string
          store_id: string
          table_capacity: number
          table_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          store_id: string
          table_capacity: number
          table_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          store_id?: string
          table_capacity?: number
          table_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_store_tables_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "m_stores"
            referencedColumns: ["store_id"]
          },
        ]
      }
      m_stores: {
        Row: {
          created_at: string
          store_id: string
          store_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          store_id?: string
          store_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          store_id?: string
          store_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      t_customers: {
        Row: {
          created_at: string
          customer_id: string
          customer_number: number
          payment_status: string
          store_id: string
          table_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          customer_id?: string
          customer_number: number
          payment_status: string
          store_id: string
          table_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          customer_number?: number
          payment_status?: string
          store_id?: string
          table_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_customers_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "m_stores"
            referencedColumns: ["store_id"]
          },
          {
            foreignKeyName: "t_customers_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "m_store_tables"
            referencedColumns: ["table_id"]
          },
        ]
      }
      t_orders: {
        Row: {
          created_at: string
          customer_id: string
          menu_item_id: string
          menu_item_number: number
          order_id: string
          order_status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          menu_item_id: string
          menu_item_number: number
          order_id?: string
          order_status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          menu_item_id?: string
          menu_item_number?: number
          order_id?: string
          order_status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "t_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "t_customers"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "t_orders_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "m_menu_items"
            referencedColumns: ["menu_item_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
