<script lang="ts">
	import { MusicApp, type Song } from '#lib';

	const music: Song[] = [
		{
			audio: 'https://download.samplelib.com/mp3/sample-3s.mp3',
			title: 'tell me',
			cover: 'https://gotomi.info/covers/c-moll-jass.jpg'
		},
		{
			audio: 'https://download.samplelib.com/mp3/sample-6s.mp3',
			title: 'tell me',
			cover: 'https://gotomi.info/covers/tell-me.jpg'
		}
	];
</script>

<MusicApp playlist={music} showPlaylist={true} />
