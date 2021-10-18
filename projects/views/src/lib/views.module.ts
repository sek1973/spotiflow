import { NgModule } from '@angular/core';
import { SpotifyComponent } from './components/spotify/spotify.component';
import { SpotifyLoginComponent } from './components/spotify-login/spotify-login.component';

@NgModule({
  declarations: [
    SpotifyComponent,
    SpotifyLoginComponent
  ],
  imports: [
  ],
  exports: [
    SpotifyComponent
  ]
})
export class ViewsModule { }
