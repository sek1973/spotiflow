import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/auth/src/public-api';
import { SpotifyComponent, SpotifyLoginComponent } from 'projects/views/src/public-api';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'spotify',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: SpotifyLoginComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'spotify',
    component: SpotifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
