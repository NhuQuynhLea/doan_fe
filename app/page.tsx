import { ResearchHeader } from "@/components/research-header"
import { ExampleGallery } from "@/components/example-gallery"
import { InteractiveSandbox } from "@/components/interactive-sandbox"
import { AbstractSection } from "@/components/abstract-section"
import { QuantitativeEvalTable } from "@/components/quantitative-eval-table" // Added new quantitative table import
import { EvalTable } from "@/components/eval-table"
import { MethodologySection } from "@/components/methodology-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ResearchHeader />
      <ExampleGallery />
      <InteractiveSandbox />
      <AbstractSection />
      <EvalTable />
      <QuantitativeEvalTable /> 
      <MethodologySection />
      <footer className="py-12 border-t border-border mt-20 text-center text-sm text-muted">
        <p>© 2025 Qualcomm AI Research. All rights reserved.</p>
        <p className="mt-2">Built for CVPR 2025 Nashville Presentation.</p>
      </footer>
    </main>
  )
}
