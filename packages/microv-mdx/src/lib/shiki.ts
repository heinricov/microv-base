import { codeToHtml } from "shiki"

export type ShikiTheme =
  | "nord"
  | "github-dark"
  | "github-light"
  | "dracula"
  | "one-dark-pro"
  | "atom-one-dark"
  | "catppuccin-mocha"
  | "vesper"
  | "vitesse-dark"

const themeMap: Record<ShikiTheme, string> = {
  nord: "nord",
  "github-dark": "github-dark",
  "github-light": "github-light",
  dracula: "dracula",
  "one-dark-pro": "one-dark-pro",
  /** Shiki v4 tidak memuat id `atom-one-dark`; dipetakan ke tema terdekat. */
  "atom-one-dark": "one-dark-pro",
  "catppuccin-mocha": "catppuccin-mocha",
  vesper: "vesper",
  "vitesse-dark": "vitesse-dark",
}

export async function highlightCode(
  code: string,
  language: string = "jsx",
  theme: ShikiTheme = "atom-one-dark"
): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang: language,
      theme: themeMap[theme],
    })
    return html
  } catch (error) {
    console.error("Error highlighting code:", error)
    return `<pre><code>${code}</code></pre>`
  }
}
