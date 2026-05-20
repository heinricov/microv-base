import type { NextConfig } from "next"

const MDX_PACKAGE = "microv-mdx"

/**
 * Gabungkan `transpilePackages` untuk `microv-mdx`.
 * Untuk PageHeader/sidebar/badge: tambahkan di postcss app:
 * `import microvMdxPostcss from "microv-mdx/postcss"`
 * plugins: { "@tailwindcss/postcss": {}, "microv-mdx": microvMdxPostcss() }
 */
export function withMicrovMdx(config: NextConfig = {}): NextConfig {
  const current = config.transpilePackages
  const list =
    current === undefined
      ? [MDX_PACKAGE]
      : [...(Array.isArray(current) ? current : [current]), MDX_PACKAGE]

  return {
    ...config,
    transpilePackages: [...new Set(list)],
  }
}
