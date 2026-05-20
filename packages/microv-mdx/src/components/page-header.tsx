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
    <header className="mdx-page-header">
      <PageBreadcrumb currentLabel={title} />
      <div>
        {tag != null && tag.length > 0 ? (
          <div className="mdx-page-header__tags">
            {tag.map((label, index) => (
              <Badge key={`${label}-${index}`} variant="outline">
                {label}
              </Badge>
            ))}
          </div>
        ) : null}
        <h1 className="mdx-page-header__title">{title}</h1>
      </div>
      <p className="mdx-page-header__description">{description}</p>
    </header>
  )
}
