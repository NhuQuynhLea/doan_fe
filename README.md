# Image Editor

Next.js (App Router) web UI for text-guided image editing, built for a graduation thesis project.

The home page is a single scrolling research-style landing page composed of multiple sections:

- Research header (title/authors/links + auth)
- Example gallery (before/after)
- Interactive sandbox (upload image + send prompt to inference API)
- Abstract
- Qualitative evaluation table (multiple model outputs, zoomable)
- Quantitative figures
- Methodology/system architecture (zoomable diagram)

## Links

- Paper: https://drive.google.com/file/d/1Pk0xeJBA7fYdZYifCVF2tKjv1jEBcwks/view
- Dataset: https://github.com/Zero-zx/dataset_nhat_binh
- Backend/API: https://github.com/linhtran6065/DoAn-Qwen-Backend/tree/main


## Features

- Upload an image and run instruction-guided editing.
- Two inference “engines” in the UI:
  - Standard (uses `positive_prompt` + optional `negative_prompt`)
  - SwiftEdit (uses `file` + `src_p` + `edit_p`)
- Save generated edits to a per-user history (Supabase).
- View/delete saved history items.
- Built-in qualitative and quantitative evaluation sections using assets under `public/assets`.
- Click-to-zoom image preview modals (evaluation images + system architecture figure).

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS (Tailwind v4)
- Supabase (`@supabase/supabase-js`) for authentication + persistence of edit history
- Vercel Analytics (`@vercel/analytics`)

## Project Structure (high level)

```text
app/
  layout.tsx            # ThemeProvider + AuthProvider + Analytics
  page.tsx              # Renders the main landing page sections
  globals.css           # Tailwind + design tokens + shared component classes
components/
  research-header.tsx   # Title/authors + Paper/Code/Dataset links + auth modal
  example-gallery.tsx   # Before/after carousel using assets under public/
  interactive-sandbox.tsx # Upload + prompt + call inference API + save history
  eval-table.tsx        # Qualitative comparison table (loads public assets)
  quantitative-eval-table.tsx # Quantitative figures
  methodology-section.tsx # System architecture figure (click-to-zoom)
  auth-model.tsx        # Login/signup modal
  history-view.tsx      # User edit history modal
hooks/
  use-auth.tsx          # Supabase auth + edit history CRUD
lib/
  supabase.ts           # Supabase client (requires env vars)
public/
  assets/               # Static images + evaluation result folders
```

## Getting Started

### Install

Use one of the following (pick one and stay consistent):

```bash
npm install
```

or

```bash
pnpm install
```

### Run (development)

```bash
npm run dev
```

Then open http://localhost:3000

### Build / Start (production)

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Configuration

### Supabase

This project requires the following environment variables at runtime (see `lib/supabase.ts`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If either value is missing, the app will throw on startup.

The UI stores saved generations in a Supabase table named `edit_history` (see `hooks/use-auth.tsx`).
Fields used by the frontend:

- `user_id`
- `input_image`
- `edited_image`
- `prompt`
- `created_at`

### Inference API Endpoint

The interactive sandbox calls a remote inference endpoint via `fetch` (see `components/interactive-sandbox.tsx`).
The endpoint URL is currently hardcoded in the component.

## Assets & Evaluation Data

- The qualitative evaluation table loads `result.txt` + images from folders under:
  - `public/assets/nhat_binh/`
- Example gallery uses PIE-Bench images under:
  - `public/assets/pie_bench/`

## Notes

- `next.config.mjs` sets `images.unoptimized = true`.
- TypeScript build errors are ignored via `typescript.ignoreBuildErrors = true`.
