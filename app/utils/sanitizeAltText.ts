export function sanitizeAltText(title: string): string {
  return title
    .toLowerCase() // <-- Amended: Convert to lowercase
    .replace(/[^a-z0-9]+/g, ' ') // <-- Amended: Replace non-alphanumeric characters with a space
    .trim() // <-- Added: Remove leading/trailing spaces
    .replace(/\s+/g, '-'); // <-- Amended: Replace spaces with hyphens to mimic alt text style
}

