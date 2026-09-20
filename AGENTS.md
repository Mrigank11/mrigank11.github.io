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

## Embedding HyperFrames animations

`src/components/HyperframesEmbed.astro` plays a HyperFrames composition
inline (`.astro` pages and `.mdx` posts alike):

```mdx
import HyperframesEmbed from "@/components/HyperframesEmbed.astro";

<HyperframesEmbed
  src="/posts/<slug>/animation/index.html"
  poster="/posts/<slug>/animation-poster.png"
  alt="What it shows"
/>
```

Put the composition in `public/` with its GSAP and fonts self-hosted next to
it (no CDN links), and render the poster from the live page at a resolved
frame (a suppressed seek skips `onUpdate`, so seek with events enabled). The
component pauses offscreen and, under `prefers-reduced-motion`, shows only the
poster and never loads the player. Pass `width`/`height` (default 1600x600) if
the composition has a different aspect ratio. The player bundle is vendored in
`public/vendor/`; bump it there when upgrading.
