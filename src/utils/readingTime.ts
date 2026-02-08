/**
 * Calculate estimated reading time for a text string.
 * Average reading speed: 200 words per minute.
 */
export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
