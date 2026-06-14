# AGENTS.md

## Posts with co-located components

Most posts are a single file: `src/content/posts/<slug>.md` (or `.mdx`).

If a post needs its own components (diagrams, custom layouts, etc.),
turn it into a folder instead:

```
src/content/posts/<slug>/
  index.mdx
  SomeComponent.astro
```

Import the component from `index.mdx` with a relative path
(`./SomeComponent.astro`). The content collection's glob pattern
(`**/[^_]*.{md,mdx}`, see `src/content.config.ts`) only matches
`.md`/`.mdx` files, so sibling `.astro` files are never treated as
posts.

`src/utils/getPostPaths.ts` has a special case for this: when a post's
filename is `index`, the slug is taken from the containing folder
instead of the filename, so `<slug>/index.mdx` still resolves to
`/posts/<slug>` (same URL as `<slug>.md` would).
