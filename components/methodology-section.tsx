export function MethodologySection() {
  return (
    <section className="pt-12 pb-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Methodology</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="glass-panel p-4 bg-white/5">
            <img
              src="/pipeline-architecture-diagram-with-encoder-and-dif.jpg"
              alt="Architecture Diagram"
              className="w-full rounded border border-white/10"
            />
          </div>
          <p className="text-xs text-muted text-center font-mono italic">
            Figure 3.2: Overview of the Instruct-NhatBinh pipeline architecture.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-accent/20 text-accent flex items-center justify-center font-bold shrink-0">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Data Curation</h3>
              <p className="text-muted">
                We collected over 50,000 high-resolution images of traditional Nhat Binh garments from historical
                archives and modern recreations, using automated tagging for fine-grained detail.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-accent/20 text-accent flex items-center justify-center font-bold shrink-0">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Instruct-Fine-Tuning</h3>
              <p className="text-muted">
                Our model utilizes a modified InstructPix2Pix backbone, fine-tuned specifically on cultural garment
                transformations with a focus on silhouette preservation.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-accent/20 text-accent flex items-center justify-center font-bold shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Structural Guidance</h3>
              <p className="text-muted">
                We introduce a pose-aware structural guidance module that ensures the generated garment naturally
                deforms according to the human body&apos;s articulation in the source image.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
