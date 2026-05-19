import React from "react"
import { Badge } from "./ui/badge"

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
    <div className="my-5 mb-10">
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
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          {title}
        </h1>
      </div>
      <p className="mt-2 space-y-2 text-sm leading-relaxed font-medium text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
