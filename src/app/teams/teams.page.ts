import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Players } from '../models/players';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  teamA: Players[] = [];
  teamB: Players[] = [];
  difference = 0;
  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.getCurrentNavigation() != null) {
      if (this.router.getCurrentNavigation().extras.state) {
        const { teamA, teamB, difference } =
          this.router.getCurrentNavigation().extras.state;
        this.teamA = teamA;
        this.teamB = teamB;
        this.difference = difference;
      } else {
        this.router.navigate(['/home']);
      }
    }
  }
}
