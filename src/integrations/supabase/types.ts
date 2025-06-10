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
      cards: {
        Row: {
          card_holder_name: string
          card_number_masked: string
          card_type: Database["public"]["Enums"]["card_type"]
          created_at: string | null
          expiry_month: number
          expiry_year: number
          id: string
          is_active: boolean | null
          is_primary: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          card_holder_name: string
          card_number_masked: string
          card_type: Database["public"]["Enums"]["card_type"]
          created_at?: string | null
          expiry_month: number
          expiry_year: number
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          card_holder_name?: string
          card_number_masked?: string
          card_type?: Database["public"]["Enums"]["card_type"]
          created_at?: string | null
          expiry_month?: number
          expiry_year?: number
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          kyc_verified: boolean | null
          phone: string
          preferred_language: string | null
          profile_image_url: string | null
          theme_preference: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name: string
          id: string
          kyc_verified?: boolean | null
          phone: string
          preferred_language?: string | null
          profile_image_url?: string | null
          theme_preference?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          kyc_verified?: boolean | null
          phone?: string
          preferred_language?: string | null
          profile_image_url?: string | null
          theme_preference?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      recipients: {
        Row: {
          account_number: string | null
          bank_name: string | null
          country: string | null
          created_at: string | null
          email: string | null
          full_name: string
          iban: string | null
          id: string
          is_favorite: boolean | null
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_number?: string | null
          bank_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          iban?: string | null
          id?: string
          is_favorite?: boolean | null
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_number?: string | null
          bank_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          iban?: string | null
          id?: string
          is_favorite?: boolean | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          bill_account_number: string | null
          bill_category: Database["public"]["Enums"]["bill_category"] | null
          card_id: string | null
          converted_amount: number | null
          converted_currency: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          exchange_rate: number | null
          fee_amount: number | null
          id: string
          qr_code_data: string | null
          recipient_id: string | null
          reference_number: string
          status: Database["public"]["Enums"]["transaction_status"] | null
          total_amount: number
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          bill_account_number?: string | null
          bill_category?: Database["public"]["Enums"]["bill_category"] | null
          card_id?: string | null
          converted_amount?: number | null
          converted_currency?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          exchange_rate?: number | null
          fee_amount?: number | null
          id?: string
          qr_code_data?: string | null
          recipient_id?: string | null
          reference_number: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          total_amount: number
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          bill_account_number?: string | null
          bill_category?: Database["public"]["Enums"]["bill_category"] | null
          card_id?: string | null
          converted_amount?: number | null
          converted_currency?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          exchange_rate?: number | null
          fee_amount?: number | null
          id?: string
          qr_code_data?: string | null
          recipient_id?: string | null
          reference_number?: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          total_amount?: number
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "recipients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
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
      bill_category:
        | "utilities"
        | "telecom"
        | "internet"
        | "insurance"
        | "government"
        | "education"
        | "other"
      card_type: "visa" | "mastercard" | "amex" | "other"
      transaction_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "cancelled"
      transaction_type:
        | "send_money"
        | "receive_money"
        | "bill_payment"
        | "qr_payment"
        | "card_transaction"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      bill_category: [
        "utilities",
        "telecom",
        "internet",
        "insurance",
        "government",
        "education",
        "other",
      ],
      card_type: ["visa", "mastercard", "amex", "other"],
      transaction_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "cancelled",
      ],
      transaction_type: [
        "send_money",
        "receive_money",
        "bill_payment",
        "qr_payment",
        "card_transaction",
      ],
    },
  },
} as const
