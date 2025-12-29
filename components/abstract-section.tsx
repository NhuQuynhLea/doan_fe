export function AbstractSection() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Abstract</h2>
      <div className="glass-panel p-12 leading-relaxed text-lg text-muted-foreground">
        <p className="mb-6">
          Instruction-guided image editing has advanced rapidly with the emergence of large multimodal generative models. However, the design of modular, high-performance image editing systems that overcome the dual barriers of computational cost and cultural representational bias remains an open challenge. This work presents a resource-efficient pipeline based on the Qwen-Image-Edit (2509) framework, enabling high-fidelity edits on consumer-grade hardware while preserving the authentic identity of the Nhật Bình, a traditional Vietnamese ceremonial garment. Key contributions include: (1) a comprehensive review of recent advances in diffusion-based image generation and editing; (2) Build a few-step, low-VRAM text-guided image editing pipeline using Qwen-Image-Edit (2509), combining LoRA-based four-step inference with quantized model weights for deployment on GPU servers; (3) training a specialized Nhật Bình LoRA compatible with both text-to-image and instruction-guided tasks to mitigate cultural hallucinations and ensure geometric fidelity; and (4) rigorous evaluations achieving a competitive overall score of 4.16 on ImgEdit-Bench for general editing integrity, alongside qualitative user preference studies demonstrating reduced representational harm and improved preservation of key design elements such as the square collar and Ngũ Thân bands. These contributions advance accessible, culturally grounded image editing for heritage preservation, fashion design, and digital content creatio
        </p>
        
      </div>
    </section>
  )
}
