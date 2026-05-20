"use client"

import type { CSSProperties } from "react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../components/ui/sidebar"
import { useIsMobile } from "../hooks/use-mobile"
import type { TocItem } from "../lib/heading-slug"
import { cn } from "../lib/utils"
import { mdxTocLayoutVars, type MdxTocLayoutCssVars } from "../lib/toc-vars"

const tocSidebarClassName = "mdx-toc-sidebar"

function tocSidebarPositionStyle(
  vars: MdxTocLayoutCssVars & Partial<MdxTocLayoutCssVars>
): Pick<CSSProperties, "top" | "bottom" | "height"> {
  const header = vars["--header-height"] ?? "4.5rem"
  const extra = vars["--toc-top-extra"] ?? "6rem"
  const footer = vars["--footer-height"] ?? "8rem"

  return {
    top: `calc(${header} + ${extra})`,
    bottom: footer,
    height: `calc(100svh - ${header} - ${extra} - ${footer})`,
  }
}

function TableOfContents({
  items,
  layoutStyle,
}: {
  items: TocItem[]
  layoutStyle: MdxTocLayoutCssVars & Partial<MdxTocLayoutCssVars>
}) {
  return (
    <Sidebar
      side="right"
      collapsible="offcanvas"
      variant="sidebar"
      className={tocSidebarClassName}
      style={tocSidebarPositionStyle(layoutStyle)}
    >
      <SidebarHeader>
        <SidebarGroupLabel>Daftar isi</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild size="sm">
                    <Link
                      href={`#${item.id}`}
                      className="mdx-toc-link"
                      data-level={item.level}
                    >
                      {item.text}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export type TocLayoutProps = {
  items: TocItem[]
  children: React.ReactNode
  className?: string
  /** Override variabel layout (opsional) */
  layoutVars?: Partial<MdxTocLayoutCssVars>
}

function resolveTocLayoutStyle(
  overrides?: Partial<MdxTocLayoutCssVars>
): CSSProperties {
  return { ...mdxTocLayoutVars, ...overrides } as CSSProperties
}

function TocContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="mdx-toc-center">
      <div className={cn("mdx-toc-inner", className)}>{children}</div>
    </div>
  )
}

/** Layout: sidebar TOC kanan (desktop), konten tetap di tengah. */
export function TocLayout({
  items,
  children,
  className,
  layoutVars,
}: TocLayoutProps) {
  const isMobile = useIsMobile()

  if (items.length === 0) {
    return (
      <div className={cn("mdx-toc-simple", className)}>{children}</div>
    )
  }

  if (isMobile) {
    return (
      <div className={cn("mdx-toc-simple", className)}>
        {children}
      </div>
    )
  }

  const layoutStyle = { ...mdxTocLayoutVars, ...layoutVars }

  return (
    <div
      className="mdx-toc-layout w-full"
      style={resolveTocLayoutStyle(layoutVars)}
    >
      <SidebarProvider defaultOpen>
        <SidebarInset>
          <TocContent className={className}>{children}</TocContent>
        </SidebarInset>
        <TableOfContents items={items} layoutStyle={layoutStyle} />
      </SidebarProvider>
    </div>
  )
}
