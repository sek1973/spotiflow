import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { AuthParamConfig } from '../model/auth-param-config';

const config: AuthParamConfig = {
  response_type: 'token',
  client_id: '',
  scope: [],
  redirect_uri: '',
  state: '',
  show_dialog: true
};

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
    for (const [key, val] of Object.entries(config)) {
      if (Array.isArray(val)) {
        result.push(`${key}=${(val as string[]).join(' ')}`);
      } else {
        result.push(`${key}=${val}`);
      }
    }
    return result;
  }

}
