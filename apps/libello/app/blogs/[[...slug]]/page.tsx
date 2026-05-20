import { MdxBlog, MdxReading } from "microv-mdx"

type PageProps = {
  params: Promise<{ slug?: string[] }>
}

export default async function BlogsPage({ params }: PageProps) {
  const { slug } = await params

  if (!slug?.length) {
    return <MdxBlog targetDir="/blogs" />
  }

  return <MdxReading source="/blogs" slug={slug} />
}
