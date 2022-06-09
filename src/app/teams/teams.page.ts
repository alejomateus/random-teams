import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Players } from '../models/players';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit, OnDestroy {
  teamA: Players[] = [];
  teamB: Players[] = [];
  difference = 0;
  audio: HTMLAudioElement = new Audio('assets/intro2.mp3');
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.getCurrentNavigation() != null) {
      if (this.router.getCurrentNavigation().extras.state) {
        const { teamA, teamB, difference } =
          this.router.getCurrentNavigation().extras.state;
        this.teamA = teamA;
        this.teamB = teamB;
        this.difference = difference;
        this.reproducir();
      } else {
        this.router.navigate(['/home']);
      }
    }
  }
  reproducir(): void {
    const audio = new Audio('assets/ray.mp3');
    audio.play();
    setTimeout(() => {
      this.audio.play();
    }, 1500);
  }
  ngOnDestroy(): void {
    if (this.audio) {
      this.audio.pause();
    }
  }
}
