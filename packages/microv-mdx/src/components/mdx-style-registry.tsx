"use client"

import { mdxInlineStyles } from "../generated/mdx-inline-styles"

/**
 * Menyuntikkan CSS paket langsung ke DOM agar tidak bergantung pada
 * Tailwind scan / import CSS dari node_modules di app konsumen.
 */
export function MdxStyleRegistry() {
  return (
    <style
      data-microv-mdx="styles"
      dangerouslySetInnerHTML={{ __html: mdxInlineStyles }}
    />
  )
}
