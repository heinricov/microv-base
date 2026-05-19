import React from "react"

export default function PageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="my-5 mb-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-none font-medium text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
