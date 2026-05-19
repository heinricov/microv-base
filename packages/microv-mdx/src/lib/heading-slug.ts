export type TocItem = {
  level: 1 | 2 | 3 | 4
  text: string
  id: string
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export function createSlugRegistry() {
  const counts = new Map<string, number>()

  return {
    slugifyText(text: string): string {
      const base = slugifyHeading(text)
      if (!base) return "section"
      const n = counts.get(base) ?? 0
      counts.set(base, n + 1)
      return n === 0 ? base : `${base}-${n}`
    },
  }
}

function cleanHeadingLine(raw: string): string {
  return raw
    .trim()
    .replace(/\s+#*\s*$/, "")
    .replace(/\s*\{#[\w-]+\}\s*$/, "")
    .replace(/#+\s*$/, "")
    .trim()
}

/** Ambil heading `#`–`####` dari sumber MDX (abaikan blok kode). */
export function extractHeadings(content: string): TocItem[] {
  const registry = createSlugRegistry()
  const items: TocItem[] = []
  let inFence = false

  for (const line of content.split("\n")) {
    const trimmed = line.trim()

    if (trimmed.startsWith("```")) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = /^(#{1,4})\s+(.+)$/.exec(trimmed)
    const hashes = match?.[1]
    const rawTitle = match?.[2]
    if (!hashes || !rawTitle) continue

    const level = hashes.length as 1 | 2 | 3 | 4
    const text = cleanHeadingLine(rawTitle)
    if (!text) continue

    items.push({
      level,
      text,
      id: registry.slugifyText(text),
    })
  }

  return items
}
