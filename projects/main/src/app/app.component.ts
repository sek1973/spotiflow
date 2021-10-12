import { Component } from '@angular/core';
import { SpotifyAuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: SpotifyAuthService) { }

  onClick(): void {
    this.authService.login();
  }
}
