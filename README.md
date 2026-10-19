# xianminx.github.com

Personal blog built with Next.js, MDX, Contentlayer and Tailwind CSS. Based on [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).

## Development

Requires [Bun](https://bun.sh).

```sh
bun install
bun run dev      # http://localhost:3000
bun run build    # production build (set EXPORT=1 UNOPTIMIZED=1 for the static export in ./out)
bun run lint
```

Posts live in `data/blog`, site settings in `data/siteMetadata.js`. Pushes to `main` deploy to GitHub Pages via `.github/workflows/pages.yml`.
