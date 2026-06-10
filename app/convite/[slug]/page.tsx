import { Heart } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ConvitePageContent } from "@/components/convite/convite-page-content";
import { getConviteBySlugServer } from "@/services/convite.service.server";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const convite = await getConviteBySlugServer(slug);
  const siteUrl = "https://convite-especial-lcs.vercel.app";

  if (!convite) {
    return {
      metadataBase: new URL(siteUrl),
      title: "Convite Especial",
    };
  }

  const title = `${convite.title} — Convite Especial`;
  const description =
    convite.message || `Convite especial para ${convite.guestName}`;
  const imageUrl = convite.photoUrl?.startsWith("http")
    ? convite.photoUrl
    : `${siteUrl}/og-image.png`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/convite/${slug}`,
      siteName: "Convite Especial",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ConvitePage({ params }: PageProps) {
  const { slug } = await params;
  const serverConvite = await getConviteBySlugServer(slug);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-50/80 via-white to-pink-50/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-pink-100/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-violet-100/30 blur-3xl"
      />

      <header className="relative px-4 py-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-500 transition hover:text-rose-500"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-sm">
            <Heart className="h-3.5 w-3.5 fill-current" />
          </span>
          <span className="font-display text-sm font-semibold text-stone-700">
            Convite Especial
          </span>
        </Link>
      </header>

      <main className="relative mx-auto max-w-md px-4 pb-12 pt-2 sm:max-w-lg sm:pb-16">
        <Suspense
          fallback={
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-200 border-t-rose-500" />
            </div>
          }
        >
          <ConvitePageContent slug={slug} serverConvite={serverConvite} />
        </Suspense>
      </main>
    </div>
  );
}
