import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lib-spotify',
    templateUrl: './spotify.component.html',
    styleUrls: ['./spotify.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SpotifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
