import { ArrowRight, CalendarDays, Dot, Mails, User } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const blogPosts = [
  {
    title: "Kapitalis",
    link: "/blogs/kapitalis",
    publishedDate: "2025-06-18",
    author: "Libello",
    image:
      "https://cdn.pixabay.com/photo/2021/08/27/18/50/water-6579313_1280.jpg",
    tags: ["Sejarah", "Kapitalis", "Hukum", "Sosial"],
  },
  {
    title: "Demokrasi",
    link: "/blogs/demokrasi",
    publishedDate: "2025-05-30",
    author: "Libello",
    image:
      "https://cdn.pixabay.com/photo/2020/02/13/06/49/seascape-4844697_1280.jpg",
    tags: ["Sejarah", "Demokrasi", "Hukum", "Sosial"],
  },
  {
    title: "Politik",
    link: "/blogs/politik",
    publishedDate: "2025-05-15",
    author: "Libello",
    image:
      "https://cdn.pixabay.com/photo/2021/08/13/12/51/sea-6543041_1280.jpg",
    tags: ["Sejarah", "Politik", "Hukum", "Sosial"],
  },
  {
    title: "Sosialis",
    link: "/blogs/sosialis",
    publishedDate: "2025-04-25",
    author: "Libello",
    image:
      "https://cdn.pixabay.com/photo/2017/06/22/20/24/dewdrops-2432391_1280.jpg",
    tags: ["Sejarah", "Sosialis", "Hukum", "Sosial"],
  },
  {
    title: "Pajak",
    link: "/blogs/pajak",
    publishedDate: "2025-04-10",
    author: "Libello",
    image:
      "https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_1280.jpg",
    tags: ["Sejarah", "Pajak", "Hukum", "Sosial"],
  },
  {
    title: "Koperasi",
    link: "/blogs/koperasi",
    publishedDate: "2025-03-28",
    author: "Libello",
    image:
      "https://cdn.pixabay.com/photo/2021/08/12/10/38/mountains-6540497_1280.jpg",
    tags: ["Sejarah", "Koperasi", "Hukum", "Sosial"],
  },
]

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function BlogsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 py-24 md:grid-cols-2 lg:grid-cols-3 lg:py-42">
        {blogPosts.map((post) => (
          <Link href={post.link} key={post.link}>
            <div className="overflow-hidden rounded-xl bg-muted p-2 pb-4">
              {/* <div className="relative isolate">
                <img
                  alt={post.title}
                  className="aspect-14/9 rounded-lg bg-muted"
                  src={post.image}
                />
                <img
                  alt={post.title}
                  className="absolute inset-0 -z-10 aspect-17/9 scale-y-110 rounded bg-muted blur-2xl"
                  src={post.image}
                />
              </div> */}
              <div className="px-2 py-1">
                <div className="-ms-0.5 mt-4 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      className="bg-indigo-600/10 text-indigo-500 dark:bg-indigo-500/35 dark:text-indigo-300"
                      key={tag}
                      variant="secondary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="mt-4 text-xl font-medium tracking-[-0.015em]">
                  {post.title}
                </h3>
                <div className="mt-3 flex items-center gap-1">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />{" "}
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
