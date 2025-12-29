import { FileText, Github, Database } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function ResearchHeader() {
  return (
    <header className="py-20 px-6 max-w-5xl mx-auto text-center border-b border-border relative">
      <div className="absolute top-8 right-6">
        <ThemeToggle />
      </div>

      <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8 animate-fade-in">
        ✨ Graduation Thesis ✨
      </div>

      {/* Reduced font size from text-4xl/6xl to text-3xl/5xl for better balance */}
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-balance leading-[1.15]">
        Efficient Text-Guided Image Editing with Cultural Adaptation via Low-Rank Adaptation (LoRA) and Quantization for Vietnamese Traditional Outfit Generation
      </h1>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg text-muted-foreground mb-12">
        <span className="hover:text-foreground transition-colors cursor-default">Trần Khánh Linh</span>
        <span className="hover:text-foreground transition-colors cursor-default">Lê Như Quỳnh</span>
        <span className="hover:text-foreground transition-colors cursor-default">Đặng Trung Hiếu</span>
      </div>

      <div className="text-xl font-medium mb-12 text-accent/80">
        Posts and Telecommunications Institute of Technology
      </div>

      {/* Added specific colors and hover states to the action buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <a 
          href="#" 
          className="btn-outline flex items-center gap-2 border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <FileText size={18} /> Paper
        </a>
        <a 
          href="#" 
          className="btn-outline flex items-center gap-2 border-slate-500/30 text-slate-700 dark:text-slate-300 hover:bg-slate-500/10 transition-all"
        >
          <Github size={18} /> Code (Official)
        </a>
        <a 
          href="#" 
          className="btn-outline flex items-center gap-2 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-all"
        >
          <Database size={18} /> Dataset
        </a>
      </div>
    </header>
  )
}