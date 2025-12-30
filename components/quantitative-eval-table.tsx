import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function QuantitativeEvalTable() {
  const data = [
    {
      model: "MagicBrush [18]",
      add: 2.84,
      adjust: 1.58,
      extract: 1.51,
      replace: 1.97,
      remove: 1.58,
      background: 1.75,
      style: 2.38,
      hybrid: 1.62,
      action: 1.22,
      overall: 1.83,
    },
    {
      model: "Instruct Pix2Pix [17]",
      add: 2.45,
      adjust: 1.83,
      extract: 1.44,
      replace: 2.01,
      remove: 1.5,
      background: 1.44,
      style: 3.55,
      hybrid: 1.2,
      action: 1.46,
      overall: 1.88,
    },
    {
      model: "AnyEdit [52]",
      add: 3.18,
      adjust: 2.95,
      extract: 1.88,
      replace: 2.47,
      remove: 2.23,
      background: 2.24,
      style: 2.85,
      hybrid: 1.56,
      action: 2.65,
      overall: 2.45,
    },
    {
      model: "UltraEdit [56]",
      add: 3.44,
      adjust: 2.81,
      extract: 2.13,
      replace: 2.96,
      remove: 1.45,
      background: 2.83,
      style: 3.76,
      hybrid: 1.91,
      action: 2.98,
      overall: 2.7,
    },
    {
      model: "OmniGen [53]",
      add: 3.47,
      adjust: 3.04,
      extract: 1.71,
      replace: 2.94,
      remove: 2.43,
      background: 3.21,
      style: 4.19,
      hybrid: 2.24,
      action: 3.38,
      overall: 2.96,
    },
    {
      model: "ICEdit [57]",
      add: 3.58,
      adjust: 3.39,
      extract: 1.73,
      replace: 3.15,
      remove: 2.93,
      background: 3.08,
      style: 3.84,
      hybrid: 2.04,
      action: 3.68,
      overall: 3.05,
    },
    {
      model: "Step1X Edit [24]",
      add: 3.88,
      adjust: 3.14,
      extract: 1.76,
      replace: 3.4,
      remove: 2.41,
      background: 3.16,
      style: 4.63,
      hybrid: 2.64,
      action: 2.52,
      overall: 3.06,
    },
    {
      model: "BAGEL [58]",
      add: 3.56,
      adjust: 3.31,
      extract: 1.7,
      replace: 3.3,
      remove: 2.62,
      background: 3.24,
      style: 4.49,
      hybrid: 2.38,
      action: 4.17,
      overall: 3.2,
    },
    {
      model: "UniWorld V1 [54]",
      add: 3.82,
      adjust: 3.64,
      extract: 2.27,
      replace: 3.47,
      remove: 3.24,
      background: 2.99,
      style: 4.21,
      hybrid: 2.96,
      action: 2.74,
      overall: 3.26,
    },
    {
      model: "OmniGen2 [55]",
      add: 3.57,
      adjust: 3.06,
      extract: 1.77,
      replace: 3.74,
      remove: 3.2,
      background: 3.57,
      style: 4.81,
      hybrid: 2.52,
      action: 4.68,
      overall: 3.44,
    },
    {
      model: "FLUX.1 Kontext [Pro] [12]",
      add: 4.25,
      adjust: 4.15,
      extract: 2.35,
      replace: 4.56,
      remove: 3.57,
      background: 4.26,
      style: 4.57,
      hybrid: 3.68,
      action: 4.63,
      overall: 4.0,
    },
    {
      model: "GPT Image 1 [High] [59]",
      add: 4.61,
      adjust: 4.33,
      extract: 2.9,
      replace: 4.35,
      remove: 3.66,
      background: 4.57,
      style: 4.93,
      hybrid: 3.96,
      action: 4.89,
      overall: 4.2,
    },
    {
      model: "Qwen Image [1]",
      add: 4.38,
      adjust: 4.16,
      extract: 3.43,
      replace: 4.66,
      remove: 4.14,
      background: 4.38,
      style: 4.81,
      hybrid: 3.82,
      action: 4.69,
      overall: 4.27,
    },
    {
      model: "Our pipeline",
      add: 4.37,
      adjust: 4.51,
      extract: 2.58,
      replace: 4.64,
      remove: 4.12,
      background: 4.28,
      style: 4.72,
      hybrid: 3.45,
      action: 4.76,
      overall: 4.16,
    },
  ]

  return (
    <section className="pt-12 pb-12 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Quantitative Comparison</h2>
      <div className="glass-panel overflow-hidden border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-bold text-foreground">Model</TableHead>
              <TableHead className="text-center font-bold text-foreground">Add</TableHead>
              <TableHead className="text-center font-bold text-foreground">Adjust</TableHead>
              <TableHead className="text-center font-bold text-foreground">Extract</TableHead>
              <TableHead className="text-center font-bold text-foreground">Replace</TableHead>
              <TableHead className="text-center font-bold text-foreground">Remove</TableHead>
              <TableHead className="text-center font-bold text-foreground">Background</TableHead>
              <TableHead className="text-center font-bold text-foreground">Style</TableHead>
              <TableHead className="text-center font-bold text-foreground">Hybrid</TableHead>
              <TableHead className="text-center font-bold text-foreground">Action</TableHead>
              <TableHead className="text-center font-bold text-foreground">Overall†</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={row.model}
                className={`
                  hover:bg-muted/30 transition-colors
                  ${row.model === "Our pipeline" ? "bg-accent/5 font-bold" : ""}
                  ${idx === data.length - 1 ? "border-t-2 border-foreground/20" : ""}
                `}
              >
                <TableCell className="font-medium">{row.model}</TableCell>
                <TableCell className="text-center">{row.add.toFixed(2)}</TableCell>
                <TableCell className="text-center">{row.adjust.toFixed(2)}</TableCell>
                <TableCell className="text-center">{row.extract.toFixed(2)}</TableCell>
                <TableCell className="text-center">{row.replace.toFixed(2)}</TableCell>
                <TableCell className="text-center">{row.remove.toFixed(2)}</TableCell>
                <TableCell className="text-center">{row.background.toFixed(2)}</TableCell>
                <TableCell className="text-center">{row.style.toFixed(2)}</TableCell>
                <TableCell className="text-center">{row.hybrid.toFixed(2)}</TableCell>
                <TableCell className="text-center">{row.action.toFixed(2)}</TableCell>
                <TableCell className="text-center font-bold text-accent">{row.overall.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground text-center">
        Table 1: Quantitative comparison of instruction-guided image editing across various semantic tasks.
      </p>
    </section>
  )
}
