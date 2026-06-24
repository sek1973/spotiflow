import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyAuthService } from './spotify-auth.service';

export interface SpotifyPlaylist {
    id: string;
    name: string;
    images: { url: string }[];
    tracks: { total: number };
    external_urls: { spotify: string };
}

interface PlaylistsResponse {
    items: SpotifyPlaylist[];
}

@Injectable({
    providedIn: 'root'
})
export class SpotifyApiService {
    private static readonly apiBase = 'https://api.spotify.com/v1';

    constructor(
        private http: HttpClient,
        private authService: SpotifyAuthService
    ) { }

    getPlaylists(): Observable<SpotifyPlaylist[]> {
        const token = this.authService.getAccessToken();
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<PlaylistsResponse>(
            `${SpotifyApiService.apiBase}/me/playlists`,
            { headers }
        ).pipe(map(res => res.items));
    }
}
