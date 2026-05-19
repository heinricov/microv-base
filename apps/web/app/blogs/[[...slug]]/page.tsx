import { MdxReading } from "@packages/microv-mdx"

type PageProps = {
  params: Promise<{ slug?: string[] }>
}

export default async function BlogsPage({ params }: PageProps) {
  const { slug } = await params
  return <MdxReading source="/blogs" slug={slug} />
}
