"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { StudentFormLoader } from "@/components/StudentFormLoader";

type ExternalEbookFormProps = {
  ebookId: string;
  stateSlug: string;
  stateTitle: string;
  formContainerId?: string;
  scriptUrl?: string;
  allowedMessageOrigins?: string[];
};

type FormSuccessDetail = {
  token?: string;
};

type EbookFormMessage = {
  type: "ebook-form-success";
  token?: string;
  stateSlug?: string;
};

function isFormSuccessDetail(value: unknown): value is FormSuccessDetail {
  return typeof value === "object" && value !== null;
}

function isEbookFormMessage(value: unknown): value is EbookFormMessage {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const payload = value as { type?: unknown; stateSlug?: unknown; token?: unknown };

  return (
    payload.type === "ebook-form-success" &&
    (payload.stateSlug === undefined || typeof payload.stateSlug === "string") &&
    (payload.token === undefined || typeof payload.token === "string")
  );
}

export function ExternalEbookForm({
  ebookId,
  stateSlug,
  stateTitle,
  formContainerId = "formsID7375",
  scriptUrl,
  allowedMessageOrigins = [],
}: ExternalEbookFormProps) {
  const router = useRouter();
  const [scriptKey, setScriptKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "loading",
  );

  const handleFormSuccess = useCallback(
    (token?: string) => {
      const params = new URLSearchParams({ state: stateSlug });

      if (token) {
        params.set("token", token);
      }

      router.push(`/e-books/download?${params.toString()}`);
    },
    [router, stateSlug],
  );

  useEffect(() => {
    function handleCustomSuccess(event: Event) {
      const customEvent = event as CustomEvent<unknown>;
      const detail = customEvent.detail;
      const token = isFormSuccessDetail(detail) ? detail.token : undefined;

      handleFormSuccess(token);
    }

    function handleProviderMessage(event: MessageEvent<unknown>) {
      if (!allowedMessageOrigins.includes(event.origin)) {
        return;
      }

      if (!isEbookFormMessage(event.data)) {
        return;
      }

      if (event.data.stateSlug && event.data.stateSlug !== stateSlug) {
        return;
      }

      handleFormSuccess(event.data.token);
    }

    window.addEventListener("ebook-form-success", handleCustomSuccess);
    window.addEventListener("message", handleProviderMessage);

    return () => {
      window.removeEventListener("ebook-form-success", handleCustomSuccess);
      window.removeEventListener("message", handleProviderMessage);
    };
  }, [allowedMessageOrigins, handleFormSuccess, stateSlug]);

  const dataAttributes = useMemo(
    () => ({
      "data-ebook-id": ebookId,
      "data-state-slug": stateSlug,
      "data-state-title": stateTitle,
    }),
    [ebookId, stateSlug, stateTitle],
  );

  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-5 shadow-card">
      <StudentFormLoader
        key={`${scriptUrl ?? "default"}-${scriptKey}`}
        formContainerId={formContainerId}
        scriptUrl={scriptUrl}
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
      />

      <div className="min-h-[560px] rounded-lg border border-dashed border-violet/30 bg-violet/5 p-3 sm:min-h-[620px] sm:p-4">
        <div id={formContainerId} {...dataAttributes} />
        {status === "loading" ? (
          <div className="flex h-56 items-center justify-center text-sm text-text-muted">
            Loading the form...
          </div>
        ) : null}
        {status === "error" ? (
          <div className="flex h-56 flex-col items-center justify-center text-center">
            <p className="font-display text-xl font-semibold text-white">
              The form could not be loaded.
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">
              Please try again, or return to the E-Book list and reopen this page.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("loading");
                setScriptKey((current) => current + 1);
              }}
              className="mt-5 inline-flex rounded-full border border-violet/30 bg-violet/10 px-5 py-3 text-sm font-semibold text-violet-glow transition-colors hover:border-violet/60 hover:bg-violet/15"
            >
              Retry
            </button>
          </div>
        ) : null}
      </div>

    </div>
  );
}
