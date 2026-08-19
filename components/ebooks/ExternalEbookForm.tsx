"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StudentFormLoader } from "@/components/StudentFormLoader";

type ExternalEbookFormProps = {
  ebookId: string;
  stateSlug: string;
  stateTitle: string;
  formContainerId?: string;
};

const FORM_API_PATH = "/api/v1/form";

function getFetchUrl(input: RequestInfo | URL) {
  if (typeof input === "string") {
    return input;
  }

  if (input instanceof URL) {
    return input.href;
  }

  return input.url;
}

function getFetchMethod(input: RequestInfo | URL, init?: RequestInit) {
  if (init?.method) {
    return init.method.toUpperCase();
  }

  if (typeof input === "object" && "method" in input && input.method) {
    return input.method.toUpperCase();
  }

  return "GET";
}

function isStudentFormSubmit(input: RequestInfo | URL, init?: RequestInit) {
  const url = getFetchUrl(input);
  const method = getFetchMethod(input, init);

  return method === "POST" && url.includes(FORM_API_PATH);
}

export function ExternalEbookForm({
  ebookId,
  stateSlug,
  stateTitle,
  formContainerId = "formsID7375",
}: ExternalEbookFormProps) {
  const router = useRouter();

  const goToDownload = useCallback(() => {
    const params = new URLSearchParams({
      state: stateSlug,
      token: "ebook-form-submitted",
    });

    router.push(`/e-books/download?${params.toString()}`);
  }, [router, stateSlug]);

  useEffect(() => {
    const originalFetch = window.fetch.bind(window);
    let hasRedirected = false;

    window.fetch = (async (...args: Parameters<typeof window.fetch>) => {
      const response = await originalFetch(...args);

      if (!hasRedirected && response.ok && isStudentFormSubmit(args[0], args[1])) {
        hasRedirected = true;
        window.localStorage.setItem(
          "ebookLeadFormData",
          JSON.stringify({
            ebookId,
            stateSlug,
            stateTitle,
            completedAt: new Date().toISOString(),
          }),
        );
        window.setTimeout(goToDownload, 300);
      }

      return response;
    }) as typeof window.fetch;

    return () => {
      window.fetch = originalFetch;
    };
  }, [ebookId, goToDownload, stateSlug, stateTitle]);

  return (
    <>
      <div id={formContainerId} />
      <StudentFormLoader formContainerId={formContainerId} />
    </>
  );
}
