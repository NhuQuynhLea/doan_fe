"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { X, Clock, ChevronRight, Maximize2, Trash2 } from "lucide-react"

export function HistoryView({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { history, deleteHistoryItem } = useAuth()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const safeSrc = (src: string) => (src.startsWith("blob:") ? "/placeholder.svg" : src)

  if (!isOpen) return null

  return (
    <>
      
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-background border border-border w-full max-w-2xl max-h-[85vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 overflow-hidden">
          
          
          <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-background/90 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Clock size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Edit History</h2>
                <p className="text-xs text-muted-foreground">{history.length} saved generations</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-all active:scale-90">
              <X size={20} />
            </button>
          </div>

          
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-accent">
            {history.length === 0 ? (
              <div className="text-center py-20">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/30 text-muted-foreground/30">
                  <Clock size={32} />
                </div>
                <p className="text-foreground font-medium">No saved edits yet</p>
                <p className="text-sm text-muted-foreground">Your history will appear here once you save a generation.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {history.map((item) => (
                  <div key={item.id} className="group glass-panel p-4 flex gap-5 hover:border-accent/40 transition-all hover:bg-accent/[0.02]">
                    
                    <div className="flex gap-2 h-24 shrink-0 items-center">
                      <div 
                        className="relative h-full aspect-square cursor-pointer group/img"
                        onClick={() => setSelectedImage(item.inputImage.startsWith("blob:") ? null : item.inputImage)}
                      >
                        <img
                          src={safeSrc(item.inputImage || "/placeholder.svg")}
                          className="h-full w-full object-cover rounded-lg border border-border transition-transform group-hover/img:scale-[1.02]"
                          alt="Input"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                          <Maximize2 size={14} className="text-white" />
                        </div>
                      </div>

                      <ChevronRight size={16} className="text-muted-foreground/40" />

                      <div 
                        className="relative h-full aspect-square cursor-pointer group/img"
                        onClick={() => setSelectedImage(item.editedImage.startsWith("blob:") ? null : item.editedImage)}
                      >
                        <img
                          src={safeSrc(item.editedImage || "/placeholder.svg")}
                          className="h-full w-full object-cover rounded-lg border border-accent/30 transition-transform group-hover/img:scale-[1.02]"
                          alt="Result"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                          <Maximize2 size={14} className="text-white" />
                        </div>
                      </div>
                    </div>

                    
                    <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                      
                      <p className="text-[10px] font-bold font-mono text-foreground/70 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                        {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 italic">
                        "{item.prompt}"
                      </p>
                    </div>

                    <div className="shrink-0 flex items-start">
                      <button
                        type="button"
                        disabled={deletingId === item.id}
                        onClick={async (e) => {
                          e.preventDefault()
                          e.stopPropagation()

                          if (!confirm("Delete this history item?")) return

                          setDeletingId(item.id)
                          try {
                            const { errorMessage } = await deleteHistoryItem(item.id)
                            if (errorMessage) {
                              alert(`Delete failed: ${errorMessage}`)
                            }
                          } finally {
                            setDeletingId(null)
                          }
                        }}
                        className="p-2 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in zoom-in-95 duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
            alt="Preview"
          />
        </div>
      )}
    </>
  )
}