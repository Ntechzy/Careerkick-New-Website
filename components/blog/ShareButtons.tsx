"use client";

import { useMemo, useState } from "react";

type ShareButtonsProps = {
  title: string;
  url: string;
};

const networks = [
  {
    label: "Facebook",
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "LinkedIn",
    href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: "X",
    href: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: "WhatsApp",
    href: (url: string, title: string) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
];

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareLinks = useMemo(
    () => networks.map((network) => ({ label: network.label, href: network.href(url, title) })),
    [title, url],
  );

  return (
    <div className="flex flex-wrap gap-2" aria-label="Share article">
      {shareLinks.map((network) => (
        <a
          key={network.label}
          href={network.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-text-muted transition-colors hover:border-violet/40 hover:text-white"
        >
          {network.label}
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
        className="rounded-full border border-violet/25 bg-violet/10 px-4 py-2 text-sm font-semibold text-violet-glow transition-colors hover:border-violet/50"
      >
        {copied ? "Copied" : "Copy Link"}
      </button>
    </div>
  );
}
