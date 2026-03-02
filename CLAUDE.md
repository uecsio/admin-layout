# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run build` — production build (library + type declarations)
- `npm run lint` — run ESLint
- `npm run test` — run all tests once (vitest)
- `npm run test:watch` — run tests in watch mode
- Single test: `npx vitest run src/test/example.test.ts`

## Tech Stack

- Vue 3 + TypeScript + Vite (library mode)
- Tailwind CSS 3 with CSS variables for theming (defined in `src/index.css`)
- No UI library — plain Vue components with Tailwind classes
- Vitest + jsdom + @vue/test-utils for tests
- Published as an npm package (`@uecsio/admin-layout`)

## Architecture

This is an **npm library package** that exports a configurable admin layout (header + collapsible sidebar + content area).

- **Path alias**: `@/` maps to `src/` (configured in tsconfig.json and vite.config.ts)
- **Entry point**: `src/index.ts` — exports all public components, composables, and types
- **Components**: `src/components/` — AdminLayout, AdminHeader, AdminSidebar, SidebarItem, MenuIcon
- **Composables**: `src/composables/useSidebar.ts` — reactive sidebar open/close state
- **Types**: `src/types.ts` — MenuItem, AdminLayoutProps interfaces
- **Utilities**: `src/lib/utils.ts` — exports `cn()` for merging Tailwind classes
- **Tests**: `src/test/layout.test.ts`

### Library build

- Vite library mode builds `src/index.ts` as the entry
- Output: `dist/index.js` (ES module), `dist/style.css`, `dist/index.d.ts`
- `vue` is an external/peer dependency
- Consumers import components and CSS: `import '@uecsio/admin-layout/style.css'`

### Component design

- **Router-agnostic**: Components emit `navigate(href)` events instead of using `<router-link>`. Consumers wire to their own router.
- **Icons**: `icon` field accepts FA class strings (e.g. `"fa-solid fa-box"`) or image URLs. `MenuIcon` component auto-detects and renders `<i>` or `<img>`. Consumers can override via `#item-icon` scoped slot.
- **Active state**: Set via `active` field in MenuItem config. Consumer manages this based on their current route.
- **Slots**: `#logo`, `#header-right`, `#default` (content), `#footer`, `#sidebar-footer`, `#item-icon`

## Styling

- Colors use HSL CSS variables (e.g., `--primary`, `--sidebar-background`). Reference via Tailwind semantic classes (`bg-primary`, `text-sidebar-foreground`, etc.).
- Dark mode is configured via class strategy but only light theme variables are currently defined.
- The sidebar has its own color token set (`--sidebar-*`).

## TypeScript

- Strict null checks are disabled (`strictNullChecks: false`).
- `noImplicitAny` is disabled.
- Unused vars/params are allowed (no lint errors).
- Vue SFC type support via `vue-tsc`.

## UI Language

The library is language-agnostic — all labels come from consumer config.
