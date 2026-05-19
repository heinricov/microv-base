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
  SidebarTrigger,
} from "../components/ui/sidebar"
import type { TocItem } from "../lib/heading-slug"
import { cn } from "../lib/utils"
import { mdxTocLayoutVars, type MdxTocLayoutCssVars } from "./toc-vars"

const levelIndent: Record<TocItem["level"], string> = {
  1: "font-medium",
  2: "pl-2",
  3: "pl-4 text-xs",
  4: "pl-6 text-xs text-muted-foreground",
}

const tocSidebarClassName = cn("!right-[var(--toc-right)]", "border-l")

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
      <SidebarHeader className="border-b px-4 py-3">
        <SidebarGroupLabel className="text-xs font-semibold tracking-wide uppercase">
          Daftar isi
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto px-2 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    size="sm"
                    className={cn("h-auto py-1.5", levelIndent[item.level])}
                  >
                    <Link href={`#${item.id}`}>{item.text}</Link>
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

/** Layout: sidebar TOC kanan (desktop), konten tetap di tengah. */
export function TocLayout({
  items,
  children,
  className,
  layoutVars,
}: TocLayoutProps) {
  if (items.length === 0) {
    return (
      <div className={cn("mx-auto mb-10 max-w-3xl space-y-5 px-4", className)}>
        {children}
      </div>
    )
  }

  return (
    <div
      className="mdx-toc-layout w-full"
      style={resolveTocLayoutStyle(layoutVars)}
    >
      <SidebarProvider defaultOpen>
        <SidebarInset>
          <div className="flex items-center gap-2 border-b px-4 py-2 md:hidden">
            <SidebarTrigger />
            <span className="text-sm font-medium">Daftar isi</span>
          </div>
          <div className="flex justify-center px-4 py-6">
            <div
              className={cn(
                "w-full max-w-3xl space-y-5",
                className
              )}
            >
              {children}
            </div>
          </div>
        </SidebarInset>
        <TableOfContents
          items={items}
          layoutStyle={{ ...mdxTocLayoutVars, ...layoutVars }}
        />
      </SidebarProvider>
    </div>
  )
}

