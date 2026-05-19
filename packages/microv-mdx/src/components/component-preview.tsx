"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { ChevronDown, Check, Copy } from "lucide-react"

import { cn } from "../lib/utils"
import { highlightCode, type ShikiTheme } from "../lib/shiki"

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  className?: string
  /** Jika diisi, dipakai untuk Shiki; jika tidak, mengikuti light/dark halaman. */
  theme?: ShikiTheme
  language?: string
}

export function ComponentPreview({
  children,
  code,
  className = "",
  theme,
  language = "jsx",
}: ComponentPreviewProps) {
  const { resolvedTheme } = useTheme()
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [highlightedPreview, setHighlightedPreview] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const syntaxTheme: ShikiTheme =
    theme ?? (resolvedTheme === "light" ? "github-light" : "one-dark-pro")

  useEffect(() => {
    if (showCode) {
      setLoading(true)
      highlightCode(code, language, syntaxTheme).then((html) => {
        setHighlightedCode(html)
        setLoading(false)
      })
    }
  }, [showCode, code, language, syntaxTheme])

  useEffect(() => {
    const teaser = code.split("\n").slice(0, 4).join("\n")
    highlightCode(teaser, language, syntaxTheme).then(setHighlightedPreview)
  }, [code, language, syntaxTheme])

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const codeLines = code.split("\n")

  const toolbarBtnClass = cn(
    "inline-flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-border",
    "bg-background px-2 text-xs font-medium shadow-none outline-none transition-colors",
    "hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 sm:text-sm",
    "disabled:pointer-events-none disabled:opacity-50"
  )

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      {/* Live preview */}
      <div
        className={cn(
          "relative flex min-h-[200px] w-full flex-col items-stretch justify-start overflow-x-auto p-4 text-left sm:min-h-[260px] sm:p-6 md:min-h-[300px] md:p-8",
          "bg-muted/60 text-foreground dark:bg-zinc-950 dark:text-zinc-50"
        )}
      >
        {children}
      </div>

      {/* Panel kode */}
      <div
        className={cn(
          "border-t border-border",
          "bg-zinc-50 text-foreground dark:bg-zinc-950 dark:text-zinc-50"
        )}
      >
        {showCode ? (
          <div className="relative w-full overflow-x-auto">
            <div className="flex min-w-0">
              <div
                className={cn(
                  "sticky left-0 z-10 shrink-0 select-none",
                  "border-r border-zinc-200 bg-zinc-100/90 py-4 pr-3 pl-3 sm:pl-4",
                  "text-right font-mono text-xs leading-6 text-zinc-500 tabular-nums sm:text-sm",
                  "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500"
                )}
              >
                {codeLines.map((_, index) => (
                  <div key={index} className="min-h-6">
                    {index + 1}
                  </div>
                ))}
              </div>

              <div
                className={cn(
                  "min-w-0 flex-1 py-4 pr-3 pl-3 sm:pr-4 sm:pl-4",
                  "[&_.shiki]:overflow-x-auto [&_pre]:m-0 [&_pre]:max-w-none [&_pre]:overflow-x-auto [&_pre]:rounded-none [&_pre]:bg-transparent! [&_pre]:p-0 [&_pre]:font-mono [&_pre]:text-sm"
                )}
              >
                {loading ? (
                  <div className="animate-pulse font-mono text-sm text-muted-foreground">
                    Memuat highlight…
                  </div>
                ) : (
                  <div
                    className="shiki-wrapper text-sm leading-6"
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="max-h-32 w-full overflow-x-auto sm:max-h-36">
              <div
                className={cn(
                  "px-3 py-3 sm:px-4",
                  "[&_.shiki]:overflow-x-auto [&_pre]:m-0 [&_pre]:max-w-none [&_pre]:overflow-x-auto [&_pre]:rounded-none [&_pre]:bg-transparent! [&_pre]:p-0 [&_pre]:font-mono [&_pre]:text-xs sm:[&_pre]:text-sm"
                )}
              >
                <div
                  className="shiki-wrapper"
                  dangerouslySetInnerHTML={{ __html: highlightedPreview }}
                />
              </div>
            </div>
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 h-14",
                "bg-linear-to-t from-zinc-50 to-transparent dark:from-zinc-950"
              )}
              aria-hidden
            />
          </div>
        )}
      </div>

      {/* Toolbar bawah: salin + buka/tutup kode */}
      <div
        className={cn(
          "flex flex-wrap items-center justify-end gap-2 border-t border-border px-3 py-2",
          "bg-muted supports-backdrop-filter:backdrop-blur-sm dark:bg-zinc-900/70"
        )}
      >
        <button
          type="button"
          onClick={handleCopyCode}
          className={toolbarBtnClass}
          title={copied ? "Disalin" : "Salin kode"}
          aria-label={copied ? "Disalin" : "Salin kode"}
        >
          {copied ? (
            <Check className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="size-4 shrink-0 opacity-70" />
          )}
          <span className="max-sm:sr-only">{copied ? "Disalin" : "Salin"}</span>
        </button>
        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          className={toolbarBtnClass}
          aria-expanded={showCode}
        >
          {showCode ? "Sembunyikan kode" : "Lihat kode"}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 opacity-70 transition-transform duration-200",
              showCode && "rotate-180"
            )}
          />
        </button>
      </div>
    </div>
  )
}
