import { CalendarDays, Dot, User } from "lucide-react"
import Link from "next/link"

import { MdxStyleRegistry } from "../components/mdx-style-registry"
import { Badge } from "../components/ui/badge"
import { listMdxPosts } from "../lib/mdx-posts"

export type MdxBlogProps = {
  /** Prefiks rute publik, mis. `/blogs` */
  targetDir: string
  /** Folder konten MDX relatif ke cwd; bawaan `mdx-content` */
  contentDir?: string
}

const MAX_VISIBLE_TAGS = 3

const formatDate = (date: string) => {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default async function MdxBlog({ targetDir, contentDir }: MdxBlogProps) {
  const blogPosts = await listMdxPosts(targetDir, contentDir)

  return (
    <div className="mdx-root">
      <MdxStyleRegistry />
      <section className="mdx-blog-section">
        <div className="mdx-blog-grid">
          {blogPosts.map((post) => (
            <Link href={post.link} key={post.link} className="mdx-blog-card">
              <div className="mdx-blog-card__inner">
                {post.tags.length > 0 ? (
                  <div className="mdx-blog-card__tags">
                    {post.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
                      <Badge
                        className="mdx-blog-tag"
                        key={tag}
                        variant="secondary"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > MAX_VISIBLE_TAGS ? (
                      <Badge className="mdx-blog-tag" variant="secondary">
                        +{post.tags.length - MAX_VISIBLE_TAGS}
                      </Badge>
                    ) : null}
                  </div>
                ) : null}
                <h3 className="mdx-blog-card__title">{post.title}</h3>
                <div className="mdx-blog-card__meta">
                  <div className="mdx-blog-card__meta-row">
                    <CalendarDays />
                    {formatDate(post.publishedDate)}
                  </div>
                  <Dot className="mdx-blog-card__dot" />
                  <div className="mdx-blog-card__meta-row">
                    <User /> {post.author}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
