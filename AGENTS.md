# Agent Guidelines

## Build & Development Commands

### Development

- `npm run dev` - Start development server (Vite+)
- `npm run build` - Build library for production (`vp build && npm run package`)
- `npm run preview` - Preview production build

### Type Checking

- `npm run check` - Run svelte-check with TypeScript validation
- `npm run check:watch` - Run type checking in watch mode

### Code Quality

- Tooling is [Vite+](https://viteplus.dev/guide/) (`vite-plus` package): Oxlint for linting, Oxfmt for formatting. There is no ESLint or Prettier in this repo.
- `npm run lint` - Check formatting and lint (`vp fmt --check ./src && vp lint ./src`)
- `npm run format` - Format files with Oxfmt (`vp fmt ./src`)
- `npx vp check` - One-shot gate: format + lint + type-aware checks across the whole workspace
- `npx vp check --fix` - Same, with auto-fixes
- Lint/format config lives in the `lint` and `fmt` blocks of `vite.config.ts`

### Testing

No test framework is currently configured. When adding tests, update this file with test commands.

## Code Style Guidelines

### Svelte 5 Runes

This project uses Svelte 5 with runes for reactive state management.

**State ($state):**

```svelte
let player = $state<HTMLAudioElement | null>(null);
let progressPercent = $state(0);
let time = $state(0);
```

**Derived State ($derived):**

```svelte
let sliderBackground = $derived(
	`linear-gradient(to right, var(--player-theme-progress-color) ${progressPercent}%, var(--player-theme-progress-bgColor) ${progressPercent}%)`
);

let progressDisplay = $derived.by(() => {
	if (duration === undefined) return '--:-- / --:--';
	return `${formatTime(time)} / ${formatTime(duration)}`;
});
```

**Props ($props):**

```svelte
let {((autoplay = false), playlist, (currentSongIndex = 0), (onCurrentSongEnded = () => {}))}: Props
= $props();
```

**Effects ($effect):**

Use `$effect` mainly for cleanup registration; prefer `$derived` for values computed from other state:

```svelte
$effect(() => {
	return stopTicking; // runs on component destroy
});
```

### TypeScript

- **Strict mode enabled** - Always provide proper types
- Use `lang="ts"` attribute in `<script>` tags when TypeScript is needed
- Shared types live in `src/lib/types.ts` (`Song`, `Playlist`) - do not redefine them locally
- Example:

```svelte
<script lang="ts">
	import { MusicApp, type Song } from '#lib';

	const music: Song[] = [...];
</script>
```

### Imports

- SvelteKit 3 replaced the `$lib` alias with the `#lib` subpath import (defined in the `imports` field of `package.json`). Use `#lib` for app code (`src/routes`) importing from `src/lib`
- Inside `src/lib` itself, use relative imports
- External imports go at the top of `<script>` blocks
- Example:

```svelte
<script>
	import { MusicApp, type Song } from '#lib';
	import coverBg from './assets/gotomi.png?url';
</script>
```

### Component Structure

1. Imports first
2. Props definition with `$props()`
3. State with `$state()`
4. Derived values with `$derived()`
5. Effects with `$effect()`
6. Helper functions
7. Event handlers
8. Template markup
9. Styles section

### Naming Conventions

- **Variables/Functions:** camelCase (`currentTime`, `togglePlay()`)
- **Components:** PascalCase (`MusicPlayer`, `MusicApp`)
- **CSS Classes:** kebab-case (`progress-bar`, `track-title`)
- **CSS Variables:** kebab-case with theme prefix (`--player-theme-bgColor`)

### CSS Conventions

- Use CSS custom properties (variables) for theming
- Define theme variables in `:root` with fallbacks
- Example:

```css
:root {
	--player-theme-bgColor: var(--player-bgColor, #ffbf00);
	--player-theme-color: var(--player-color, #1f1f1f);
}
```

- Scoped component styles in `<style>` blocks
- Mobile-first responsive design using `@media` queries

### Error Handling

- Provide default values for optional props
- Use empty functions as defaults for optional callbacks
- Example:

```svelte
let {((autoplay = false), playlist, (onCurrentSongEnded = () => {}))}: Props = $props();
```

### Accessibility

- Add `alt` attributes to images
- Use semantic HTML elements
- Add `svelte-ignore a11y_*` comments when necessary with justification
- Example:

```html
<!-- svelte-ignore a11y_media_has_caption -->
<!-- The audio element is the player engine itself: it renders no controls and has no captions. -->
<audio src="{audio}" preload="metadata"></audio>
```

## Project Structure

```
src/
├── lib/
│   ├── MusicPlayer/          # Main component directory
│   │   ├── MusicPlayer.svelte    # Core player component
│   │   ├── MusicApp.svelte       # Playlist wrapper component
│   │   └── assets/               # Component assets (CSS, images)
│   │       ├── style.css
│   │       ├── *.svg
│   │       └── *.png
│   ├── types.ts              # Shared Song/Playlist types
│   └── index.ts              # Public API exports
├── routes/                   # SvelteKit routes (demo pages)
└── app.d.ts                  # Global type definitions
```

### Export Pattern

Export components and types from `src/lib/index.ts` (relative imports - SvelteKit 3 has no `$lib` alias inside lib):

```typescript
export { default as MusicPlayer } from './MusicPlayer/MusicPlayer.svelte';
export { default as MusicApp } from './MusicPlayer/MusicApp.svelte';
export type { Song, Playlist } from './types.js';
```

## Configuration Files

- **TypeScript:** `tsconfig.json` - extends SvelteKit's generated `$app/tsconfig`, strict mode
- **Vite+ / Vite:** `vite.config.ts` - `lint`/`fmt` blocks plus the `sveltekit(...)` plugin (SvelteKit 3 no longer reads `svelte.config.js`; preprocessor and adapter are passed to the plugin)
- **Package exports:** `package.json` - `svelte` condition, peer dependency on svelte, `#lib` subpath import

## Best Practices

1. **Performance:** Use `$derived` for computed values instead of recalculating
2. **Responsive:** Design mobile-first, use breakpoints at 480px and 600px
3. **Theme:** Support CSS variables for customization
4. **Asset Imports:** Use `?url` suffix for asset imports in components
5. **Clean Code:** Keep components focused and reusable
6. **Type Safety:** Always prefer TypeScript when adding new components

## Development Workflow

1. Make changes
2. Run `npx vp check --fix` (formats + lints + type-aware checks) or `npm run lint`
3. Run `npm run check` to verify Svelte/TS types
4. Test functionality manually with `npm run dev`
5. Verify the library build with `npm run build`

Always ensure `npm run lint` and `npm run check` pass before committing changes.
