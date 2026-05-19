# microv-mdx

Komponen React (App Router) untuk membaca file MDX dari disk dan merender dengan `next-mdx-remote`, termasuk typography, badge, tabel GFM, preview blok kode, dan Shiki.

## Instal

```bash
npm install microv-mdx
```

Peer dependencies: `next`, `react`, `react-dom`, `next-themes`.

App Next.js Anda tetap membutuhkan Tailwind v4 + PostCSS (`@tailwindcss/postcss`) seperti biasa — **tidak** perlu menambah `@workspace/ui`, `@source` khusus, atau impor CSS tambahan untuk MDX.

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

`MdxReading` otomatis memuat stylesheet paket (token shadcn, typography, badge, tabel, dll.). Cukup pakai komponen ini di halaman catch-all MDX Anda.

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

### Opsional: impor CSS eksplisit

Biasanya tidak perlu — `MdxReading` sudah mengimpor `microv-mdx/styles/globals.css`. Jika ingin memuat gaya lebih awal (mis. di `layout.tsx`):

```ts
import "microv-mdx/styles/globals.css"
```

## Ekspor

- `MdxReading`, `mdxComponents`, `PageHeader`, `mdxTableComponents`
- `withMicrovMdx` dari `microv-mdx/next`
- `microv-mdx/styles/globals.css`

## Nama paket npm

Paket ini diterbitkan sebagai **`microv-mdx`**. Gunakan:

```ts
import { MdxReading } from "microv-mdx"
```
