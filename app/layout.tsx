import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { ScrollLockCleanup } from "@/components/layout/ScrollLockCleanup";
import { DeferredNavBoot } from "@/components/layout/DeferredNavBoot";

export const metadata: Metadata = {
  metadataBase: new URL("https://offmarket.ma"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const lang = hdrs.get("x-site-lang") ?? "fr";

  return (
    <html lang={lang} dir="ltr" className="has-hover" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="/assets/stylesheets/om-scroll-layout.css?v=1767540000"
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
      </head>
      <body suppressHydrationWarning>
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".js-favourite-list-single,.js-favourite-list-single *{display:none!important;height:0!important;overflow:hidden!important;visibility:hidden!important;pointer-events:none!important}",
          }}
        />
        {children}
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
