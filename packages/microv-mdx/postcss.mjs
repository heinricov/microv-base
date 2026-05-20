import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import postcss from "postcss"

const require = createRequire(import.meta.url)
const packageRoot = dirname(require.resolve("microv-mdx/package.json"))
const sourceGlob = join(packageRoot, "dist", "**", "*.{js,mjs}").replace(/\\/g, "/")

/**
 * Tambahkan @source microv-mdx ke globals.css app (Tailwind v4).
 * Pasang di postcss.config app:
 *   import microvMdxPostcss from "microv-mdx/postcss"
 *   plugins: { "@tailwindcss/postcss": {}, "microv-mdx": microvMdxPostcss() }
 */
export default function microvMdxPostcss() {
  return {
    postcssPlugin: "microv-mdx",
    Once(root, { result }) {
      const from = result.opts.from ?? ""
      if (!from.includes("globals.css")) return

      const hasSource = root.nodes.some(
        (node) =>
          node.type === "atrule" &&
          node.name === "source" &&
          String(node.params).includes("microv-mdx")
      )
      if (hasSource) return

      root.prepend(
        postcss.atRule({ name: "source", params: `"${sourceGlob}"` })
      )
    },
  }
}

microvMdxPostcss.postcss = true
