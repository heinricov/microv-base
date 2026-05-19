import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import { MDXRemote } from "next-mdx-remote/rsc"

import { ComponentPreview } from "../components/component-preview"
import { mdxTableComponents } from "../components/table"
import { mdxRemoteOptions } from "./mdx-remote-options"
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLink,
  TypographyList,
  TypographyOrderedList,
  TypographyP,
  TypographyStrong,
} from "../components/typography"

export { default as PageHeader } from "../components/page-header"

type MdxComponentMap = NonNullable<MDXRemoteProps["components"]>

function nodeToPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number")
    return String(node)
  if (Array.isArray(node)) return node.map(nodeToPlainText).join("")
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return nodeToPlainText(props.children)
  }
  return ""
}

/** Fence live preview + kode: gunakan ```preview ... ``` — isi di-parse sebagai MDX (`MDXRemote`). */
const PREVIEW_FENCE_LANG = "preview"

function extractFenceFromPre(children: ReactNode): {
  lang: string | null
  code: string
} {
  let lang: string | null = null
  let code = ""

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return

    const elType = child.type
    const isCode =
      elType === "code" ||
      (typeof elType === "string" && elType === "code")

    if (!isCode) return

    const props = child.props as {
      className?: string
      children?: ReactNode
    }
    const cls = props.className ?? ""
    const match = cls.match(/language-([\w.-]+)/)
    lang = match?.[1] ?? null
    code = nodeToPlainText(props.children).replace(/\r\n/g, "\n")
  })

  return { lang, code: code.replace(/\n$/, "") }
}

const highlightLangForFence = (lang: string) =>
  lang === "mdx" || lang === PREVIEW_FENCE_LANG ? "markdown" : lang

function createMdxComponents(): MdxComponentMap {
  const elements: Omit<MdxComponentMap, "pre"> = {
    ...mdxTableComponents,
    h1: TypographyH1,
    h2: TypographyH2,
    h3: TypographyH3,
    h4: TypographyH4,
    p: TypographyP,
    a: TypographyLink,
    strong: TypographyStrong,
    blockquote: TypographyBlockquote,
    ul: TypographyList,
    ol: TypographyOrderedList,
  }

  let full: MdxComponentMap

  full = {
    ...elements,
    pre(props: ComponentPropsWithoutRef<"pre">) {
      const { lang, code } = extractFenceFromPre(props.children)
      if (lang === PREVIEW_FENCE_LANG && code.length > 0) {
        return (
          <ComponentPreview
            code={code}
            language={highlightLangForFence(lang)}
          >
            <MDXRemote
              source={code}
              components={full}
              options={mdxRemoteOptions}
            />
          </ComponentPreview>
        )
      }
      return <pre {...props} />
    },
  }

  return full
}

/** Mapping komponen untuk MDX (`<MDXRemote components={...} />`). */
export const mdxComponents = createMdxComponents()
