"use client"

import { useState } from "react"
import { Maximize2, X } from "lucide-react"

export function MethodologySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="pt-12 pb-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">System Architecture</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div
            className="glass-panel p-4 bg-white/5 cursor-pointer group/img relative"
            onClick={() => setSelectedImage("/assets/architecture_general.jpg")}
          >
            <img
              src="/assets/architecture_general.jpg"
              alt="Development and Production System Architecture"
              className="w-full rounded border border-white/10 transition-transform duration-300 group-hover/img:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center rounded">
              <Maximize2 className="text-white" size={24} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center font-mono italic">
            Figure 3.2: Overview of the Development Pipeline and Production Environment.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-accent/20 text-accent flex items-center justify-center font-bold shrink-0">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Frontend Stack (Next.js & TypeScript)</h3>
              <p className="text-muted-foreground text-sm">
                Developed with <strong>TypeScript</strong> for a strictly typed foundation, the interface leverages 
                <strong> Next.js</strong> and <strong>React</strong> for server-side rendering. 
                <strong> Tailwind CSS</strong> provides a utility-first presentation layer with PostCSS 
                to ensure cross-browser consistency.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-accent/20 text-accent flex items-center justify-center font-bold shrink-0">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Production Backend & Inference</h3>
              <p className="text-muted-foreground text-sm">
                A containerized <strong>FastAPI gateway</strong> orchestrates the <strong>ComfyUI Workflow Engine</strong>. 
                This handles modular workflow execution and model inference (.pth weights) within a 
                scalable Docker environment.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-accent/20 text-accent flex items-center justify-center font-bold shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">External Services (Supabase BaaS)</h3>
              <p className="text-muted-foreground text-sm">
                <strong>Supabase</strong> manages auxiliary tasks including user authentication, 
                PostgreSQL metadata storage, and analytics. This allows the core inference 
                backend to remain stateless and performance-optimized.
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
          >
            <X size={40} strokeWidth={1.5} />
          </button>

          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
          </div>
        </div>
      )}
    </section>
  )
}