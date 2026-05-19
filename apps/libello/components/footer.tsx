import Link from "next/link"

const links = [
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Solution",
    href: "#",
  },
  {
    title: "Customers",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
]

export const FooterComponent = () => {
  return (
    <footer className="relative z-30 border-t border-border bg-background py-6">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap justify-between gap-6">
          <span className="order-last mx-auto block text-center text-sm text-muted-foreground md:order-first md:mx-0">
            © {2026} Libello, All rights reserved
          </span>
          <div className="order-first mx-auto flex flex-wrap justify-center gap-6 text-sm md:order-last md:mx-0">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block text-muted-foreground duration-150 hover:text-primary"
              >
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
