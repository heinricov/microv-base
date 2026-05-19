import remarkGfm from "remark-gfm"

/**
 * Opsi `MDXRemote` bersama. Tanpa `remark-gfm`, tabel GFM berpipa (`| kolom |`)
 * tidak di-parse dan hanya muncul sebagai teks biasa di paragraf.
 */
export const mdxRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
}
