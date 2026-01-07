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

  const inferenceTimeData = [
    { testCase: "Test 1", ours: 24.3, nano: 33.0, gpt15: 38.7, gpt1: 32.0, qwenImage: 58.2, flux1: 23.0 },
    { testCase: "Test 2", ours: 15.6, nano: 30.4, gpt15: 36.6, gpt1: 43.2, qwenImage: 60.7, flux1: 13.4 },
    { testCase: "Test 3", ours: 14.9, nano: 32.6, gpt15: 40.4, gpt1: 39.1, qwenImage: 68.9, flux1: 11.0 },
    { testCase: "Test 4", ours: 14.1, nano: 29.2, gpt15: 28.9, gpt1: 36.4, qwenImage: 59.8, flux1: 25.4 },
    { testCase: "Test 5", ours: 16.2, nano: 32.7, gpt15: 29.8, gpt1: 42.3, qwenImage: 77.8, flux1: 19.4 },
    { testCase: "Test 6", ours: 14.7, nano: 32.6, gpt15: 32.5, gpt1: 42.8, qwenImage: 91.6, flux1: 19.4 },
    { testCase: "Test 7", ours: 14.8, nano: 29.4, gpt15: 35.1, gpt1: 51.5, qwenImage: 59.4, flux1: 19.7 },
    { testCase: "Test 8", ours: 14.3, nano: 30.8, gpt15: 66.9, gpt1: 52.4, qwenImage: 57.6, flux1: 19.4 },
    { testCase: "Test 9", ours: 14.4, nano: 33.4, gpt15: 66.8, gpt1: 42.7, qwenImage: 143.4, flux1: 28.5 },
    { testCase: "Test 10", ours: 14.6, nano: 33.8, gpt15: 38.5, gpt1: 39.1, qwenImage: 144.3, flux1: 24.3 },
    { testCase: "Test 11", ours: 14.1, nano: 30.8, gpt15: 34.3, gpt1: 38.9, qwenImage: 226.4, flux1: 24.1 },
    { testCase: "Test 12", ours: 14.6, nano: 35.9, gpt15: 37.8, gpt1: 35.8, qwenImage: 109.1, flux1: 23.8 },
    { testCase: "Test 13", ours: 13.9, nano: 28.7, gpt15: 32.9, gpt1: 46.7, qwenImage: 175.8, flux1: 25.6 },
    { testCase: "Test 14", ours: 14.4, nano: 32.1, gpt15: 36.1, gpt1: 44.9, qwenImage: 63.1, flux1: 24.2 },
    { testCase: "Test 15", ours: 14.2, nano: 26.9, gpt15: 33.5, gpt1: 39.9, qwenImage: 148.3, flux1: 24.9 },
    { testCase: "Test 16", ours: 14.2, nano: 27.1, gpt15: 35.0, gpt1: 41.1, qwenImage: 59.3, flux1: 25.7 },
    { testCase: "Test 17", ours: 14.3, nano: 27.7, gpt15: 32.9, gpt1: 36.3, qwenImage: 67.5, flux1: 28.1 },
  ]

  const avgInferenceTime = {
    ours: 15.15,
    nano: 31.01,
    gpt15: 38.63,
    gpt1: 41.48,
    qwenImage: 98.31,
    flux1: 22.35,
  }

  const metrics = [
    "add",
    "adjust",
    "extract",
    "replace",
    "remove",
    "background",
    "style",
    "hybrid",
    "action",
    "overall",
  ] as const

  const maxByMetric = metrics.reduce(
    (acc, metric) => {
      acc[metric] = Math.max(...data.map((row) => row[metric]))
      return acc
    },
    {} as Record<(typeof metrics)[number], number>
  )

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
              <TableHead className="text-center font-bold text-foreground">Overall</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={row.model}
                className={`
                  hover:bg-muted/30 transition-colors
                  ${row.model === "Our pipeline" ? "bg-accent/5" : ""}
                  ${idx === data.length - 1 ? "border-t-2 border-foreground/20" : ""}
                `}
              >
                <TableCell className="font-medium">{row.model}</TableCell>
                <TableCell
                  className={`text-center ${row.add === maxByMetric.add ? "font-bold text-accent" : ""}`}
                >
                  {row.add.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-center ${row.adjust === maxByMetric.adjust ? "font-bold text-accent" : ""}`}
                >
                  {row.adjust.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-center ${row.extract === maxByMetric.extract ? "font-bold text-accent" : ""}`}
                >
                  {row.extract.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-center ${row.replace === maxByMetric.replace ? "font-bold text-accent" : ""}`}
                >
                  {row.replace.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-center ${row.remove === maxByMetric.remove ? "font-bold text-accent" : ""}`}
                >
                  {row.remove.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-center ${
                    row.background === maxByMetric.background ? "font-bold text-accent" : ""
                  }`}
                >
                  {row.background.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-center ${row.style === maxByMetric.style ? "font-bold text-accent" : ""}`}
                >
                  {row.style.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-center ${row.hybrid === maxByMetric.hybrid ? "font-bold text-accent" : ""}`}
                >
                  {row.hybrid.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-center ${row.action === maxByMetric.action ? "font-bold text-accent" : ""}`}
                >
                  {row.action.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-center ${row.overall === maxByMetric.overall ? "font-bold text-accent" : ""}`}
                >
                  {row.overall.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground text-center">
        Table 1: Quantitative comparison of instruction-guided image editing across various semantic tasks.
      </p>

      <div className="mt-12 glass-panel overflow-hidden border border-border text-sm [&_th]:py-2 [&_td]:py-2 [&_th]:h-auto [&_td]:h-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-bold text-foreground">Test Case</TableHead>
              <TableHead className="text-center font-bold text-foreground">OURS</TableHead>
              <TableHead className="text-center font-bold text-foreground">NANO</TableHead>
              <TableHead className="text-center font-bold text-foreground">GPT-1.5</TableHead>
              <TableHead className="text-center font-bold text-foreground">GPT-1</TableHead>
              <TableHead className="text-center font-bold text-foreground">QWEN-IMAGE</TableHead>
              <TableHead className="text-center font-bold text-foreground">FLUX.1</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inferenceTimeData.map((row) => (
              <TableRow key={row.testCase} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{row.testCase}</TableCell>
                <TableCell className="text-center">{row.ours.toFixed(1)}s</TableCell>
                <TableCell className="text-center">{row.nano.toFixed(1)}s</TableCell>
                <TableCell className="text-center">{row.gpt15.toFixed(1)}s</TableCell>
                <TableCell className="text-center">{row.gpt1.toFixed(1)}s</TableCell>
                <TableCell className="text-center">{row.qwenImage.toFixed(1)}s</TableCell>
                <TableCell className="text-center">{row.flux1.toFixed(1)}s</TableCell>
              </TableRow>
            ))}
            <TableRow className="border-t-2 border-foreground/20">
              <TableCell className="font-bold">Avg Time</TableCell>
              <TableCell className="text-center font-bold">{avgInferenceTime.ours.toFixed(2)}s</TableCell>
              <TableCell className="text-center font-bold">{avgInferenceTime.nano.toFixed(2)}s</TableCell>
              <TableCell className="text-center font-bold">{avgInferenceTime.gpt15.toFixed(2)}s</TableCell>
              <TableCell className="text-center font-bold">{avgInferenceTime.gpt1.toFixed(2)}s</TableCell>
              <TableCell className="text-center font-bold">{avgInferenceTime.qwenImage.toFixed(2)}s</TableCell>
              <TableCell className="text-center font-bold">{avgInferenceTime.flux1.toFixed(2)}s</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground text-center">
        Table 5.2: Comparison of Inference Times across Models
      </p>
    </section>
  )
}
