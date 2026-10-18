export interface Song {
	audio: string;
	title: string;
	cover: string;
}

export type Playlist = Song | Song[];
