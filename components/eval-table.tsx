"use client"

import React, { useEffect, useState } from 'react'
import { Database, X, Maximize2 } from "lucide-react"

type ImageItem = {
  id: string
  imageId: string
  prompt: string
  inferenceTimes: Record<string, number>
}

type ModelInfo = {
  id: string
  folder: string
}

export function EvalTable() {
  const models: ModelInfo[] = [
    { id: "Input", folder: "dataset" },
    { id: "Ours", folder: "result_be" },
    { id: "Nano", folder: "result_nano" },
    { id: "GPT-1.5", folder: "result_gpt_1.5" },
    { id: "GPT-1", folder: "result_gpt_1" },
    { id: "Qwen-Image", folder: "result_qwen_edit_2509" },
    { id: "Flux.1", folder: "result_flux" }
  ]

  const [imageData, setImageData] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(true)
  // State for the Image Preview Modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/assets/nhat_binh/result_be/result.txt')
        const text = await response.text()

        const processedData = parseResultFile(text)
        processedData.sort((a, b) => parseInt(a.id) - parseInt(b.id))

        await Promise.all([
          fetchInferenceTimes('result_be', processedData),
          fetchInferenceTimes('result_nano', processedData),
          fetchInferenceTimesGPT15('result_gpt_1.5', processedData),
          fetchInferenceTimes('result_gpt_1', processedData),
          fetchInferenceTimes('result_qwen_edit_2509', processedData),
          fetchInferenceTimes('result_flux', processedData)
        ])

        setImageData(processedData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    const parseResultFile = (text: string): ImageItem[] => {
      const items: ImageItem[] = []
      const testCaseRegex = /"(\d+)":\s*\{\s*"id":\s*"([^"]+)"\s*,\s*\(([\d,.]+)s\)\s*"prompt":\s*"([^"]+)"\s*\}/g

      let match
      while ((match = testCaseRegex.exec(text)) !== null) {
        const [, testId, imageId, timeStr, prompt] = match
        const inferenceTime = parseFloat(timeStr.replace(',', '.'))

        items.push({
          id: testId.padStart(3, '0'),
          imageId: imageId.split('.')[0],
          prompt,
          inferenceTimes: { 'result_be': inferenceTime }
        })
      }
      return items
    }

    const fetchInferenceTimes = async (folder: string, data: ImageItem[]) => {
      if (folder === 'result_be') return
      try {
        const response = await fetch(`/assets/nhat_binh/${folder}/result.txt`)
        const text = await response.text()
        const testTimeRegex = /"(\d+)":\s*\{\s*"id":\s*"[^"]+"\s*,\s*\(([\d,.]+)s\)/g

        let timeMatch
        while ((timeMatch = testTimeRegex.exec(text)) !== null) {
          const [, testId, timeStr] = timeMatch
          const item = data.find(d => d.id === testId.padStart(3, '0'))
          if (item) {
            const time = parseFloat(timeStr.replace(',', '.'))
            item.inferenceTimes[folder] = time
          }
        }
      } catch (error) { console.error(`Error in ${folder}:`, error) }
    }

    const fetchInferenceTimesGPT15 = async (folder: string, data: ImageItem[]) => {
      try {
        const response = await fetch(`/assets/nhat_binh/${folder}/inference_metrics.json`)
        const metricsData = await response.json()
        Object.entries(metricsData).forEach(([testId, metrics]: [string, any]) => {
          const item = data.find(d => d.id === testId.padStart(3, '0'))
          if (item && metrics.inference_time_sec) {
            item.inferenceTimes[folder] = metrics.inference_time_sec
          }
        })
      } catch (error) { console.error(`Error in ${folder}:`, error) }
    }

    fetchData()
  }, [])

  const getFileExtension = (folder: string) => {
    if (folder === 'result_be' || folder === 'result_gpt_1.5' || folder === 'result_gpt_1') return 'jpg'
    if (folder === 'result_qwen_edit_2509' || folder === 'result_flux') return 'webp'
    return 'jpg'
  }

  const getImagePath = (model: ModelInfo, item: ImageItem) => {
    const folder = model.folder
    const extension = getFileExtension(folder)

    if (folder === 'dataset') {
      return `/assets/nhat_binh/${folder}/${item.imageId}.jpg`
    }
    const numericalId = parseInt(item.id, 10)

    if (folder === 'result_flux') {
      if (numericalId === 2) return `/assets/nhat_binh/${folder}/flux2.jpg`
      if (numericalId === 3) return `/assets/nhat_binh/${folder}/flux_03.jpg`
      const testId = numericalId < 10 ? item.id.slice(-2) : numericalId.toString()
      return `/assets/nhat_binh/${folder}/${testId}.${extension}`
    }

    const testId = numericalId < 10 ? item.id.slice(-2) : numericalId.toString()
    return `/assets/nhat_binh/${folder}/${testId}.${extension}`
  }

  const formatInferenceTime = (time: number | undefined) => {
    return time ? `${time.toFixed(1)}s` : '-'
  }

  if (loading) {
    return <div className="py-24 text-center text-foreground font-mono">LOADING EVALUATION DATA...</div>
  }

  return (
    <section className="pt-12 pb-12 px-6 max-w-7xl mx-auto overflow-hidden">
      <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Nhat Binh Outfit Editing Evaluation</h2>

      <div className="glass-panel overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                {models.map((model) => (
                  <th key={model.id} className="py-5 px-3 text-xs font-mono text-muted-foreground text-center uppercase tracking-widest font-bold min-w-[140px]">
                    {model.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {imageData.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-muted/10 transition-colors">
                    {models.map((model, idx) => {
                      const imageSrc = getImagePath(model, item);
                      return (
                        <td key={model.id} className="p-3 align-top">

                          <div
                            className="aspect-square bg-muted/20 rounded-lg overflow-hidden mb-2 border border-border flex items-center justify-center cursor-pointer group/img relative"
                            onClick={() => setSelectedImage(imageSrc)}
                          >
                            <img
                              src={imageSrc}
                              alt={`${model.id} result`}
                              className="w-full h-full object-contain transition-transform duration-300 group-hover/img:scale-105"
                            />

                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize2 className="text-white" size={24} />
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            {idx > 0 && (
                              <span className="text-[9px] font-mono text-muted-foreground uppercase opacity-70 tracking-tighter">Inference</span>
                            )}
                            <div className={`text-[11px] font-mono font-bold ${idx === 0 ? 'text-transparent' : 'text-foreground'}`}>
                              {idx > 0 ? formatInferenceTime(item.inferenceTimes[model.folder]) : '-'}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-border/40 bg-muted/5">
                    <td colSpan={models.length} className="py-4 px-6">
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-[10px] font-mono text-accent font-black uppercase tracking-[0.2em] bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                          PROMPT
                        </span>
                        <p className="text-sm text-foreground/80 font-medium italic text-center max-w-5xl leading-relaxed">
                          "{item.prompt}"
                        </p>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-center items-center gap-2 text-xs font-mono text-muted-foreground">
        <Database size={14} />
        <span>Full dataset visualization optimized for high-fidelity cultural garment analysis.</span>
      </div>


      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
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