import { CalendarDays, Dot, User } from "lucide-react"
import Link from "next/link"

import { Badge } from "../components/ui/badge"
import { listMdxPosts } from "../lib/mdx-posts"

export type MdxBlogProps = {
  /** Prefiks rute publik, mis. `/blogs` */
  targetDir: string
  /** Folder konten MDX relatif ke cwd; bawaan `mdx-content` */
  contentDir?: string
}

const MAX_VISIBLE_TAGS = 3

const tagBadgeClassName =
  "bg-indigo-600/10 text-indigo-500 dark:bg-indigo-500/35 dark:text-indigo-300"

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
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 py-24 md:grid-cols-2 lg:grid-cols-3 lg:py-42">
        {blogPosts.map((post) => (
          <Link href={post.link} key={post.link}>
            <div className="overflow-hidden rounded-xl bg-muted p-2 pb-4">
              <div className="px-2 py-1">
                {post.tags.length > 0 ? (
                  <div className="-ms-0.5 mt-4 flex flex-wrap items-center gap-2">
                    {post.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
                      <Badge
                        className={tagBadgeClassName}
                        key={tag}
                        variant="secondary"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > MAX_VISIBLE_TAGS ? (
                      <Badge className={tagBadgeClassName} variant="secondary">
                        +{post.tags.length - MAX_VISIBLE_TAGS}
                      </Badge>
                    ) : null}
                  </div>
                ) : null}
                <h3 className="mt-4 text-xl font-medium tracking-[-0.015em]">
                  {post.title}
                </h3>
                <div className="mt-3 flex items-center gap-1">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(post.publishedDate)}
                  </div>
                  <Dot className="text-muted-foreground" />
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <User className="h-4 w-4" /> {post.author}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
