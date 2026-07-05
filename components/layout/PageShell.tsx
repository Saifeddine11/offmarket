type PageShellProps = {
  className: string;
  children: React.ReactNode;
};

/**
 * Page-level wrapper — carries body-equivalent CSS classes for pixel-perfect styling
 * when body.className cannot be set during SSR.
 */
export function PageShell({ className, children }: PageShellProps) {
  return <div className={className}>{children}</div>;
}
