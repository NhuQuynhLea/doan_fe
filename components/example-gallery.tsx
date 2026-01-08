"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const EXAMPLES = [
  {
    input: "/assets/pie_bench/image/image1.jpg",
    output: "/assets/pie_bench/edited_result/edit1.jpg",
    src_prompt: "a round cake with orange frosting on a wooden plate",
    edit_prompt: "a square cake with strawberry frosting on a plastic plate"
  },
  {
    input: "/assets/pie_bench/image/image4.jpg",
    output: "/assets/pie_bench/edited_result/edit4.jpg",
    src_prompt: "a cat sitting next to a mirror",
    edit_prompt: "a silver cat sculpture standing next to a mirror"
  },
  {
    input: "/assets/pie_bench/image/image2.jpg",
    output: "/assets/pie_bench/edited_result/edit2.jpg",
    src_prompt: "a cat sitting on a wooden chair",
    edit_prompt: "a red dog with flowers in mouth standing on a metal chair"
  },
  {
    input: "/assets/pie_bench/image/image.jpg",
    output: "/assets/pie_bench/edited_result/edit0.jpg",
    src_prompt: "a slanted mountain bicycle on the road in front of a building",
    edit_prompt: "a slanted rusty mountain motorcycle in front of a fence"
  },
  {
    input: "/assets/pie_bench/image/image3.jpg",
    output: "/assets/pie_bench/edited_result/edit3.jpg",
    src_prompt: "blue light, a black and white cat is playing with a flower",
    edit_prompt: "blue light, a black and white dog is playing with a yellow ball"
  },
  {
    input: "/assets/pie_bench/image/image6.jpg",
    output: "/assets/pie_bench/edited_result/edit6.jpg",
    src_prompt: "a cup of coffee with drawing of tulip putted on the wooden table",
    edit_prompt: "a yellow cup of milk with drawing of rose putted on the wooden table"
  },
  {
    input: "/assets/pie_bench/image/image7.jpg",
    output: "/assets/pie_bench/edited_result/edit7.jpg",
    src_prompt: "a german shepherd dog stands on the grass with mouth closed",
    edit_prompt: "a white german shepherd dog sits on the grass with big mouth opened"
  },
  {
    input: "/assets/pie_bench/image/image9.jpg",
    output: "/assets/pie_bench/edited_result/edit9.jpg",
    src_prompt: "a dog is laying down on a white background",
    edit_prompt: "Painting of a lion laying down on a blue background"
  },
  {
    input: "/assets/pie_bench/image/image28.jpg",
    output: "/assets/pie_bench/edited_result/edit28.jpg",
    src_prompt: "white flowers on a tree branch with blue sky background",
    edit_prompt: "Painting of red flowers on a tree branch with white background"
  },
  {
    input: "/assets/pie_bench/image/image26.jpg",
    output: "/assets/pie_bench/edited_result/edit26.jpg",
    src_prompt: "a yellow bird with a red beak sitting on a branch",
    edit_prompt: "a toy cat with a red fur sitting on a branch"
  },
  {
    input: "/assets/pie_bench/image/image27.jpg",
    output: "/assets/pie_bench/edited_result/edit27.jpg",
    src_prompt: "a opened eyes cat sitting on wooden floor",
    edit_prompt: "a closed eyes dog sitting on green grass"
  },
  {
    input: "/assets/pie_bench/image/image93.jpg",
    output: "/assets/pie_bench/edited_result/edit93.jpg",
    src_prompt: "a collie dog is sitting on a bed",
    edit_prompt: "a Garfield cat is sleeping on a sofa"
  },
  {
    input: "/assets/pie_bench/image/image94.jpg",
    output: "/assets/pie_bench/edited_result/edit94.jpg",
    src_prompt: "a cat is sitting on a red blanket",
    edit_prompt: "a cat is sleeping on a blue sweater"
  },
  {
    input: "/assets/pie_bench/image/image95.jpg",
    output: "/assets/pie_bench/edited_result/edit95.jpg",
    src_prompt: "a painting of a fairy with green wings holding a glowing jar",
    edit_prompt: "a painting of a fairy with purple wings holding a white crystal ball"
  },
  {
    input: "/assets/pie_bench/image/image98.jpg",
    output: "/assets/pie_bench/edited_result/edit98.jpg",
    src_prompt: "a light bulb hanging from a wire with sky in the background",
    edit_prompt: "a cat hanging from a wire with grass in the background"
  }
]
function DiffHighlight({
  source,
  target,
  type = "added"
}: {
  source: string;
  target: string;
  type?: "added" | "removed"
}) {
  const sourceWords = useMemo(() =>
    source.toLowerCase().replace(/[.,]/g, "").split(/\s+/),
    [source]
  );

  const targetWords = target.split(/\s+/);

  return (
    <>
      {targetWords.map((word, i) => {
        const cleanWord = word.toLowerCase().replace(/[.,]/g, "");
        const isDifferent = !sourceWords.includes(cleanWord);

        return (
          <span
            key={i}
            className={isDifferent
              ? type === "added"
                ? "bg-accent/20 text-accent px-0.5 rounded font-bold underline decoration-accent/30"
                : "text-muted-foreground/60 line-through decoration-red-500/50"
              : ""
            }
          >
            {word}{" "}
          </span>
        );
      })}
    </>
  );
}

import { Skeleton } from "@/components/ui/skeleton"

export function ExampleGallery() {
  const [index, setIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState([false, false])

  const setIndexAndReset = (newIndex: number) => {
    setImagesLoaded([false, false])
    setIndex(newIndex)
  }

  const next = () => setIndexAndReset((index + 1) % EXAMPLES.length)
  const prev = () => setIndexAndReset((index - 1 + EXAMPLES.length) % EXAMPLES.length)

  const current = EXAMPLES[index];

  const handleImageLoad = (imgIndex: number) => {
    setImagesLoaded(prev => {
      if (prev[imgIndex]) return prev
      const newState = [...prev]
      newState[imgIndex] = true
      return newState
    })
  }

  const allImagesLoaded = imagesLoaded[0] && imagesLoaded[1]

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="relative">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start px-8 md:px-20">


          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-sm aspect-square rounded-[1.5rem] overflow-hidden relative shadow-xl border border-border group bg-muted/20">
              {!allImagesLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full rounded-[1.5rem]" />
              )}
              <img
                key={current.input}
                src={current.input}
                ref={(node) => {
                  if (node?.complete) handleImageLoad(0)
                }}
                onLoad={() => handleImageLoad(0)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${allImagesLoaded ? 'opacity-100 group-hover:scale-105 transition-transform' : 'opacity-0'
                  }`}
                alt="Original"
              />
              <div className="absolute top-4 left-4 text-[9px] font-black tracking-widest text-muted-foreground/70 bg-background/90 px-2.5 py-1 rounded-full backdrop-blur-md border border-border">
                BEFORE
              </div>
            </div>
            <div className={`mt-8 text-center px-2 transition-opacity duration-500 ${allImagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 italic">
                <DiffHighlight source={current.edit_prompt} target={current.src_prompt} type="removed" />
              </p>
            </div>
          </div>


          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-sm aspect-square rounded-[1.5rem] overflow-hidden relative shadow-xl border border-accent/20 group bg-muted/20">
              {!allImagesLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full rounded-[1.5rem]" />
              )}
              <img
                key={current.output}
                src={current.output}
                ref={(node) => {
                  if (node?.complete) handleImageLoad(1)
                }}
                onLoad={() => handleImageLoad(1)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${allImagesLoaded ? 'opacity-100 group-hover:scale-105 transition-transform' : 'opacity-0'
                  }`}
                alt="Edited"
              />
              <div className="absolute top-4 left-4 text-[9px] font-black tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full backdrop-blur-md border border-accent/20">
                AFTER
              </div>
            </div>
            <div className={`mt-8 text-center px-2 transition-opacity duration-500 ${allImagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-base md:text-lg leading-relaxed font-semibold text-foreground">
                <DiffHighlight source={current.src_prompt} target={current.edit_prompt} type="added" />
              </p>
            </div>
          </div>
        </div>


        <div className="absolute inset-y-0 -left-2 md:-left-4 flex items-center">
          <button
            onClick={prev}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent text-white shadow-lg hover:scale-105 active:scale-90 transition-all z-30 border border-white/20"
            aria-label="Previous"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
        </div>

        <div className="absolute inset-y-0 -right-2 md:-right-4 flex items-center">
          <button
            onClick={next}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent text-white shadow-lg hover:scale-105 active:scale-90 transition-all z-30 border border-white/20"
            aria-label="Next"
          >
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>
        </div>
      </div>


      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="flex gap-1.5 items-center">
          {EXAMPLES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndexAndReset(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-accent w-10" : "bg-muted-foreground/15 w-2 hover:bg-accent/20"
                }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold font-mono text-muted-foreground/50 tracking-widest">
          SAMPLE {index + 1} OF {EXAMPLES.length}
        </span>
      </div>
    </section>
  )
}