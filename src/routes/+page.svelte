<script lang="ts">
	const music = [
		{
			audio:
				'https://file-examples.com/storage/fe602ed48f677b2319947f8/2017/11/file_example_MP3_700KB.mp3',
			title: 'tell me',
			cover: '/covers/tell-me.jpg'
		}
	];
	import { MusicApp } from '$lib/';
</script>

<MusicApp playlist={music} showPlaylist={false} />
