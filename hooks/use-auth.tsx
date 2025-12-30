"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import type { Session } from "@supabase/supabase-js"

interface User {
  id: string
  email: string
}

interface HistoryItem {
  id: string
  inputImage: string
  editedImage: string
  prompt: string
  timestamp: number
}

interface EditHistoryRow {
  id: string
  input_image: string
  edited_image: string
  prompt: string
  created_at: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean // Added to handle hydration
  signIn: (email: string, password: string) => Promise<{ errorMessage?: string }>
  signUp: (email: string, password: string) => Promise<{ errorMessage?: string; needsEmailConfirmation?: boolean }>
  logout: () => void
  history: HistoryItem[]
  saveToHistory: (item: Omit<HistoryItem, "id" | "timestamp">) => Promise<{ errorMessage?: string }>
  deleteHistoryItem: (id: string) => Promise<{ errorMessage?: string }>
  clearHistory: () => void // Added helper
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const syncFromSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (!isMounted) return
        if (error) throw error

        const sessionUser = data.session?.user
        if (sessionUser?.email) {
          setUser({ id: sessionUser.id, email: sessionUser.email })
        } else {
          setUser(null)
        }
      } catch (error: unknown) {
        console.error("Failed to load auth session:", error)
        setUser(null)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    syncFromSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      const sessionUser = session?.user
      if (sessionUser?.email) {
        setUser({ id: sessionUser.id, email: sessionUser.email })
      } else {
        setUser(null)
        setHistory([])
      }
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("edit_history")
          .select("id,input_image,edited_image,prompt,created_at")
          .order("created_at", { ascending: false })

        if (error) throw error

        setHistory(
          ((data ?? []) as EditHistoryRow[]).map((row) => ({
            id: row.id,
            inputImage: row.input_image,
            editedImage: row.edited_image,
            prompt: row.prompt,
            timestamp: new Date(row.created_at).getTime(),
          }))
        )
      } catch (error: unknown) {
        console.error("Failed to load edit history:", error)
        setHistory([])
      }
    }

    loadHistory()
  }, [user])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { errorMessage: error.message }
      return {}
    } catch (error: unknown) {
      return { errorMessage: error instanceof Error ? error.message : "Sign in failed" }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) return { errorMessage: error.message }

      const needsEmailConfirmation = !data.session
      return { needsEmailConfirmation }
    } catch (error: unknown) {
      return { errorMessage: error instanceof Error ? error.message : "Sign up failed" }
    }
  }

  const logout = () => {
    supabase.auth.signOut().catch((error: unknown) => {
      console.error("Sign out failed:", error)
    })
    setUser(null)
    setHistory([])
  }

  const clearHistory = () => {
    if (!user) {
      setHistory([])
      return
    }

    supabase
      .from("edit_history")
      .delete()
      .eq("user_id", user.id)
      .then((result: { error: unknown | null }) => {
        if (result.error) {
          console.error("Failed to clear edit history:", result.error)
          return
        }

        setHistory([])
      })
  }

  const deleteHistoryItem = async (id: string) => {
    if (!user) return { errorMessage: "Not authenticated" }

    try {
      const { error } = await supabase.from("edit_history").delete().eq("id", id).eq("user_id", user.id)
      if (error) return { errorMessage: error.message }

      setHistory((prev) => prev.filter((item) => item.id !== id))
      return {}
    } catch (error: unknown) {
      return { errorMessage: error instanceof Error ? error.message : "Delete failed" }
    }
  }

  const saveToHistory = async (item: Omit<HistoryItem, "id" | "timestamp">) => {
    if (!user) return { errorMessage: "Not authenticated" }

    try {
      const { data, error } = await supabase
        .from("edit_history")
        .insert({
          user_id: user.id,
          input_image: item.inputImage,
          edited_image: item.editedImage,
          prompt: item.prompt,
        })
        .select("id,input_image,edited_image,prompt,created_at")
        .single()

      if (error) return { errorMessage: error.message }

      const newItem: HistoryItem = {
        id: data.id,
        inputImage: data.input_image,
        editedImage: data.edited_image,
        prompt: data.prompt,
        timestamp: new Date(data.created_at).getTime(),
      }

      setHistory((prev) => [newItem, ...prev])
      return {}
    } catch (error) {
      return { errorMessage: error instanceof Error ? error.message : "Save failed" }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, logout, history, saveToHistory, deleteHistoryItem, clearHistory }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}