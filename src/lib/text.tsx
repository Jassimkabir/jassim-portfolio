/** Render a string that may contain inline accent tags (<em>, <i>, <strong>, <b>, <span>). */
export function Html({
  as: Tag = "span",
  html,
  className,
  ...rest
}: {
  as?: React.ElementType;
  html: string;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
}

/**
 * Wrap plain words in <span class="w"> for staggered reveals while keeping
 * <em> tags intact. Mirrors the reference engine's wrapWords().
 */
export function wrapWords(html: string): string {
  return html.replace(/(<em>.*?<\/em>|[^\s<]+)/g, (m) => `<span class="w">${m}</span>`);
}
