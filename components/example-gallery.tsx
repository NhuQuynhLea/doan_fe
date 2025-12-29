"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const EXAMPLES = [
  {
    input: "/assets/pie_bench/image/image1.jpg",
    output: "/assets/pie_bench/edited_result/edit1.png",
    src_prompt: "a round cake with orange frosting on a wooden plate",
    edit_prompt: "a square cake with strawberry frosting on a plastic plate"
  },
  {
    input: "/assets/pie_bench/image/image4.jpg",
    output: "/assets/pie_bench/edited_result/edit4.png",
    src_prompt: "a cat sitting next to a mirror",
    edit_prompt: "a silver cat sculpture standing next to a mirror"
  },
  {
    input: "/assets/pie_bench/image/image2.jpg",
    output: "/assets/pie_bench/edited_result/edit2.png",
    src_prompt: "a cat sitting on a wooden chair",
    edit_prompt: "a red dog with flowers in mouth standing on a metal chair"
  },
  {
    input: "/assets/pie_bench/image/image.jpg",
    output: "/assets/pie_bench/edited_result/edit0.png",
    src_prompt: "a slanted mountain bicycle on the road in front of a building",
    edit_prompt: "a slanted rusty mountain motorcycle in front of a fence"
  },
  {
    input: "/assets/pie_bench/image/image3.jpg",
    output: "/assets/pie_bench/edited_result/edit3.png",
    src_prompt: "blue light, a black and white cat is playing with a flower",
    edit_prompt: "blue light, a black and white dog is playing with a yellow ball"
  },
  {
    input: "/assets/pie_bench/image/image6.jpg",
    output: "/assets/pie_bench/edited_result/edit6.png",
    src_prompt: "a cup of coffee with drawing of tulip putted on the wooden table",
    edit_prompt: "a yellow cup of milk with drawing of rose putted on the wooden table"
  },
  {
    input: "/assets/pie_bench/image/image7.jpg",
    output: "/assets/pie_bench/edited_result/edit7.png",
    src_prompt: "a german shepherd dog stands on the grass with mouth closed",
    edit_prompt: "a white german shepherd dog sits on the grass with big mouth opened"
  },
  {
    input: "/assets/pie_bench/image/image9.jpg",
    output: "/assets/pie_bench/edited_result/edit9.png",
    src_prompt: "a dog is laying down on a white background",
    edit_prompt: "Painting of a lion laying down on a blue background"
  },
  {
    input: "/assets/pie_bench/image/image28.jpg",
    output: "/assets/pie_bench/edited_result/edit28.png",
    src_prompt: "white flowers on a tree branch with blue sky background",
    edit_prompt: "Painting of red flowers on a tree branch with white background"
  },
  {
    input: "/assets/pie_bench/image/image26.jpg",
    output: "/assets/pie_bench/edited_result/edit26.png",
    src_prompt: "a yellow bird with a red beak sitting on a branch",
    edit_prompt: "a toy cat with a red fur sitting on a branch"
  },
  {
    input: "/assets/pie_bench/image/image27.jpg",
    output: "/assets/pie_bench/edited_result/edit27.png",
    src_prompt: "a opened eyes cat sitting on wooden floor",
    edit_prompt: "a closed eyes dog sitting on green grass"
  },
  {
    input: "/assets/pie_bench/image/image93.jpg",
    output: "/assets/pie_bench/edited_result/edit93.png",
    src_prompt: "a collie dog is sitting on a bed",
    edit_prompt: "a Garfield cat is sleeping on a sofa"
  },
  {
    input: "/assets/pie_bench/image/image94.jpg",
    output: "/assets/pie_bench/edited_result/edit94.png",
    src_prompt: "a cat is sitting on a red blanket",
    edit_prompt: "a cat is sleeping on a blue sweater"
  },
  {
    input: "/assets/pie_bench/image/image95.jpg",
    output: "/assets/pie_bench/edited_result/edit95.png",
    src_prompt: "a painting of a fairy with green wings holding a glowing jar",
    edit_prompt: "a painting of a fairy with purple wings holding a white crystal ball"
  },
  {
    input: "/assets/pie_bench/image/image98.jpg",
    output: "/assets/pie_bench/edited_result/edit98.png",
    src_prompt: "a light bulb hanging from a wire with sky in the background",
    edit_prompt: "a cat hanging from a wire with grass in the background"
  }
]

export function ExampleGallery() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((i) => (i + 1) % EXAMPLES.length)
  const prev = () => setIndex((i) => (i - 1 + EXAMPLES.length) % EXAMPLES.length)

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Qualitative Examples</h2>
      
      <div className="relative glass-panel p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs mx-auto aspect-square bg-muted rounded-lg overflow-hidden border border-border relative">
              <img
                src={EXAMPLES[index].input || "/placeholder.svg"}
                alt="Input"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-background/80 backdrop-blur-md rounded text-xs font-mono border border-border">
                INPUT
              </div>
            </div>
            <div className="mt-3 w-full max-w-xs">
              <div className="h-20 overflow-y-auto mt-2 px-2">
             
                <p className="text-sm text-foreground text-center leading-relaxed">
                  "{EXAMPLES[index].src_prompt}"
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs mx-auto aspect-square bg-muted rounded-lg overflow-hidden border border-border relative">
              <img
                src={EXAMPLES[index].output || "/placeholder.svg"}
                alt="Edited"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-accent/80 text-white backdrop-blur-md rounded text-xs font-mono border border-accent/20">
                EDITED
              </div>
            </div>
            <div className="mt-3 w-full max-w-xs">
              <div className="h-20 overflow-y-auto mt-2 px-2">
                <p className="text-sm text-accent text-center font-medium leading-relaxed">
                  "{EXAMPLES[index].edit_prompt}"
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full 
                     bg-background/60 hover:bg-background/90 transition-all border border-border backdrop-blur-sm
                     active:scale-90 active:bg-accent/10"
          aria-label="Previous Example"
        >
          <ChevronLeft className="text-foreground" />
        </button>
        
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full 
                     bg-background/60 hover:bg-background/90 transition-all border border-border backdrop-blur-sm
                     active:scale-90 active:bg-accent/10"
          aria-label="Next Example"
        >
          <ChevronRight className="text-foreground" />
        </button>

        <div className="flex justify-center gap-2 mt-8">
          {EXAMPLES.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index ? "bg-accent w-6" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}