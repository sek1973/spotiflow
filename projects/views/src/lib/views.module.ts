import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyComponent } from './components/spotify/spotify.component';
import { SpotifyLoginComponent } from './components/spotify-login/spotify-login.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';

@NgModule({
  declarations: [
    SpotifyComponent,
    SpotifyLoginComponent,
    PlaylistsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpotifyComponent,
    PlaylistsComponent
  ]
})
export class ViewsModule { }
