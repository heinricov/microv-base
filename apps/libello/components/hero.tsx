"use client"
import React from "react"
import Link from "next/link"
import { ArrowRight, Menu, Rocket, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        <section className="relative">
          <div className="relative py-24 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              <div className="text-center sm:mx-auto sm:w-10/12 lg:mt-0 lg:mr-auto lg:w-4/5">
                <Link
                  href="/"
                  className="mx-auto flex w-fit items-center gap-2 rounded-(--radius) border p-1 pr-3"
                >
                  <span className="rounded-[calc(var(--radius)-0.25rem)] bg-muted px-2 py-1 text-xs">
                    New
                  </span>
                  <span className="text-sm">Introduction Tailark Html</span>
                  <span className="block h-4 w-px bg-(--color-border)"></span>

                  <ArrowRight className="size-4" />
                </Link>

                <h1 className="mt-8 text-4xl font-semibold md:text-5xl xl:text-5xl xl:leading-[1.125]">
                  Tame the Wild West <br /> of Frontend Development
                </h1>
                <p className="mx-auto mt-8 hidden max-w-2xl text-lg text-wrap sm:block">
                  Tailwindcss highly customizable components for building modern
                  websites and applications that look and feel the way you mean
                  it.
                </p>
                <p className="mx-auto mt-6 max-w-2xl text-wrap sm:hidden">
                  Highly customizable components for building modern websites
                  and applications, with your personal spark.
                </p>

                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link href="/blogs">
                      <Rocket className="relative size-4" />
                      <span className="text-nowrap">Read Blogs</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="x-auto relative mx-auto mt-8 max-w-lg sm:mt-12">
                <div className="absolute inset-0 -top-8 left-1/2 -z-20 h-56 w-full -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_98%,--theme(--color-gray-200/75%)_98%),linear-gradient(to_right,transparent_94%,--theme(--color-gray-200/75%)_94%)] bg-size-[16px_35px] [mask:radial-gradient(black,transparent_95%)] dark:opacity-10"></div>
                <div className="absolute inset-x-0 top-12 z-[-1] mx-auto h-1/3 w-2/3 rounded-full bg-blue-300 blur-3xl dark:bg-white/20"></div>

                <div className="w-full max-w-lg rounded-(--radius) border bg-background p-2">
                  <img
                    alt="Hero Image"
                    className="aspect-14/9 w-full rounded-lg bg-muted object-cover"
                    src="https://cdn.pixabay.com/photo/2021/08/27/18/50/water-6579313_1280.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
