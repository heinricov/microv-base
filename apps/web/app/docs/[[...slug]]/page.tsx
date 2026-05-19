import { MdxReading } from "@packages/microv-mdx/src/mdx/mdx-reading";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  return <MdxReading source="/docs" slug={slug} />;
}
