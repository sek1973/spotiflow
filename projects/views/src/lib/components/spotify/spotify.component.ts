import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'lib-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class SpotifyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: SpotifyAuthService
  ) { }

  async ngOnInit(): Promise<void> {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      try {
        await this.authService.exchangeCodeForToken(code);
        this.router.navigate(['/playlists']);
      } catch (err) {
        console.error('Token exchange failed:', err);
        this.router.navigate(['/login']);
      }
    } else if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

}
