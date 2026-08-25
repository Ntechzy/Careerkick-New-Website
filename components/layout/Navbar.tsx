"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { CounsellingPackagesModal } from "@/components/CTAButtons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [desktopOpenLink, setDesktopOpenLink] = useState<string | null>(null);
  const [expandedMobileLink, setExpandedMobileLink] = useState<string | null>(null);
  const [blogTheme, setBlogTheme] = useState<"light" | "dark" | null>(null);
  const phoneNumber = "7393062116";
  const MotionAnchor = motion.a;
  const isBlogPath = pathname === "/blog" || pathname.startsWith("/blog/");
  const blogDefaultTheme = pathname.startsWith("/blog/") ? "dark" : pathname === "/blog" ? "light" : null;
  const resolvedBlogTheme = blogTheme ?? blogDefaultTheme;
  const isLightNavbar =
    !scrolled &&
    ((isBlogPath && resolvedBlogTheme !== "dark") ||
      pathname === "/ayurveda-colleges-2026-27" ||
      pathname === "/top-neet-counseling-platform-in-mp");

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
    setDesktopOpenLink(null);
    setExpandedMobileLink(null);
  }, [pathname]);

  useEffect(() => {
    if (!isBlogPath) {
      setBlogTheme(null);
      return;
    }

    const savedTheme = window.localStorage.getItem("careerkick-blog-theme");
    setBlogTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : null);

    const updateTheme = (event: Event) => {
      const nextTheme = (event as CustomEvent<"light" | "dark">).detail;
      setBlogTheme(nextTheme);
    };

    window.addEventListener("careerkick-blog-theme-change", updateTheme);
    return () => window.removeEventListener("careerkick-blog-theme-change", updateTheme);
  }, [isBlogPath]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <motion.nav
        className={cn(
          "relative mx-auto flex h-16 max-w-[1480px] items-center justify-between px-4 transition-colors duration-300 md:h-[72px] md:px-6 xl:px-8",
          open && "bg-white shadow-[0_8px_24px_rgba(15,23,42,0.12)] md:bg-transparent md:shadow-none",
        )}
      >
        <motion.div
          layoutId="navbar-bg"
          className={cn(
            "absolute inset-x-2 inset-y-2 -z-10 rounded-full border border-white/5 bg-base/80 shadow-card backdrop-blur-xl md:inset-x-4 xl:inset-x-6",
            open && "hidden md:block",
            !open && !scrolled && "hidden md:block",
          )}
          transition={{ duration: 0.35 }}
        />

        <a href="/" className="flex shrink-0 items-center" aria-label="Careerkick home">
          <Image
            src={open ? "/logo.png" : "/logo-bg.png"}
            alt="Careerkick"
            width={1000}
            height={250}
            priority
            className={cn("h-10 w-auto object-contain xl:h-12", open && "h-11 md:h-10 xl:h-12")}
          />
        </a>

        <div className="hidden flex-1 items-center justify-center gap-2 px-3 lg:gap-3 xl:gap-5 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActiveLink(link);

            if (link.children?.length) {
              const submenuOpen = desktopOpenLink === link.href;

              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setDesktopOpenLink(link.href)}
                  onMouseLeave={() => setDesktopOpenLink(null)}
                  onFocus={() => setDesktopOpenLink(link.href)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setDesktopOpenLink(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    className={cn(
                      "relative inline-flex items-center gap-1 whitespace-nowrap py-2 text-xs font-medium transition-colors lg:text-sm",
                      isLightNavbar
                        ? "text-[#7a8f72] hover:text-[#13220f] md:text-text-muted md:hover:text-white"
                        : "text-text-muted hover:text-white",
                      active && (isLightNavbar ? "text-[#13220f] md:text-white" : "text-white"),
                    )}
                    aria-expanded={submenuOpen}
                    onClick={() => setDesktopOpenLink(link.href)}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        submenuOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-gradient-brand transition-all duration-300",
                        active || submenuOpen ? "w-full" : "w-0",
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-30 w-56 -translate-x-1/2 pt-4 transition-all duration-200",
                      submenuOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0",
                    )}
                  >
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-base/92 p-2 shadow-elevated backdrop-blur-xl">
                      {link.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-sm font-semibold text-text-muted transition-colors hover:bg-white/8 hover:text-white",
                            pathname === child.href && "bg-[#51A70A]/12 text-white",
                          )}
                          onClick={() => setDesktopOpenLink(null)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative whitespace-nowrap py-2 text-xs font-medium transition-colors lg:text-sm",
                  isLightNavbar
                    ? "text-[#7a8f72] hover:text-[#13220f] md:text-text-muted md:hover:text-white"
                    : "text-text-muted hover:text-white",
                  active && (isLightNavbar ? "text-[#13220f] md:text-white" : "text-white"),
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
              </a>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <MagneticButton
            type="button"
            onClick={() => setPackagesOpen(true)}
            className="px-3 py-2 text-xs xl:px-5 xl:text-sm"
          >
            Get Counselling
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
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#51A70A]/25 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition-colors hover:border-[#51A70A]/45 hover:bg-[#51A70A]/5 hover:text-white xl:px-5 xl:text-sm"
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
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden",
            open
              ? "border-transparent bg-white text-[#0b2b05]"
              : "border-white/10 bg-white/5 text-white",
          )}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="h-7 w-7" aria-hidden="true" />
          ) : (
            <span className="relative h-4 w-5">
              <span className="absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform" />
              <span className="absolute left-0 top-2 h-0.5 w-5 bg-current transition-opacity" />
              <span className="absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform" />
            </span>
          )}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-16 -z-10 h-[calc(100dvh-4rem)] w-full overflow-y-auto bg-[#eef5eb]/88 px-4 pb-8 pt-12 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mx-auto flex min-h-[min(34rem,calc(100dvh-7.5rem))] w-full max-w-[40rem] flex-col rounded-[32px] border border-white/75 bg-white px-5 py-6 shadow-[0_26px_70px_rgba(9,28,4,0.18)] sm:px-7 sm:py-7"
            >
              <p className="px-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#7f8f79]">
                Explore Platform
              </p>

              <div className="mt-5 flex flex-1 flex-col space-y-3">
                {NAV_LINKS.map((link, index) => {
                  const active = isActiveLink(link);
                  const expanded = expandedMobileLink === link.href;

                  if (link.children?.length) {
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 28 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <button
                          type="button"
                          className={cn(
                            "flex min-h-14 w-full items-center justify-between gap-4 rounded-[24px] border px-5 text-left font-display text-lg font-extrabold text-[#0b2b05] shadow-[0_10px_30px_rgba(9,28,4,0.04)] transition-colors",
                            active
                              ? "border-[#51A70A]/28 bg-[#edf8e8]"
                              : "border-slate-950/[0.04] bg-[#f8faf7] hover:bg-[#f1f8ee]",
                          )}
                          aria-expanded={expanded}
                          onClick={() =>
                            setExpandedMobileLink((value) =>
                              value === link.href ? null : link.href,
                            )
                          }
                        >
                          <span>{link.label}</span>
                          <ChevronRight
                            className={cn(
                              "h-5 w-5 shrink-0 text-[#8a9486] transition-transform",
                              expanded && "rotate-90 text-[#51A70A]",
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
                              <div className="mt-2 space-y-2 px-3 pb-1">
                                {link.children.map((child) => (
                                  <a
                                    key={child.href}
                                    href={child.href}
                                    className={cn(
                                      "block rounded-2xl px-4 py-3 text-sm font-bold text-[#52644b] transition-colors hover:bg-[#edf8e8] hover:text-[#0b2b05]",
                                      pathname === child.href && "bg-[#edf8e8] text-[#0b2b05]",
                                    )}
                                    onClick={() => setOpen(false)}
                                  >
                                    {child.label}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  return (
                    <MotionAnchor
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex min-h-14 items-center justify-between gap-4 rounded-[24px] border px-5 font-display text-lg font-extrabold text-[#0b2b05] shadow-[0_10px_30px_rgba(9,28,4,0.04)] transition-colors",
                        active
                          ? "border-[#51A70A]/28 bg-[#edf8e8]"
                          : "border-slate-950/[0.04] bg-[#f8faf7] hover:bg-[#f1f8ee]",
                      )}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setOpen(false)}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-5 w-5 shrink-0 text-[#8a9486]" aria-hidden="true" />
                    </MotionAnchor>
                  );
                })}
              </div>
              
              <div className="mt-6 w-full shrink-0 space-y-3 border-t border-slate-950/[0.06] pt-4">
                <MagneticButton
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setPackagesOpen(true);
                  }}
                  className="min-h-14 w-full bg-[#0b2b05] bg-none py-4 text-base shadow-[0_14px_34px_rgba(9,28,4,0.18)] hover:shadow-[0_18px_40px_rgba(9,28,4,0.22)]"
                >
                  Predict Your College
                </MagneticButton>
                <motion.a
                  href="/contact"
                  className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-brand px-6 py-4 text-base font-extrabold text-[#0b2b05] shadow-[0_14px_34px_rgba(81,167,10,0.22)]"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpen(false)}
                >
                  Get Free Counselling
                </motion.a>
                <p className="text-center font-mono text-xs font-bold tracking-[0.16em] text-[#52644b]">
                  {phoneNumber}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {packagesOpen ? (
        <CounsellingPackagesModal onClose={() => setPackagesOpen(false)} />
      ) : null}
    </header>
  );
}
