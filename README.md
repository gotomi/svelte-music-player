# Svelte Music Player

A modern, customizable music player component library built with Svelte 5 and SvelteKit.

## Features

- 🎵 Play/pause, rewind, forward controls
- 📱 Responsive design (mobile-first)
- 🎨 Customizable theme via CSS variables
- 🎧 Playlist support
- ⌨️ Keyboard controls (spacebar to toggle play)
- 🔄 Auto-advance to next track
- 📊 Progress bar with seek functionality
- ✨ Smooth animations and transitions

## Installation

```bash
npm install svelte-music-player
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
	import { MusicApp, type Song } from 'svelte-music-player';

	const playlist: Song[] = [
		{
			audio: 'https://example.com/song.mp3',
			title: 'My Song',
			cover: '/covers/song.jpg'
		}
	];
</script>

<MusicApp {playlist} showPlaylist={false} />
```

### With Playlist

```svelte
<script>
	import { MusicApp } from 'svelte-music-player';

	const playlist = [
		{ audio: '/songs/track1.mp3', title: 'Track 1', cover: '/covers/track1.jpg' },
		{ audio: '/songs/track2.mp3', title: 'Track 2', cover: '/covers/track2.jpg' },
		{ audio: '/songs/track3.mp3', title: 'Track 3', cover: '/covers/track3.jpg' }
	];
</script>

<MusicApp {playlist} showPlaylist={true} />
```

### Individual Player Component

```svelte
<script>
	import { MusicPlayer } from 'svelte-music-player';

	let currentSong = {
		audio: '/songs/my-song.mp3',
		title: 'My Song',
		cover: '/covers/song.jpg'
	};
</script>

<MusicPlayer playlist={currentSong} autoplay={false} />
```

## Components

### MusicApp

Wrapper component that includes playlist functionality.

**Props:**

- `playlist` (Array | Object): Songs to play
- `autoplay` (boolean, default: false): Auto-play on load
- `showPlaylist` (boolean, default: true): Show/hide playlist sidebar

### MusicPlayer

Core player component without playlist.

**Props:**

- `playlist` (Array | Object): Song data or array of songs
- `autoplay` (boolean, default: false): Auto-play on load
- `currentSongIndex` (number, default: 0): Index of current song (for playlists)
- `onCurrentSongEnded` (function): Callback when song ends

## Theming

Customize the player using CSS variables:

```css
:root {
	--player-bgColor: #ffbf00;
	--player-color: #1f1f1f;
	--player-progress-bgColor: #1f1f1f;
	--player-progress-color: #fc4400;
}
```

## Keyboard Shortcuts

- **Space**: Toggle play/pause (ignored while typing in text fields or interacting with form controls)

## Development

This project uses [Vite+](https://viteplus.dev/guide/) as its unified toolchain (linting via Oxlint, formatting via Oxfmt, dev server and builds via `vp`).

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Type check (svelte-check)
npm run check

# Lint + format check
npm run lint

# Format code
npm run format

# One-shot gate: format + lint + type-aware checks
npx vp check
```

## Song Data Format

Each song object should have:

```typescript
{
	audio: string; // URL to audio file
	title: string; // Song title
	cover: string; // URL to cover image
}
```

## License

MIT
