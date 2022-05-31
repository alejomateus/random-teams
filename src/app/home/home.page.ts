import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Players } from '../models/players';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  players: Players[] = [
    { name: 'Milthon', score: 2.5, selected: false },
    { name: 'Huesos', score: 1.5, selected: false },
    { name: 'Daniel', score: 3.5, selected: false },
    { name: 'Cristian', score: 3.5, selected: false },
    { name: 'Jose', score: 2.5, selected: false },
    { name: 'Junior', score: 2.5, selected: false },
    { name: 'Maicol', score: 2, selected: false },
    { name: 'Jhon', score: 2.5, selected: false },
    { name: 'Alejandro', score: 3, selected: false },
    { name: 'Sandra', score: 0.5, selected: false },
    { name: 'Farid', score: 0.5, selected: false },
    { name: 'Maicol(Perra)', score: 2, selected: false },
    { name: 'Andrea', score: 0.5, selected: false },
    { name: 'Camila', score: 0.5, selected: false },
    { name: 'Esteban', score: 2, selected: false },
    { name: 'Angie', score: 0.5, selected: false },
    { name: 'Fabian', score: 1, selected: false },
  ];
  teamA: Players[] = [];
  teamB: Players[] = [];
  all = false;
  constructor(
    private router: Router,
    public alertController: AlertController
  ) {}
  ngOnInit(): void {
    this.sort();
  }
  sort(): void {
    this.players.sort(() => Math.random() - 0.5);
  }
  selectPlayer(player: Players): void {
    player.selected = !player.selected;
  }
  async raffle() {
    const players = this.players.filter((player: Players) => player.selected);
    this.algorithme1(players);
  }
  algorithme1(players: Players[], attemps: number = 1) {
    if (attemps <= 100) {
      const playersNumber = players.length;
      const teamA = [];
      const copyPlayers = JSON.parse(JSON.stringify(players));
      while (teamA.length < playersNumber / 2) {
        const random = Math.floor(Math.random() * players.length);
        teamA.push(players[random]);
        players.splice(random, 1);
      }
      let diferenciaA = 0;
      let diferenciaB = 0;
      teamA.forEach((player: Players) => {
        diferenciaA += player.score;
      });
      players.forEach((player: Players) => {
        diferenciaB += player.score;
      });
      if (Math.abs(diferenciaA - diferenciaB) <= 1) {
        if (teamA && players) {
          const navigationExtras: NavigationExtras = {
            state: {
              teamA,
              teamB: players,
            },
          };
          this.router.navigate(['/teams'], navigationExtras);
        }
      } else {
        attemps += 1;
        this.algorithme1(copyPlayers, attemps);
      }
    } else {
      this.presentAlert();
    }
  }
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Seleccion de equipos',
      message: 'Los equipos estan desiguales.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  verifySelectedPlayers(): boolean {
    let selected = 0;
    this.players.forEach((player) => {
      if (player.selected === true) {
        selected += 1;
      }
    });
    return selected > 3;
  }
  selectAll() {
    this.players.forEach((player: Players) => {
      player.selected = !this.all;
    });
    this.all = !this.all;
  }
}
