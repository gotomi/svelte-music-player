<script lang="ts">
	import './assets/style.css';
	import MusicPlayer from './MusicPlayer.svelte';
	import type { Playlist } from '../types';

	interface Props {
		playlist: Playlist;
		autoplay?: boolean;
		showPlaylist?: boolean;
	}

	let { playlist, autoplay: initialAutoplay = false, showPlaylist = true }: Props = $props();

	let currentSongIndex = $state(0);
	// svelte-ignore state_referenced_locally
	// The autoplay prop only seeds the initial value; playback state is managed locally afterwards.
	let autoplay = $state(initialAutoplay);

	function changeSong(index: number): void {
		currentSongIndex = index;
		autoplay = true;
	}
</script>

<div class="music-app" class:showPlaylist>
	{#if showPlaylist}
		<div class="playlist">
			{#each Array.isArray(playlist) ? playlist : [] as item, index (index)}
				<button
					class={index === currentSongIndex ? 'active-song' : ''}
					onclick={() => changeSong(index)}
				>
					🎹 {item.title}
				</button>
			{/each}
		</div>
	{/if}
	<MusicPlayer {playlist} {autoplay} {currentSongIndex} onCurrentSongEnded={changeSong} />
</div>

<style>
	.music-app {
		display: grid;
		grid-template-columns: 3fr;
		align-items: flex-start;
		grid-gap: 1rem;
		max-width: 860px;
		font-family: sans-serif;
	}

	.showPlaylist {
		grid-template-columns: 1fr 3fr;
	}

	button {
		background: none;
		border: none;
		cursor: pointer;
		display: block;
		flex: 1 1 240px;
		text-align: left;
	}

	.active-song {
		font-weight: bold;
	}

	@media (max-width: 480px) {
		.music-app {
			grid-template-columns: 1fr;
		}
	}

	.playlist {
		background-color: var(--player-theme-bgColor);
		color: var(--player-theme-color);
		height: 100%;
		display: flex;
		flex-wrap: wrap;
	}
</style>
