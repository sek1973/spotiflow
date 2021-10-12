import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { SPOTIFY_AUTH_CONFIG } from '../private-config';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  static spotifyAuthUrl = 'https://accounts.spotify.com/authorize';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public login() {
    this.document.location.href = this.createSpotifyAuthUrl();
  }

  private createSpotifyAuthUrl(): string {
    const params: string[] = this.createParams();
    return `${SpotifyAuthService.spotifyAuthUrl}?${params.join('&')}`;
  }

  private createParams(): string[] {
    const result = [];
    SPOTIFY_AUTH_CONFIG.redirect_uri = this.document.URL;
    for (const [key, val] of Object.entries(SPOTIFY_AUTH_CONFIG)) {
      if (Array.isArray(val)) {
        result.push(`${key}=${(val as string[]).join(' ')}`);
      } else {
        result.push(`${key}=${val}`);
      }
    }
    return result;
  }

}
