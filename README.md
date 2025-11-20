# Personal Website

Static portfolio built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js App Router with static export (`output: 'export'`)
- TypeScript and Tailwind CSS for styling
- Framer Motion and custom hooks for interactions
- GitHub Pages deployment via Actions workflow

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` while `npm run dev` is running.

## Production Build

```bash
npm run build
```

The static site is emitted to the `out/` directory and published automatically by the GitHub Pages workflow located in `.github/workflows/deploy.yml`.

## Environment Notes

- All content is static; third-party APIs and Notion integrations were removed.
- Add secrets to `.env.local` (ignored by git) if dynamic services are reintroduced.

## Project Structure

- `src/app` – Next.js app directory, routes, and layout
- `src/components` – UI sections and shared components
- `src/lib` – Utilities and hooks
- `public/` – Static assets, including the latest resume PDF

## Deployment

Pushes to `main` trigger the GitHub Actions workflow that builds the site and publishes `out/` to GitHub Pages at `https://chloriiin.github.io/`.
