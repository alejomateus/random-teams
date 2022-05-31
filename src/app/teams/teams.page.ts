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
  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.getCurrentNavigation() != null) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.teamA = this.router.getCurrentNavigation().extras.state.teamA;
        this.teamB = this.router.getCurrentNavigation().extras.state.teamB;
        console.log(this.teamA);
        console.log(this.teamB);

      } else {
        this.router.navigate(['/home']);
      }
    }
  }
}
