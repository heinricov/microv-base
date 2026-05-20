# microv-mdx

Komponen React (App Router) untuk membaca file MDX dari disk dan merender dengan `next-mdx-remote`, termasuk typography, badge, tabel GFM, preview blok kode, dan Shiki.

## Instal

```bash
npm install microv-mdx
```

Peer dependencies: `next`, `react`, `react-dom`, `next-themes`.

App Next.js Anda tetap membutuhkan Tailwind v4 + PostCSS (`@tailwindcss/postcss`) seperti biasa — **tidak** perlu menambah `@workspace/ui`, `@source` khusus, atau impor CSS tambahan untuk MDX.

### Gaya (CSS)

- **App sudah punya `globals.css`** (shadcn + token `:root` / `@theme`, seperti libello): `MdxReading` / `MdxBlog` hanya memuat `@source` komponen paket + fallback token **ber-layer** sehingga **tema app tidak ditimpa**.
- **App belum punya tema**: impor sekali di `layout.tsx` → `import "microv-mdx/styles/globals.css"` (Tailwind + token lengkap), atau cukup komponen MDX (fallback token ber-layer tetap aktif).

## Penggunaan

```tsx
import { MdxReading } from "microv-mdx"

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  return <MdxReading source="/docs" slug={slug} />
}
```

`MdxReading` dan `MdxBlog` otomatis memuat runtime CSS paket. Cukup pakai komponen di halaman Anda.

- `source`: subpath di bawah folder konten (mis. `mdx-content/docs` jika `source="/docs"`).
- `slug`: segmen URL dari rute catch-all opsional.
- `contentDir`: bawaan `"mdx-content"` (relatif `process.cwd()` — biasanya root app Next).

### Opsional: `next.config`

Jika build gagal mengompilasi paket dari `node_modules`, gabungkan helper ini (satu baris):

```js
import { withMicrovMdx } from "microv-mdx/next"

/** @type {import('next').NextConfig} */
export default withMicrovMdx({})
```

### Opsional: impor CSS lengkap (app tanpa `globals.css`)

```ts
import "microv-mdx/styles/globals.css"
```

## Ekspor

- `MdxReading`, `MdxBlog`, `mdxComponents`, `PageHeader`, `mdxTableComponents`
- `withMicrovMdx` dari `microv-mdx/next`
- `microv-mdx/styles/globals.css` (standalone)
- `microv-mdx/styles/mdx-runtime.css` (runtime, biasanya via komponen)

## Nama paket npm

Paket ini diterbitkan sebagai **`microv-mdx`**. Gunakan:

```ts
import { MdxReading } from "microv-mdx"
```
