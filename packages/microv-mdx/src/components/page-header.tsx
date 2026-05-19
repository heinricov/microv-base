import React from "react"
import { Badge } from "./ui/badge"
import { PageBreadcrumb } from "./page-breadcrumb"

export default function PageHeader({
  title,
  description,
  tag,
}: {
  title: string
  description: string
  tag?: string[]
}) {
  return (
    <div className="my-5 mb-10 border-b pb-5">
      <PageBreadcrumb currentLabel={title} />
      <div>
        {tag != null && tag.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tag.map((label, index) => (
              <Badge key={`${label}-${index}`} variant="outline">
                {label}
              </Badge>
            ))}
          </div>
        ) : null}
        <h1 className="mt-2 scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          {title}
        </h1>
      </div>
      <p className="mt-2 space-y-2 text-sm leading-relaxed font-medium text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
