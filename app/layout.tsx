import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GlobalFooterAssets } from "@/components/layout/GlobalFooterAssets";
import { GlobalNavAssets } from "@/components/layout/GlobalNavAssets";
import { GlobalSiteFooter } from "@/components/layout/GlobalSiteFooter";
import { GlobalSiteNavbar } from "@/components/layout/GlobalSiteNavbar";
import { ScrollLockCleanup } from "@/components/layout/ScrollLockCleanup";
import { DeferredNavBoot } from "@/components/layout/DeferredNavBoot";
import { getSiteStructuredData } from "@/lib/seo/structuredData";
import { localeFromPathname, languageTagForLocale } from "@/lib/i18n/locale";
import { headers } from "next/headers";

function requestPathname(headerList: Headers): string {
  for (const name of [
    "x-offmarket-pathname",
    "x-invoke-path",
    "x-matched-path",
    "x-nextjs-matched-path",
    "x-forwarded-uri",
    "x-original-url",
    "x-rewrite-url",
    "next-url",
  ]) {
    const value = headerList.get(name);
    if (value) return value.split("?")[0];
  }
  return "/";
}

export const metadata: Metadata = {
  metadataBase: new URL("https://offmarketofficial.com"),
  verification: {
    google: "_NdQPaXlSnkC3js_-xW-1XLA2M1qC1RkOOHCpCWUOx8",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = localeFromPathname(requestPathname(await headers()));
  const lang = languageTagForLocale(locale);

  return (
    <html lang={lang} dir="ltr" className="has-hover" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="/assets/stylesheets/om-scroll-layout.css?v=1767557000"
        />
        <script
          async
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="bSEjZd4P8psbV0Bag20Jkg"
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
            `,
          }}
        />
        <script
          type="application/ld+json"
          id="site-structured-data"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData(locale)),
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
        <GlobalSiteNavbar locale={locale} />
        {children}
        <GlobalSiteFooter locale={locale} />
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
