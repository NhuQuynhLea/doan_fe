"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { X, Mail, Lock } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  type: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signIn, signUp } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      if (type === "login") {
        const { errorMessage: err } = await signIn(email, password)
        if (err) {
          setErrorMessage(err)
          return
        }

        onClose()
        return
      }

      const { errorMessage: err, needsEmailConfirmation } = await signUp(email, password)
      if (err) {
        setErrorMessage(err)
        return
      }

      if (needsEmailConfirmation) {
        setErrorMessage("Please check your email to confirm your account, then come back and sign in.")
        return
      }

      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-background border border-border w-full max-w-md rounded-xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-muted/50 transition-all"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            {type === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            Join our research community to save and track your garment editing history.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
          
            <div className="space-y-2">
              <label className="text-xs font-bold font-mono uppercase text-muted-foreground tracking-wider block">
                Email Address
              </label>
              <div className="relative group">
                <Mail 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" 
                  size={16} 
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-muted/30 border border-border text-foreground rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-all placeholder:text-muted-foreground/50"
                  placeholder="researcher@institute.edu"
                />
              </div>
            </div>

    
            <div className="space-y-2">
              <label className="text-xs font-bold font-mono uppercase text-muted-foreground tracking-wider block">
                Password
              </label>
              <div className="relative group">
                <Lock 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" 
                  size={16} 
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-muted/30 border border-border text-foreground rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-all placeholder:text-muted-foreground/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed">{errorMessage}</p>
            )}


            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary w-full py-3.5 mt-2 font-bold shadow-lg shadow-accent/20 active:scale-[0.98] transition-transform"
            >
              {isSubmitting ? "Please wait..." : type === "login" ? "Sign In" : "Sign Up"}
            </button>
            
    
            <p className="text-center text-xs text-muted-foreground mt-4">
              Authorized personnel only. Data used for research purposes.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}