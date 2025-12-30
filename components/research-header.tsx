"use client"
import { FileText, Github, Database, LogIn, LogOut, UserPlus, History, User } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import { AuthModal } from "./auth-model"
import { HistoryView } from "./history-view"

export function ResearchHeader() {
  const { user, logout } = useAuth()
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  return (
    <header className="py-24 px-6 max-w-5xl mx-auto text-center border-b border-border relative">
      
      
      <div className="absolute top-8 left-6 hidden sm:block">
        {user && (
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 bg-background border border-accent/40 text-accent rounded-xl shadow-[0_0_15px_rgba(var(--accent-rgb),0.05)] hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)] hover:bg-accent/[0.03] transition-all group active:scale-95"
          >
            <div className="relative">
              <History size={18} className="group-hover:rotate-[-30deg] transition-transform duration-300" />
          
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border-2 border-background animate-pulse" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">My Edits</span>
          </button>
        )}
      </div>

      
      <div className="absolute top-8 right-6 flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-2">
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/40 dark:bg-accent/5 border border-border rounded-full">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <User size={12} className="text-accent" />
              </div>
              <span className="text-[11px] font-bold text-foreground/80 truncate max-w-[100px]">
                {user.email.split('@')[0]}
              </span>
            </div>

            <button 
              onClick={logout} 
              className="p-2 text-muted-foreground hover:text-red-500 transition-colors group/logout" 
              title="Sign Out"
            >
              <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalType("login")}
              className="text-xs font-bold text-muted-foreground hover:text-accent transition-colors"
            >
              LOG IN
            </button>
            <button 
              onClick={() => setModalType("signup")} 
              className="bg-accent text-white text-[10px] font-black px-4 py-1.5 rounded-lg shadow-lg shadow-accent/20 hover:scale-105 transition-all"
            >
              SIGN UP
            </button>
          </div>
        )}
        
        <div className="h-4 w-[1px] bg-border mx-1" />
        <ThemeToggle />
      </div>

      {/* Graduation Tag - Now centered with more breathing room */}
      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/5 border border-accent/20 text-accent text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-sm">
        ✨ Graduation Thesis ✨
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-10 text-balance leading-[1.1] text-foreground">
        Efficient Text-Guided Image Editing with Cultural Adaptation via Low-Rank Adaptation (LoRA) and Quantization for Vietnamese Traditional Outfit Generation
      </h1>

      {/* Authors & Affiliation (Rest of code remains the same) */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-lg font-medium text-muted-foreground mb-12">
        {["Trần Khánh Linh", "Lê Như Quỳnh", "Đặng Trung Hiếu"].map((name) => (
          <span key={name} className="hover:text-foreground transition-colors cursor-default underline decoration-transparent hover:decoration-accent/40 decoration-2 underline-offset-4">{name}</span>
        ))}
      </div>

      <div className="text-xl font-semibold mb-12 text-accent/90 tracking-tight">
        Posts and Telecommunications Institute of Technology
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button className="btn-outline flex items-center gap-2 px-6 py-2.5 border-red-500/20 text-red-600 hover:bg-red-50 transition-all font-bold">
          <FileText size={18} /> Paper
        </button>
        <button className="btn-outline flex items-center gap-2 px-6 py-2.5 border-slate-500/20 text-slate-700 hover:bg-slate-50 transition-all font-bold">
          <Github size={18} /> Code
        </button>
        <button className="btn-outline flex items-center gap-2 px-6 py-2.5 border-amber-500/20 text-amber-600 hover:bg-amber-50 transition-all font-bold">
          <Database size={18} /> Dataset
        </button>
      </div>

      <AuthModal isOpen={modalType !== null} onClose={() => setModalType(null)} type={modalType || "login"} />
      <HistoryView isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </header>
  )
}