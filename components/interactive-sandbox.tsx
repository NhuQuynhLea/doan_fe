"use client"

import { useState, useRef } from "react"
import { Upload, Wand2, RefreshCw, Database, X, LogIn, Save } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("Failed to read image"))
    reader.onload = () => resolve(String(reader.result))
    reader.readAsDataURL(blob)
  })

export function InteractiveSandbox() {
  const { user, saveToHistory } = useAuth()
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [modelType, setModelType] = useState<"Standard" | "SwiftEdit">("Standard")
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [apiStatus, setApiStatus] = useState<"idle" | "connecting" | "active" | "error">("idle")
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleGenerate = async () => {
    if (!image) return
    setIsGenerating(true)
    setApiStatus("connecting")
    try {
      const base64Response = await fetch(image)
      const blob = await base64Response.blob()
      const formData = new FormData()
      let endpoint = ''

      if (modelType === 'Standard') {
        endpoint = 'https://j6stsk3s97zkds-8000.proxy.runpod.net/edit'
        formData.append('image', blob)
        formData.append('positive_prompt', prompt)
        if (negativePrompt) formData.append('negative_prompt', negativePrompt)
      } else {
        endpoint = 'https://j6stsk3s97zkds-8000.proxy.runpod.net/edit'
        formData.append('file', blob)
        formData.append('src_p', negativePrompt || 'a photo')
        formData.append('edit_p', prompt)
      }

      const response = await fetch(endpoint, { method: 'POST', body: formData })
      if (!response.ok) {
        setApiStatus("error")
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.blob()
      const imageDataUrl = await blobToDataUrl(data)
      setResult(imageDataUrl)
      setApiStatus("active")
    } catch (error: unknown) {
      console.error('Generation failed:', error)
      setApiStatus("error")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!result || !image || !user) return
    setIsSaving(true)
    try {
      const { errorMessage } = await saveToHistory({
        inputImage: image,
        editedImage: result,
        prompt: prompt || "Instruction-guided edit",
      })
      if (errorMessage) alert(`Save failed: ${errorMessage}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImage(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const fillExample = (p: string, img: string) => {
    setPrompt(p)
    setImage(img)
    setResult(null)
  }

  return (
    <section className="pt-12 pb-12 px-6 bg-card/30 border-y border-border">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Try It Yourself</h2>
          <p className="text-muted-foreground max-w-xl">
            Upload an image and provide an editing instruction to see our model in action.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
          
          <div className="space-y-8">
            <div
              className="aspect-[4/3] glass-panel border-dashed border-2 flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors relative overflow-hidden group p-4 rounded-2xl"
              onClick={() => fileInputRef.current?.click()}
            >
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              {image ? (
                <>
                  <div className="w-full h-full flex items-center justify-center">
                    <img src={image} className="max-w-full max-h-full object-contain" alt="Upload preview" />
                  </div>
                  <button onClick={removeImage} className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-red-500 transition-colors z-20 shadow-lg">
                    <X size={20} />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <Upload className="mb-4 text-muted-foreground" size={48} />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-2">Supports JPG, PNG (Max 5MB)</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-mono text-muted-foreground uppercase mb-2 block">Edit Prompt</label>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Make the human wear a blue outfit"
                  className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-sm font-mono text-muted-foreground uppercase mb-2 block">
                  {modelType === "Standard" ? "Negative Prompt (Optional)" : "Source Prompt"}
                </label>
                <input
                  type="text"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder={modelType === "Standard" ? "e.g., blur, low quality" : "e.g., a dog, a person in a hat"}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div className="pt-4 border-t border-border">
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-3">Model Engine</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => { setModelType((m) => (m === "Standard" ? "SwiftEdit" : "Standard")); setApiStatus("idle"); }}
                    className="flex-1 flex items-center justify-between px-6 py-3 rounded-xl border border-border hover:border-accent/50 transition-all bg-background group"
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-sm">{modelType}</span>
                      <span className="text-[10px] text-muted-foreground">{modelType === "Standard" ? "Qwen-Image-based" : "SwiftEdit"}</span>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="aspect-[4/3] glass-panel bg-black/5 dark:bg-black/80 flex items-center justify-center relative overflow-hidden border border-accent/20 rounded-2xl shadow-2xl p-4">
              {result ? (
                <img src={result} className="max-w-full max-h-full object-contain animate-in fade-in zoom-in-95 duration-700 rounded-lg" alt="Result" />
              ) : (
                <div className="text-center p-12">
                  <div className={`w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full mx-auto mb-6 ${isGenerating ? "animate-spin" : "hidden"}`} />
                  <p className="text-muted-foreground text-sm italic opacity-60">
                    {isGenerating ? `Synthesizing...` : "Your masterpiece will appear here"}
                  </p>
                </div>
              )}
            </div>

            
            <div className="space-y-3 pt-9">
              <button
                onClick={handleGenerate}
                disabled={!image || isGenerating}
                className="group btn-primary w-full h-12 flex items-center justify-center gap-3 text-sm font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] active:scale-[0.98] disabled:opacity-30"
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} className="group-hover:scale-110 transition-transform" />}
                <span>{isGenerating ? "Processing..." : "Magic Generate"}</span>
              </button>

              {result && (
                user ? (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full h-12 flex items-center justify-center gap-3 text-sm font-bold rounded-xl bg-background border-2 border-accent/20 text-foreground hover:bg-accent/5 hover:border-accent/40 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
                    <span>{isSaving ? "Saving..." : "Save to History"}</span>
                  </button>
                ) : (
                  <div className="w-full h-11 flex items-center justify-center gap-3 rounded-xl bg-muted/50 border border-border text-muted-foreground text-xs font-medium">
                    <LogIn size={16} /> Login to save this edit
                  </div>
                )
              )}
            </div>

            
          </div>
        </div>

        <div className="glass-panel p-6 overflow-hidden border-t-0 rounded-t-none border-x-0 bg-transparent shadow-none">
          <h3 className="text-sm font-mono text-muted-foreground uppercase mb-6 flex items-center gap-2">
            <Database size={14} /> Quick Start Examples
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
            {[
              { id: 1, prompt: "Make the human wear a royal gold Nhat Binh", img: "/assets/nhat_binh/dataset/01.jpg" },
              { id: 2, prompt: "Add intricate silk embroidery details", img: "/assets/pie_bench/image/image6.jpg" },
              { id: 3, prompt: "Convert style to oil painting", img: "/assets/pie_bench/image/image2.jpg" },
              { id: 4, prompt: "a red dog with flowers in mouth standing on a metal chair", img: "/assets/pie_bench/image/image3.jpg" },
              { id: 5, prompt: "Make the human wear a blue NhatBinh outfit", img: "/assets/nhat_binh/dataset/02.jpg" },
              { id: 6, prompt: "Make the dog wear a blue hat", img: "/assets/pie_bench/image/dog.jpg" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => fillExample(item.prompt, item.img)}
                className="flex-shrink-0 flex items-center gap-4 p-3 rounded-xl border border-border bg-background/50 hover:bg-accent/5 hover:border-accent/40 transition-all text-left group"
              >
                <img src={item.img} className="w-16 h-16 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" alt="Preset" />
                <div className="max-w-[150px]">
                  <p className="text-xs font-medium line-clamp-2">{item.prompt}</p>
                  <p className="text-[10px] text-accent mt-1 font-mono">Use Preset →</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}