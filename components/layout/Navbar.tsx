"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [expandedMobileLink, setExpandedMobileLink] = useState<string | null>(null);
  const phoneNumber = "7393062116";
  const MotionLink = motion(Link);

  const isActiveHref = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const isActiveLink = (link: (typeof NAV_LINKS)[number]) =>
    isActiveHref(link.href) || Boolean(link.children?.some((child) => isActiveHref(child.href)));

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) {
      setExpandedMobileLink(null);
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setExpandedMobileLink(null);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <motion.nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-8">
        {scrolled && (
          <motion.div
            layoutId="navbar-bg"
            className="absolute inset-x-2 inset-y-2 -z-10 rounded-full border border-white/5 bg-base/80 shadow-card backdrop-blur-xl md:inset-x-6"
            transition={{ duration: 0.35 }}
          />
        )}

        <Link href="/" className="flex items-center" aria-label="Careerkick home">
          <Image
            src="/logo-bg.png"
            alt="Careerkick"
            width={1000}
            height={250}
            priority
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActiveLink(link);

            if (link.children?.length) {
              return (
                <div key={link.href} className="group relative">
                  <button
                    type="button"
                    className={cn(
                      "relative inline-flex items-center gap-1 py-2 text-sm font-medium text-text-muted transition-colors hover:text-white",
                      active && "text-white",
                    )}
                    aria-expanded={active}
                  >
                    {link.label}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-gradient-brand transition-all duration-300",
                        active ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </button>

                  <div className="pointer-events-none absolute left-1/2 top-full z-30 w-56 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-base/92 p-2 shadow-elevated backdrop-blur-xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-sm font-semibold text-text-muted transition-colors hover:bg-white/8 hover:text-white",
                            pathname === child.href && "bg-[#51A70A]/12 text-white",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative py-2 text-sm font-medium text-text-muted transition-colors hover:text-white",
                  active && "text-white",
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-gradient-brand transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <MagneticButton href={`tel:${phoneNumber}`} className="px-5 py-2 text-sm">
            Book Free Call
          </MagneticButton>

          <div
            className="relative"
            onMouseEnter={() => setShowPhone(true)}
            onMouseLeave={() => setShowPhone(false)}
            onFocus={() => setShowPhone(true)}
            onBlur={() => setShowPhone(false)}
          >
            <motion.a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center justify-center rounded-full border border-[#51A70A]/25 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition-colors hover:border-[#51A70A]/45 hover:bg-[#51A70A]/5 hover:text-white"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Toll Free Number
            </motion.a>

            <motion.div
              initial={false}
              animate={
                showPhone
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 8, scale: 0.96 }
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-max -translate-x-1/2"
            >
              <div className="rounded-2xl border border-white/10 bg-[#0d1d09]/95 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
                  Call now
                </p>
                <p className="mt-1 font-display text-base font-bold tracking-[0.12em] text-white">
                  {phoneNumber}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative h-4 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-2 h-0.5 w-5 bg-white transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-5 bg-white transition-transform",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-0 -z-10 h-[100dvh] w-full bg-base/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-20 sm:px-8">
              <div className="flex flex-1 flex-col justify-center space-y-5 py-6 sm:space-y-6">
                {NAV_LINKS.map((link, index) => {
                  const active = isActiveLink(link);
                  const expanded = expandedMobileLink === link.href;

                  if (link.children?.length) {
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-4 text-left font-display text-2xl font-semibold text-white sm:text-3xl"
                          aria-expanded={expanded}
                          onClick={() =>
                            setExpandedMobileLink((value) =>
                              value === link.href ? null : link.href,
                            )
                          }
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-6 w-6 shrink-0 transition-transform",
                              expanded && "rotate-180",
                            )}
                            aria-hidden="true"
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 space-y-3 border-l border-[#51A70A]/35 pl-4">
                                {link.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="block text-base font-semibold text-white transition-colors hover:text-white"
                                    onClick={() => setOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  return (
                    <MotionLink
                      key={link.href}
                      href={link.href}
                      className="block font-display text-2xl font-semibold text-white sm:text-3xl"
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </MotionLink>
                  );
                })}
              </div>
              
              <div className="mt-auto w-full shrink-0 space-y-3 pt-6">
                <MagneticButton href={`tel:${phoneNumber}`} className="w-full py-4 text-base">
                  Book Free Call
                </MagneticButton>
                <motion.a
                  href={`tel:${phoneNumber}`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#51A70A]/25 bg-white px-6 py-4 text-base font-semibold text-slate-900"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Toll Free Number
                </motion.a>
                <p className="text-center font-mono text-xs tracking-[0.22em] text-[#8cef32]">
                  {phoneNumber}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
