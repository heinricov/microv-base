# microv-mdx

Komponen React (App Router) untuk membaca file MDX dari disk dan merender dengan `next-mdx-remote`, termasuk typography, preview blok kode, dan Shiki.

## Instal

```bash
npm install microv-mdx
```

Peer dependencies: `next`, `react`, `react-dom`, `next-themes`.

Tambahkan ke `next.config` penggunaan paket ini:

```js
transpilePackages: ["microv-mdx"],
```

Pastikan `tailwind` mengimpor sumber styles (opsional, untuk token tema shadcn):

```css
@import "microv-mdx/styles/globals.css";
```

Atau sesuaikan `@source` Tailwind agar memindai `node_modules/microv-mdx/dist` jika Anda hanya memakai kelas utilitas.

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

- `source`: subpath di bawah folder konten (mis. `mdx-content/docs` jika `source="/docs"`).
- `slug`: segmen URL dari rute catch-all opsional.
- `contentDir`: bawaan `"mdx-content"` (relatif `process.cwd()` — biasanya root app Next).

Ekspor tambahan: `mdxComponents`, `PageHeader`, tipe `ShikiTheme`.

## Nama paket npm

Paket ini diterbitkan sebagai **`microv-mdx`** (tanpa `@`). Bentuk `import { … } from "@microv-mdx"` **bukan** nama npm yang valid; gunakan:

```ts
import { MdxReading } from "microv-mdx"
```

Untuk paket berscope, terbitkan sendiri sebagai misalnya `@organisasi/microv-mdx` dan sesuaikan `name` di `package.json`.
