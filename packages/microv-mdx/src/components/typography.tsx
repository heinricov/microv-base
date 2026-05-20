import type { ComponentPropsWithoutRef } from "react"
import Link from "next/link"

import { cn } from "../lib/utils"

export function TypographyH1({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1 className={cn("mdx-h1", className)} {...props}>
      {children}
    </h1>
  )
}

export function TypographyH2({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 className={cn("mdx-h2", className)} {...props}>
      {children}
    </h2>
  )
}

export function TypographyH3({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 className={cn("mdx-h3", className)} {...props}>
      {children}
    </h3>
  )
}

export function TypographyH4({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4 className={cn("mdx-h4", className)} {...props}>
      {children}
    </h4>
  )
}

export function TypographyP({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cn("mdx-p", className)} {...props}>
      {children}
    </p>
  )
}

export function TypographyBlockquote({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote className={cn("mdx-blockquote", className)} {...props}>
      {children}
    </blockquote>
  )
}

export function TypographyStrong({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong className={cn("mdx-strong", className)} {...props}>
      {children}
    </strong>
  )
}

export function TypographyListItem({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"li">) {
  return (
    <li className={cn("mdx-li", className)} {...props}>
      {children}
    </li>
  )
}

export function TypographyList({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul className={cn("mdx-ul", className)} {...props}>
      {children}
    </ul>
  )
}

export function TypographyOrderedList({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol className={cn("mdx-ol", className)} {...props}>
      {children}
    </ol>
  )
}

export function TypographyLink({
  className,
  children,
  href,
  title,
  target,
  rel,
}: ComponentPropsWithoutRef<"a">) {
  const mergedClassName = cn("mdx-a", className)

  if (href == null || href === "") {
    return (
      <span className={mergedClassName} title={title}>
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      className={mergedClassName}
      title={title}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  )
}
