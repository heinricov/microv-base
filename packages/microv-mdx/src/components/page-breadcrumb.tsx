"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export type PageBreadcrumbProps = {
  /** Label item terakhir (mis. dari frontmatter `title`) */
  currentLabel?: string
  /** Label untuk tautan Home */
  homeLabel?: string
  homeHref?: string
}

type BreadcrumbCrumb = {
  href: string
  label: string
}

function formatSegment(segment: string): string {
  const decoded = decodeURIComponent(segment)
  return decoded
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function buildCrumbsFromPathname(
  pathname: string,
  { currentLabel, homeLabel, homeHref }: PageBreadcrumbProps
): BreadcrumbCrumb[] {
  const segments = pathname.split("/").filter(Boolean)
  const crumbs: BreadcrumbCrumb[] = [
    { href: homeHref ?? "/", label: homeLabel ?? "Home" },
  ]

  let path = ""
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (!segment) continue
    path += `/${segment}`
    const isLast = i === segments.length - 1
    crumbs.push({
      href: path,
      label:
        isLast && currentLabel?.trim()
          ? currentLabel.trim()
          : formatSegment(segment),
    })
  }

  return crumbs
}

const MAX_CRUMBS_WITHOUT_COLLAPSE = 4

export function PageBreadcrumb(props: PageBreadcrumbProps) {
  const pathname = usePathname()
  const crumbs = buildCrumbsFromPathname(pathname, props)

  if (crumbs.length <= 1) {
    return null
  }

  const first = crumbs[0]!
  const last = crumbs[crumbs.length - 1]!
  const beforeLast =
    crumbs.length > 2 ? crumbs[crumbs.length - 2]! : undefined
  const shouldCollapse = crumbs.length > MAX_CRUMBS_WITHOUT_COLLAPSE

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={first.href}>{first.label}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {shouldCollapse ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon-sm" variant="ghost">
                    <BreadcrumbEllipsis />
                    <span className="sr-only">Lebih banyak</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    {crumbs.slice(1, -2).map((crumb) => (
                      <DropdownMenuItem key={crumb.href} asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            {beforeLast ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={beforeLast.href}>{beforeLast.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : null}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{last.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          crumbs.slice(1).map((crumb, index, rest) => {
            const isLast = index === rest.length - 1
            return (
              <Fragment key={crumb.href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
