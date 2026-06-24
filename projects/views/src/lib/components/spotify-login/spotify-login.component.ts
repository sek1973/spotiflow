import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SpotifyAuthService } from 'projects/auth/src/public-api';

@Component({
    selector: 'lib-spotify-login',
    templateUrl: './spotify-login.component.html',
    styleUrls: ['./spotify-login.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SpotifyLoginComponent implements OnInit {

  constructor(private authService: SpotifyAuthService) { }

  ngOnInit(): void {
    this.authService.login();
  }

}
