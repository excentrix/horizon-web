/**
 * Calculate estimated reading time for blog content
 * Average reading speed: 200 words per minute
 * Returns time in seconds
 */
export function calculateReadingTime(content: string): number {
  // Remove HTML tags and extra whitespace
  const plainText = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  // Count words
  const wordCount = plainText.split(' ').filter(word => word.length > 0).length

  // Calculate reading time (200 words per minute)
  const minutes = wordCount / 200
  const seconds = Math.ceil(minutes * 60)

  return seconds
}

/**
 * Get minimum required reading time (50% of estimated)
 */
export function getMinimumReadingTime(estimatedSeconds: number): number {
  return Math.floor(estimatedSeconds * 0.5)
}
