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

export function getMinimumReadingTime(estimatedSeconds: number): number {
  return Math.floor(estimatedSeconds * 0.5)
}

/**
 * Format reading time string
 */
export function formatReadingTime(seconds: number): string {
  const minutes = Math.ceil(seconds / 60)
  return `${minutes} min read`
}

/**
 * Extract plain text from Lexical JSON
 */
export function getLexicalText(node: unknown): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(getLexicalText).join(' ')
  if (typeof node === 'object' && node !== null) {
     const n = node as Record<string, unknown>
     if (typeof n.text === 'string') return n.text
     if (n.children) return getLexicalText(n.children)
     if (n.root) return getLexicalText(n.root)
  }
  return ''
}
