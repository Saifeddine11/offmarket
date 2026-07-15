import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GlobalFooterAssets } from "@/components/layout/GlobalFooterAssets";
import { GlobalNavAssets } from "@/components/layout/GlobalNavAssets";
import { GlobalSiteFooter } from "@/components/layout/GlobalSiteFooter";
import { GlobalSiteNavbar } from "@/components/layout/GlobalSiteNavbar";
import { ScrollLockCleanup } from "@/components/layout/ScrollLockCleanup";
import { DeferredNavBoot } from "@/components/layout/DeferredNavBoot";
import { SITE_STRUCTURED_DATA } from "@/lib/seo/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://offmarketofficial.com"),
  verification: {
    google: "_NdQPaXlSnkC3js_-xW-1XLA2M1qC1RkOOHCpCWUOx8",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = "fr";

  return (
    <html lang={lang} dir="ltr" className="has-hover" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="/assets/stylesheets/om-scroll-layout.css?v=1767557000"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.remove('no-js');
              document.documentElement.classList.add(
                'js',
                'is-preloader-disabled',
                'js-no-reveal'
              );
              document.documentElement.classList.remove('not-ready');
              if (navigator.platform.toUpperCase().indexOf('WIN') >= 0) {
                document.documentElement.classList.add('is-win');
              }
              var path = window.location.pathname;
              document.documentElement.lang = path.indexOf('/en') === 0
                ? 'en'
                : path.indexOf('/it') === 0
                  ? 'it'
                  : path.indexOf('/nl') === 0
                    ? 'nl'
                    : 'fr';
            `,
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SITE_STRUCTURED_DATA),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".js-favourite-list-single,.js-favourite-list-single *{display:none!important;height:0!important;overflow:hidden!important;visibility:hidden!important;pointer-events:none!important}",
          }}
        />
        <GlobalNavAssets />
        <GlobalFooterAssets />
        <GlobalSiteNavbar locale={lang} />
        {children}
        <GlobalSiteFooter locale={lang} />
        <ScrollLockCleanup />
        <DeferredNavBoot />
        <Script
          src="/assets/javascripts/om-scroll-guard.js?v=1767540000"
          strategy="afterInteractive"
        />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
