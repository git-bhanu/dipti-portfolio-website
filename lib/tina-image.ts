/**
 * Tina prepends its CDN base URL to all type:'image' field values.
 * If the stored value was already an absolute URL (e.g. an Unsplash link),
 * the result is a double-prefixed URL like:
 *   https://assets.tina.io/ACCOUNT_IDhttps://images.unsplash.com/...
 *
 * This function detects and strips the unwanted prefix, leaving
 * - already-correct Tina CDN URLs untouched (single https://)
 * - external URLs correctly extracted
 * - relative paths (from proper Tina uploads) untouched
 */
export function tinaImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  const second = url.indexOf('https://', 8);
  if (second > 0) return url.slice(second);
  const secondHttp = url.indexOf('http://', 7);
  if (secondHttp > 0) return url.slice(secondHttp);
  return url;
}
