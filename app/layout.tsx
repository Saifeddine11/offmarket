import type { Metadata } from "next";
import Script from "next/script";
import { GlobalFooterAssets } from "@/components/layout/GlobalFooterAssets";
import { GlobalNavAssets } from "@/components/layout/GlobalNavAssets";
import { GlobalSiteFooter } from "@/components/layout/GlobalSiteFooter";
import { GlobalSiteNavbar } from "@/components/layout/GlobalSiteNavbar";
import { ScrollLockCleanup } from "@/components/layout/ScrollLockCleanup";
import { DeferredNavBoot } from "@/components/layout/DeferredNavBoot";

export const metadata: Metadata = {
  metadataBase: new URL("https://offmarketofficial.com"),
};

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
      </body>
    </html>
  );
}
