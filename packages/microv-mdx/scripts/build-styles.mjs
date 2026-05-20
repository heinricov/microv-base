import fs from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import postcss from "postcss"
import tailwindcss from "@tailwindcss/postcss"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const input = join(root, "src", "styles", "mdx-tailwind.src.css")
const output = join(root, "dist", "styles", "mdx-bundle.css")

const css = await fs.readFile(input, "utf8")
let result = await postcss([tailwindcss()]).process(css, { from: input })

/** Hapus :root/:host bawaan Tailwind agar tidak menimpa token dari globals.css app */
result.css = result.css.replace(
  /^@layer properties;\s*:root,\s*:host\s*\{[\s\S]*?\}\s*/m,
  "@layer properties;\n"
)

await fs.mkdir(dirname(output), { recursive: true })
await fs.writeFile(output, result.css)

console.log("Built", output)
