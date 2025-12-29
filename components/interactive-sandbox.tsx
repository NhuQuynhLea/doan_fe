"use client"

import { useState, useRef } from "react"
import { Upload, Wand2, RefreshCw, Database, X } from "lucide-react"

export function InteractiveSandbox() {
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [modelType, setModelType] = useState<"Standard" | "SwiftEdit">("Standard")
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [apiStatus, setApiStatus] = useState<"idle" | "connecting" | "active" | "error">("idle")
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleGenerate = async () => {
    if (!image) return
    setIsGenerating(true)
    setApiStatus("connecting")
    
    try {
      const base64Response = await fetch(image);
      const blob = await base64Response.blob();
      
      const formData = new FormData();
      
      let endpoint = '';
      
      if (modelType === 'Standard') {
        endpoint = 'https://n9kqtc7s0xhxqy-8000.proxy.runpod.net/edit';
        formData.append('image', blob);
        formData.append('positive_prompt', prompt);
        if (negativePrompt) {
          formData.append('negative_prompt', negativePrompt);
        }
      } else { 
        endpoint = 'http://localhost:8387/edit';
        formData.append('file', blob);
        formData.append('src_p', negativePrompt || 'a photo');
        formData.append('edit_p', prompt);
      }
      

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        setApiStatus("error");
        throw new Error(`API error: ${response.status}`);
      }
      

      const data = await response.blob();
      const imageUrl = URL.createObjectURL(data);
      setResult(imageUrl);
      setApiStatus("active");
    } catch (error: unknown) {
      console.error('Generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Generation failed: ${errorMessage}`);
      setApiStatus("error");
    } finally {
      setIsGenerating(false);
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
    <section className="py-24 px-6 bg-card/30 border-y border-border">
      <div className="max-w-6xl mx-auto">
        
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-4">Try It Yourself</h2>
            <p className="text-muted-foreground max-w-xl">
              Upload an image and provide an editing instruction to see our model in action.
            </p>
          </div>
          
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Model Configuration</span>
            <button
              onClick={() => {
                setModelType((m) => (m === "Standard" ? "SwiftEdit" : "Standard"));
                setApiStatus("idle");
              }}
              className="btn-outline flex items-center gap-3 px-6 py-2 rounded-full border border-border hover:border-accent/50 transition-all bg-background"
            >
              <span className="font-bold text-sm">{modelType}</span>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </button>
            <span className="text-[10px] text-muted-foreground mt-1">
              {modelType === "Standard" ? "RunPod API" : "SwiftEdit API"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
  
          <div className="space-y-8">
            <div
              className="aspect-[4/3] glass-panel border-dashed border-2 flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors relative overflow-hidden group p-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
              
              {image ? (
                <>
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={image} 
                      className="max-w-full max-h-full object-contain" 
                      style={{ maxHeight: '100%', maxWidth: '100%' }} 
                      alt="Upload preview" 
                    />
                  </div>
                  <button 
                    onClick={removeImage}
                    className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-red-500 transition-colors z-20 shadow-lg"
                    title="Remove Image"
                  >
                    <X size={20} />
                  </button>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">Change Image</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <Upload className="mb-4 text-muted-foreground" size={48} />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-2">Supports JPG, PNG (Max 5MB)</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-mono text-muted-foreground uppercase mb-2 block">Edit Prompt</label>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Make the human wear a blue Nhat Binh outfit"
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
                  placeholder={modelType === "Standard" ? 
                    "e.g., blur, low quality, artifacts" : 
                    "e.g., a dog, a person in a hat"}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="aspect-[4/3] glass-panel bg-black/5 dark:bg-black/60 flex items-center justify-center relative overflow-hidden border-accent/20 shadow-inner p-4">
              {result ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={result || "/placeholder.svg"}
                    className="max-w-full max-h-full object-contain animate-in fade-in zoom-in duration-500"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                    alt="Result"
                  />
                </div>
              ) : (
                <div className="text-center p-12">
                  <div
                    className={`w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full mx-auto mb-6 ${isGenerating ? "animate-spin" : "hidden"}`}
                  />
                  <p className="text-muted-foreground text-sm italic">
                    {isGenerating ? 
                      `${modelType === "Standard" ? "Generating with Standard API..." : "Processing with SwiftEdit API..."}` : 
                      "The edited image will appear here"}
                  </p>
                  {isGenerating && (
                    <p className="text-xs text-accent/70 mt-3">
                      {modelType === "Standard" ? 
                        "Applying prompt to image..." : 
                        "Running SwiftEdit transformation..."}
                    </p>
                  )}
                </div>
              )}
            </div>

              <div className="flex justify-between items-center px-2">
              <p className="text-xs font-mono text-muted-foreground tracking-tighter">
                OUTPUT: {modelType === "Standard" ? "1024x1024" : "SwiftEdit Resolution"} • {modelType}
              </p>
              <div className="flex gap-2 items-center">
                <div className={`w-2 h-2 rounded-full ${apiStatus === "active" ? "bg-green-500" : apiStatus === "connecting" ? "bg-yellow-500" : apiStatus === "error" ? "bg-red-500" : "bg-gray-400"} ${apiStatus === "connecting" ? "animate-pulse" : ""}`} />
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  {apiStatus === "active" ? "API Connected" : 
                   apiStatus === "connecting" ? "Connecting..." : 
                   apiStatus === "error" ? "Connection Error" : 
                   "API Ready"}
                </span>
              </div>
            </div>
        
            <button
                onClick={handleGenerate}
                disabled={!image || isGenerating}
                className="btn-primary w-full flex items-center justify-center gap-2 h-11 text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-40"
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={16} /> : <Wand2 size={16} />}
                {isGenerating ? "Generating..." : "Run Generation"}
              </button>

           
          </div>
        </div>


        <div className="glass-panel p-6 overflow-hidden border-t-0 rounded-t-none border-x-0 bg-transparent shadow-none">
          <h3 className="text-sm font-mono text-muted-foreground uppercase mb-6 flex items-center gap-2">
            <Database size={14} /> Quick Start Examples
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[
              { id: 1, prompt: "Make the human wear a royal gold Nhat Binh", img: "/assets/nhat_binh/dataset/01.jpg" },
              { id: 2, prompt: "Add intricate silk embroidery details", img: "/assets/pie_bench/image/image6.jpg" },
              { id: 3, prompt: "Convert style to oil painting", img: "/assets/pie_bench/image/image2.jpg" },
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