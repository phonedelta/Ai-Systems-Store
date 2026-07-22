/** Prefix public asset paths with Vite base (works on localhost + GitHub Pages) */
export function asset(path: string) {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}
