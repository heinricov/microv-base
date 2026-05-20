# microv-mdx

Komponen React (App Router) untuk membaca file MDX dari disk dan merender dengan `next-mdx-remote`, termasuk typography, breadcrumb, header halaman, badge, tabel GFM, preview blok kode, dan Shiki.

## Instal

```bash
npm install microv-mdx
```

**Peer dependencies:** `next`, `react`, `react-dom`, `next-themes`.

App Next.js Anda boleh memakai Tailwind v4 + PostCSS seperti biasa. **Tidak** perlu menambah `@source` yang memindai `node_modules/microv-mdx` atau impor CSS khusus di `globals.css` hanya agar MDX tampil — gaya untuk konten dan chrome MDX disuntikkan oleh komponen (lihat di bawah).

## Gaya (CSS)

- `MdxReading` dan `MdxBlog` menyertakan **`MdxStyleRegistry`** (client): CSS prose + UI (header, breadcrumb, TOC, kartu blog) di-inline ke dokumen saat halaman dirender.
- Token warna mengikuti app jika Anda sudah mendefinisikan `--foreground`, `--border`, `--muted`, dll. di `globals.css`. Jika tidak ada, dipakai nilai fallback di dalam CSS paket.
- **Opsional** — app tanpa tema sama sekali: impor `microv-mdx/styles/globals.css` di root layout.
- **Opsional** — jika build gagal mengompilasi paket dari `node_modules`, gunakan `withMicrovMdx()` (lihat [Next.js](#nextjs-transpile-paket)).

---

## `MdxReading`

Server component async: memuat **satu** file MDX dari disk, menampilkan header (jika frontmatter lengkap), breadcrumb, isi artikel dengan typography, dan **daftar isi** di desktop (mobile: tanpa sidebar TOC).

### Props

| Prop         | Tipe       | Wajib | Keterangan                                                                                                               |
| ------------ | ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------ |
| `source`     | `string`   | Ya    | Subpath di bawah folder konten, mis. `"/docs"` → `{cwd}/{contentDir}/docs`. Boleh dengan atau tanpa slash di awal/akhir. |
| `slug`       | `string[]` | Tidak | Segmen URL setelah prefiks rute (biasanya dari `params.slug` pada rute `[[...slug]]`).                                   |
| `contentDir` | `string`   | Tidak | Bawaan `"mdx-content"` — folder relatif ke `process.cwd()` (biasanya root app Next).                                     |
| `className`  | `string`   | Tidak | Kelas tambahan pada wrapper konten utama di dalam layout.                                                                |

### Resolusi file

Dengan `base = path.join(process.cwd(), contentDir, sourceNormalisasi)`:

- Tanpa `slug` atau `slug` kosong: dipakai `base/index.mdx` jika ada; jika tidak → `notFound()`.
- Dengan `slug`, mis. `["a", "b"]`: dicoba `base/a/b.mdx`, lalu `base/a/b/index.mdx`; jika tidak ada → `notFound()`.

### Frontmatter (YAML)

- **`title`** dan **`description`** (string, tidak kosong): menampilkan blok header halaman (judul + deskripsi + tag).
- **`tag`** (opsional): string tunggal atau array string — ditampilkan sebagai badge di header.

### Contoh: halaman docs dengan catch-all

Struktur file:

```text
mdx-content/
  docs/
    index.mdx
    panduan/
      index.mdx
    referensi.mdx
```

Rute `app/docs/[[...slug]]/page.tsx`:

```tsx
import { MdxReading } from "microv-mdx"

type PageProps = {
  params: Promise<{ slug?: string[] }>
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params
  return <MdxReading source="/docs" slug={slug} />
}
```

- `/docs` → `mdx-content/docs/index.mdx`
- `/docs/referensi` → `mdx-content/docs/referensi.mdx`
- `/docs/panduan` → `mdx-content/docs/panduan/index.mdx`

---

## `MdxBlog`

Server component async: memindai folder MDX, mengurutkan menurut tanggal, menampilkan **grid** kartu artikel (judul, tanggal, penulis, tag; jika tag lebih dari 3, sisanya jadi `+N`).

### Props

| Prop         | Tipe     | Wajib | Keterangan                                                                                                              |
| ------------ | -------- | ----- | ----------------------------------------------------------------------------------------------------------------------- |
| `targetDir`  | `string` | Ya    | Prefiks rute publik, mis. `"/blogs"` — file dibaca dari `{cwd}/{contentDir}/blogs` dan link kartu menjadi `/blogs/...`. |
| `contentDir` | `string` | Tidak | Bawaan `"mdx-content"`.                                                                                                 |

### File yang dibaca

Di folder `mdx-content/<targetDir-normalisasi>/`:

- setiap `*.mdx` di root folder (slug = nama file tanpa ekstensi);
- setiap subfolder yang punya `index.mdx`, **kecuali** sudah ada file `nama-folder.mdx` dengan slug yang sama (file flat menang).

### Frontmatter per posting

| Field                       | Keterangan                                                            |
| --------------------------- | --------------------------------------------------------------------- |
| `title`                     | Judul; jika kosong, judul diturunkan dari nama slug.                  |
| `date` atau `publishedDate` | Tanggal (string); dipakai urutan & tampilan; bawaan sort jika kosong. |
| `author`                    | Bawaan `"Libello"` jika tidak ada.                                    |
| `tag` atau `tags`           | String atau array — maks. 3 badge + `+N`.                             |

### Contoh: indeks blog

Struktur:

```text
mdx-content/
  blogs/
    apbn.mdx
    ekonomi/
      index.mdx
```

Rute `app/blogs/page.tsx` (atau segmen kosong di `[[...slug]]`):

```tsx
import { MdxBlog } from "microv-mdx"

export default function BlogsIndexPage() {
  return <MdxBlog targetDir="/blogs" />
}
```

Halaman artikel tunggal tetap memakai **`MdxReading`** dengan `source="/blogs"` dan `slug` yang sesuai (mis. `["apbn"]` atau `["ekonomi"]`).

---

## Next.js: transpile paket

Jika Anda melihat error kompilasi untuk `microv-mdx` dari `node_modules`, gabungkan helper:

```js
import { withMicrovMdx } from "microv-mdx/next"

/** @type {import('next').NextConfig} */
export default withMicrovMdx({})
```

Ini menambahkan `microv-mdx` ke `transpilePackages`.

---

## Ekspor utama

- **`MdxReading`**, **`MdxBlog`** (+ tipe `MdxReadingProps`, `MdxBlogProps`)
- **`mdxComponents`**, **`PageHeader`**, **`mdxTableComponents`**
- **`TocLayout`**, **`extractHeadings`**, **`mdxTocLayoutVars`** (jika ingin menyusun layout sendiri)
- **`MdxStyleRegistry`** — biasanya tidak perlu dipanggil manual; sudah dipakai di dalam `MdxReading` / `MdxBlog`
- **`withMicrovMdx`** dari `microv-mdx/next`
- Style opsional: `microv-mdx/styles/globals.css`, `microv-mdx/styles/mdx-runtime.css`, `microv-mdx/styles/mdx-bundle.css`

## Nama paket npm

Paket diterbitkan sebagai **`microv-mdx`**:

```ts
import { MdxReading, MdxBlog } from "microv-mdx"
```
