import type { Metadata } from "next";
import { EbookDetails } from "@/components/ebooks/EbookDetails";
import { EbookErrorState } from "@/components/ebooks/EbookErrorState";
import { EbookPageHeader } from "@/components/ebooks/EbookPageHeader";
import { ExternalEbookForm } from "@/components/ebooks/ExternalEbookForm";
import {
  getEbookBySlug,
  getSearchParamValue,
  hasDownloadableMedia,
  isValidEbookSlug,
} from "@/lib/sanityEbooks";
import { siteConfig } from "@/lib/site";

type EbookFormPageProps = {
  searchParams: {
    state?: string | string[];
  };
};

export const metadata: Metadata = {
  title: `Complete the Form | ${siteConfig.name}`,
  description: "Complete the form to access your selected state E-Book.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EbookFormPage({ searchParams }: EbookFormPageProps) {
  const stateSlug = getSearchParamValue(searchParams.state);

  if (!isValidEbookSlug(stateSlug)) {
    return <InvalidEbookState />;
  }

  const ebook = await getEbookBySlug(stateSlug);

  if (!hasDownloadableMedia(ebook)) {
    return <InvalidEbookState />;
  }

  return (
    <section className="section-shell min-h-screen pt-28 md:pt-36">
      <div className="noise-overlay absolute inset-0" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 md:px-8">
        <EbookPageHeader
          title="Complete the Form to Download"
          description="Please complete the form below to access the selected E-Book."
        />
        <EbookDetails ebook={ebook} />
        <div className="mx-auto w-full max-w-[680px]">
          <ExternalEbookForm
            ebookId={ebook._id}
            stateSlug={ebook.slug}
            stateTitle={ebook.state}
          />
        </div>
      </div>
    </section>
  );
}

function InvalidEbookState() {
  return (
    <section className="section-shell flex min-h-screen items-center pt-28 md:pt-36">
      <div className="relative z-10 mx-auto w-full px-4 md:px-8">
        <EbookErrorState
          title="The selected E-Book could not be found."
          description="Please choose an active E-Book from the preview page before completing the form."
        />
      </div>
    </section>
  );
}
