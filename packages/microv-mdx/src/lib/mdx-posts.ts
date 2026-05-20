import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"

export type BlogPostListItem = {
  title: string
  link: string
  publishedDate: string
  author: string
  tags: string[]
  image?: string
}

function normalizeRoutePrefix(targetDir: string): string {
  return targetDir.replace(/^\/+/, "").replace(/\/+$/, "")
}

function normalizeTags(value: unknown): string[] {
  if (value == null) return []
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  if (typeof value === "string") {
    const s = value.trim()
    return s ? [s] : []
  }
  return []
}

function formatSlugAsTitle(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function parsePostFile(
  slug: string,
  linkPrefix: string,
  data: Record<string, unknown>
): BlogPostListItem {
  const title =
    typeof data.title === "string" && data.title.trim()
      ? data.title.trim()
      : formatSlugAsTitle(slug)

  const rawDate =
    (typeof data.date === "string" && data.date) ||
    (typeof data.publishedDate === "string" && data.publishedDate) ||
    ""

  const author =
    typeof data.author === "string" && data.author.trim()
      ? data.author.trim()
      : "Libello"

  const tags = normalizeTags(data.tag ?? data.tags)

  const image =
    typeof data.image === "string" && data.image.trim()
      ? data.image.trim()
      : undefined

  return {
    title,
    link: `${linkPrefix}/${slug}`,
    publishedDate: rawDate || new Date(0).toISOString().slice(0, 10),
    author,
    tags,
    image,
  }
}

/**
 * Memuat daftar posting dari folder MDX.
 * @param targetDir Prefiks rute, mis. `/blogs` → `mdx-content/blogs`
 * @param contentDir Folder konten relatif ke cwd (bawaan: `mdx-content`)
 */
export async function listMdxPosts(
  targetDir: string,
  contentDir = "mdx-content"
): Promise<BlogPostListItem[]> {
  const routePrefix = normalizeRoutePrefix(targetDir)
  const linkPrefix = `/${routePrefix}`
  const baseDir = path.join(process.cwd(), contentDir, routePrefix)

  let entries
  try {
    entries = await fs.readdir(baseDir, { withFileTypes: true })
  } catch {
    return []
  }

  const posts: BlogPostListItem[] = []
  const slugsFromFiles = new Set<string>()

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue

    const slug = entry.name.replace(/\.mdx$/, "")
    slugsFromFiles.add(slug)

    const filePath = path.join(baseDir, entry.name)
    const raw = await fs.readFile(filePath, "utf8")
    const { data } = matter(raw)
    posts.push(parsePostFile(slug, linkPrefix, data))
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (slugsFromFiles.has(entry.name)) continue

    const indexPath = path.join(baseDir, entry.name, "index.mdx")
    try {
      await fs.access(indexPath)
    } catch {
      continue
    }

    const raw = await fs.readFile(indexPath, "utf8")
    const { data } = matter(raw)
    posts.push(parsePostFile(entry.name, linkPrefix, data))
  }

  posts.sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  )

  return posts
}
