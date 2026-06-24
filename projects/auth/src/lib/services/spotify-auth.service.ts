
import { Inject, Injectable, DOCUMENT } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SPOTIFY_AUTH_CONFIG } from '../private-config';

const CODE_VERIFIER_KEY = 'spotify_code_verifier';
const ACCESS_TOKEN_KEY = 'spotify_access_token';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  static readonly spotifyAuthUrl = 'https://accounts.spotify.com/authorize';
  static readonly spotifyTokenUrl = 'https://accounts.spotify.com/api/token';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) { }

  public async login(): Promise<void> {
    const verifier = this.generateCodeVerifier();
    const challenge = await this.generateCodeChallenge(verifier);
    sessionStorage.setItem(CODE_VERIFIER_KEY, verifier);
    this.document.location.href = this.createSpotifyAuthUrl(challenge);
  }

  public async exchangeCodeForToken(code: string): Promise<void> {
    const verifier = sessionStorage.getItem(CODE_VERIFIER_KEY);
    if (!verifier) {
      throw new Error('No PKCE code verifier found in session storage');
    }

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', SPOTIFY_AUTH_CONFIG.redirect_uri)
      .set('client_id', SPOTIFY_AUTH_CONFIG.client_id)
      .set('code_verifier', verifier);

    const response = await this.http.post<{ access_token: string }>(
      SpotifyAuthService.spotifyTokenUrl,
      body.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).toPromise();

    if (!response?.access_token) {
      throw new Error('No access token in Spotify response');
    }

    sessionStorage.removeItem(CODE_VERIFIER_KEY);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
  }

  public getAccessToken(): string | null {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  private createSpotifyAuthUrl(codeChallenge: string): string {
    const scope = SPOTIFY_AUTH_CONFIG.scope.join(' ');
    const params = new URLSearchParams({
      response_type: SPOTIFY_AUTH_CONFIG.response_type,
      client_id: SPOTIFY_AUTH_CONFIG.client_id,
      scope,
      redirect_uri: SPOTIFY_AUTH_CONFIG.redirect_uri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });
    return `${SpotifyAuthService.spotifyAuthUrl}?${params.toString()}`;
  }

  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}
