/**
 * Token layout TOC — dipakai oleh `TocLayout` / `MdxReading`.
 * App konsumen tidak perlu menambah `--header-height`, `--footer-height`, atau `--toc-right` di `globals.css`.
 */
export const mdxTocLayoutVars = {
  /** Tinggi area navbar fixed */
  "--header-height": "4.5rem",
  /** Jarak tambahan di bawah navbar sebelum TOC */
  "--toc-top-extra": "3rem",
  /** Offset bawah (footer) */
  "--footer-height": "8rem",
  /** Lebar kolom konten MDX — harus selaras dengan `max-w-3xl` di `TocLayout` */
  "--mdx-content-max-width": "48rem",
  /** Lebar sidebar TOC (selaras dengan `--sidebar-width` shadcn) */
  "--mdx-toc-sidebar-width": "16rem",
  /** Jarak dari tepi kanan viewport — sejajar dengan tepi kanan konten */
  "--toc-right":
    "max(1rem, calc(50vw - var(--mdx-content-max-width) / 2 - var(--mdx-toc-sidebar-width) - 0.5rem))",
} as const

export type MdxTocLayoutCssVars = typeof mdxTocLayoutVars
