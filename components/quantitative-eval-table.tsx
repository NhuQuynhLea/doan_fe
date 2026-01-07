import Image from "next/image"

export function QuantitativeEvalTable() {
  return (
    <section className="pt-12 pb-12 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Quantitative Comparison</h2>
      <div className="glass-panel overflow-hidden border border-border">
        <div className="relative w-full max-w-4xl mx-auto h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
          <Image
            src="/assets/quantitative_eval.png"
            alt="Quantitative evaluation table"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground text-center">
        Table 1: Quantitative comparison of instruction-guided image editing across various semantic tasks.
      </p>

      <div className="mt-12 glass-panel overflow-hidden border border-border">
        <div className="relative w-full max-w-4xl mx-auto h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
          <Image
            src="/assets/time.png"
            alt="Inference time table"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground text-center">
        Table 5.2: Comparison of Inference Times across Models
      </p>
    </section>
  )
}
