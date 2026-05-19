import type { ComponentPropsWithoutRef } from "react"
import Link from "next/link"

import { cn } from "../lib/utils"

export function TypographyH1({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
      {...props}
    >
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
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
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
    <h3
      className={cn(
        "scroll-m-20 border-none text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
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
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
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
    <p className={cn("leading-7 not-first:mt-6", className)} {...props}>
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
    <blockquote
      className={cn(
        "mt-6 border-l-2 bg-muted/50 p-4 pl-6 text-muted-foreground italic",
        className
      )}
      {...props}
    >
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
    <strong className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </strong>
  )
}

export function TypographyList({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
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
    <ol
      className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
      {...props}
    >
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
  const mergedClassName = cn(
    "font-medium text-foreground underline underline-offset-4 transition-colors hover:text-blue-600 dark:hover:text-blue-400",
    className
  )

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
