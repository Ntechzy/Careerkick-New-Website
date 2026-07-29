"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  stateSlug,
  formContainerId = "formsID7375",
  allowedMessageOrigins = [],
}: ExternalEbookFormProps) {
  const router = useRouter();

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

  return (
    <div className="ebook-form-frame mx-auto w-full rounded-lg border border-white/10 bg-black/20 p-3 shadow-card sm:p-4">
      <div className="mx-auto min-h-[560px] w-full max-w-[600px] rounded-lg bg-surface-2 p-3 text-white sm:min-h-[620px] sm:p-4">
        <div id={formContainerId} className="mx-auto min-h-[520px] w-full sm:min-h-[580px]" />
      </div>
    </div>
  );
}
