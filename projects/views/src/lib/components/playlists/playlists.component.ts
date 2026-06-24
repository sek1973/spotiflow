import { Component, OnInit } from '@angular/core';
import { SpotifyApiService, SpotifyPlaylist } from 'projects/auth/src/public-api';

@Component({
    selector: 'lib-playlists',
    templateUrl: './playlists.component.html',
    styleUrls: ['./playlists.component.css'],
    standalone: false
})
export class PlaylistsComponent implements OnInit {
    playlists: SpotifyPlaylist[] = [];
    loading = true;
    error: string | null = null;

    constructor(private spotifyApi: SpotifyApiService) { }

    ngOnInit(): void {
        this.spotifyApi.getPlaylists().subscribe({
            next: (playlists) => {
                this.playlists = playlists;
                this.loading = false;
            },
            error: () => {
                this.error = 'Failed to load playlists.';
                this.loading = false;
            }
        });
    }
}
