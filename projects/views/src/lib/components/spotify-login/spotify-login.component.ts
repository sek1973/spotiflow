import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SpotifyAuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'lib-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class SpotifyLoginComponent {

  constructor(private authService: SpotifyAuthService) { }

  login(): void {
    this.authService.login();
  }

}
