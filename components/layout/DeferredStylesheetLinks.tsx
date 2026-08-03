type DeferredStylesheetLinksProps = {
  hrefs: readonly string[];
};

/**
 * Defers below-the-fold CSS until after first paint / idle time so the sheets
 * do not compete with LCP/FCP resources on the network.
 */
export function DeferredStylesheetLinks({
  hrefs,
}: DeferredStylesheetLinksProps) {
  if (hrefs.length === 0) return null;

  const payload = JSON.stringify(hrefs);
  const activator = `(()=>{var h=${payload};var load=function(){h.forEach(function(href){if(document.querySelector('link[data-om-deferred-href="'+href.replace(/"/g,'&quot;')+'"]'))return;var l=document.createElement('link');l.rel='stylesheet';l.href=href;l.setAttribute('data-om-deferred-href',href);document.head.appendChild(l);});};if('requestIdleCallback' in window){requestIdleCallback(load,{timeout:2500});}else{window.addEventListener('load',function(){setTimeout(load,1);});}})();`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: activator }} />
      <noscript>
        {hrefs.map((href) => (
          <link key={`ns-${href}`} rel="stylesheet" href={href} />
        ))}
      </noscript>
    </>
  );
}
