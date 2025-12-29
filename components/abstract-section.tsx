import React from 'react';

export function AbstractSection() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      {/* text-foreground ensures the heading is crisp in Light Mode */}
      <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Abstract</h2>
      
      {/* glass-panel for the background, text-muted-foreground for body text contrast */}
      <div className="glass-panel p-8 md:p-12 leading-relaxed text-lg text-muted-foreground">
        <p className="text-justify">
          Instruction-guided image editing has advanced rapidly with large multimodal generative models, 
          while practical deployment has traditionally been hindered by high computational demands and 
          cultural biases from internet-scale training data. This work presents a modular, 
          high-performance image editing pipeline that overcomes the dual barriers of computational 
          cost and cultural representational bias, built on the Qwen-Image-Edit (2509) framework to 
          enable high-fidelity edits on consumer-grade hardware while preserving the authentic identity 
          of the <span className="text-foreground font-medium italic">Nhật Bình</span>, a traditional 
          Vietnamese ceremonial garment. Key contributions include: (1) a comprehensive review of recent 
          advances in diffusion-based image generation and editing; (2) Build a few-step, low-VRAM text-guided image editing pipeline using Qwen-Image-Edit (2509), combining LoRA-based four-step inference with quantized model weights for deployment on GPU servers, reducing latency to 
          <span className="text-accent font-bold"> under 20 seconds</span>; (3) training a specialized 
          Nhật Bình LoRA compatible with both text-to-image and instruction-guided tasks to mitigate cultural 
          hallucinations and ensure geometric fidelity; and (4) rigorous evaluations, achieving a competitive 
          overall score of <span className="text-accent font-bold">4.16</span> on ImgEdit-Bench for general 
          editing integrity, alongside qualitative assessments via user preference surveys showing reduced 
          representational harm and improved preservation of key features like the square collar and 
          Ngũ Thân bands. These advancements democratize AI for heritage preservation, fashion design, 
          and digital content creation, promoting cultural accuracy on accessible platforms.
        </p>
      </div>
    </section>
  );
}