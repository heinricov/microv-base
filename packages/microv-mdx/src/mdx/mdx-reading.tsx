import "../styles/globals.css"

import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

import { createMdxComponents, PageHeader } from "./mdx-components"
import { TocLayout } from "./toc"
import { extractHeadings } from "../lib/heading-slug"
import { mdxRemoteOptions } from "../lib/mdx-remote-options"

export type MdxReadingProps = {
  /** Subpath di bawah folder konten, mis. `/docs` → `{cwd}/mdx-content/docs` */
  source: string
  /** Segmen rute setelah prefiks (mis. dari `[[...slug]]`) */
  slug?: string[]
  /** Nama folder MDX relatif ke cwd; bawaan: `mdx-content` */
  contentDir?: string
  className?: string
}

function normalizeFrontmatterTags(value: unknown): string[] | undefined {
  if (value == null) return undefined
  if (Array.isArray(value)) {
    const strings = value
      .filter((item): item is string => typeof item === "string")
      .map((s) => s.trim())
      .filter(Boolean)
    return strings.length > 0 ? strings : undefined
  }
  if (typeof value === "string") {
    const s = value.trim()
    return s ? [s] : undefined
  }
  return undefined
}

async function resolveMdxFile(
  baseDir: string,
  slug: string[] | undefined
): Promise<string | null> {
  const segments = slug?.filter(Boolean) ?? []

  if (segments.length === 0) {
    const indexPath = path.join(baseDir, "index.mdx")
    try {
      await fs.access(indexPath)
      return indexPath
    } catch {
      return null
    }
  }

  const asFile = `${path.join(baseDir, ...segments)}.mdx`
  const asIndex = path.join(baseDir, ...segments, "index.mdx")

  try {
    await fs.access(asFile)
    return asFile
  } catch {
    /* coba index.mdx di subfolder */
  }

  try {
    await fs.access(asIndex)
    return asIndex
  } catch {
    return null
  }
}

export async function MdxReading({
  source,
  slug,
  contentDir = "mdx-content",
  className,
}: MdxReadingProps) {
  const normalizedSource = source.replace(/^\/+/, "").replace(/\/+$/, "")
  const baseDir = path.join(process.cwd(), contentDir, normalizedSource)
  const resolved = await resolveMdxFile(baseDir, slug)

  if (!resolved) {
    notFound()
  }

  const raw = await fs.readFile(resolved, "utf8")
  const { data, content } = matter(raw)

  const title = data.title
  const description = data.description
  const hasTitleDescriptionFrontmatter =
    typeof title === "string" &&
    typeof description === "string" &&
    title.trim().length > 0 &&
    description.trim().length > 0

  const tag = normalizeFrontmatterTags(data.tag)
  const tocItems = extractHeadings(content)
  const components = createMdxComponents()

  return (
    <TocLayout items={tocItems} className={className}>
      {hasTitleDescriptionFrontmatter ? (
        <PageHeader
          title={title.trim()}
          description={description.trim()}
          tag={tag}
        />
      ) : null}
      <div className="mb-10">
        <MDXRemote
          source={content}
          components={components}
          options={mdxRemoteOptions}
        />
      </div>
    </TocLayout>
  )
}
