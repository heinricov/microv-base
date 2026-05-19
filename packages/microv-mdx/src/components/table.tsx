import type { ComponentProps } from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

import { cn } from "../lib/utils"

/**
 * Bingkai tabel + garis vertikal antar kolom (nuansa pemisah “pipa” seperti di Markdown).
 */
function MdxTable({ className, ...props }: ComponentProps<typeof Table>) {
  return (
    <Table
      className={cn(
        "rounded-md border border-border",
        "[&_th]:border-r [&_td]:border-r [&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0",
        "[&_th]:border-border/80 [&_td]:border-border/80",
        className
      )}
      {...props}
    />
  )
}

/**
 * Pemetaan elemen HTML tabel dari Markdown/MDX ke komponen UI (shadcn-style).
 * Tabel pipa (GFM) merender &lt;table&gt;&lt;thead&gt;…&lt;/thead&gt;&lt;tbody&gt;…&lt;/tbody&gt;
 */
export const mdxTableComponents = {
  table: MdxTable,
  thead: TableHeader,
  tbody: TableBody,
  tfoot: TableFooter,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  caption: TableCaption,
}
