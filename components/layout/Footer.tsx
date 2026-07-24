import Link from "next/link";
import Image from "next/image";
import { COMPANY_LINKS, LEGAL_LINKS, RESOURCE_LINKS } from "@/lib/constants";
import { SOCIAL_ICON_URLS, SOCIAL_LINKS } from "@/lib/contactLinks";
import { MagneticButton } from "@/components/ui/MagneticButton";

const socials: { label: string; href: string; imageUrl: string; fallback: string }[] = [
  {
    label: "YouTube",
    href: SOCIAL_LINKS.youtube,
    imageUrl: SOCIAL_ICON_URLS.youtube,
    fallback: "YT",
  },
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    imageUrl: SOCIAL_ICON_URLS.instagram,
    fallback: "IG",
  },
  {
    label: "Facebook",
    href: SOCIAL_LINKS.facebook,
    imageUrl: SOCIAL_ICON_URLS.facebook,
    fallback: "FB",
  },
];

export function Footer() {
  return (
    <footer className="relative bg-base px-4 py-16 md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet to-cyan" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Careerkick home">
              <Image
                src="/logo-bg.png"
                alt="Careerkick"
                width={1000}
                height={250}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-muted">India&apos;s trusted NEET counselling platform for MBBS admission guidance, college prediction, and complete support.</p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-surface text-xs font-semibold text-text-muted transition-colors hover:bg-violet/20 hover:text-white"
                >
                  {social.imageUrl ? (
                    <Image
                      src={social.imageUrl}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  ) : (
                    social.fallback
                  )}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Resources" links={RESOURCE_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />

          <div>
            <h3 className="font-display text-xl font-semibold text-white">Get Counselling Updates</h3>
            <div className="mt-5 flex overflow-hidden rounded-full border border-white/10 bg-surface p-1">
              <input className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-text-faint" placeholder="Email address" aria-label="Email address" />
              <MagneticButton className="px-4 py-2 text-xs">Subscribe</MagneticButton>
            </div>
            <p className="mt-3 text-xs text-text-faint">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-text-faint md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 Careerkick. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {LEGAL_LINKS.map((item) => (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

