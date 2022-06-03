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
    {
      name: 'Milthon',
      score: 2.5,
      selected: false,
      image: 'assets/images/milthon.PNG',
    },
    {
      name: 'Huesos',
      score: 1,
      selected: false,
      image: 'assets/images/huesos.PNG',
    },
    {
      name: 'Daniel',
      score: 3.5,
      selected: false,
      image: 'assets/images/daniel.PNG',
    },
    {
      name: 'Cristian',
      score: 3.5,
      selected: false,
      image: 'assets/images/cristian.PNG',
    },
    {
      name: 'Jose',
      score: 2.5,
      selected: false,
      image: 'assets/images/jose.PNG',
    },
    {
      name: 'Junior',
      score: 2.5,
      selected: false,
      image: 'assets/images/junior.PNG',
    },
    {
      name: 'Maicol',
      score: 1.5,
      selected: false,
      image: 'assets/images/maicol.PNG',
    },
    {
      name: 'Jhon',
      score: 2.5,
      selected: false,
      image: 'assets/images/jhon.PNG',
    },
    {
      name: 'Alejandro',
      score: 3,
      selected: false,
      image: 'assets/images/alejandro.PNG',
    },
    {
      name: 'Sandra',
      score: 0.5,
      selected: false,
      image: 'assets/images/sandra.PNG',
    },
    {
      name: 'Farid',
      score: 0.5,
      selected: false,
      image: 'assets/images/farid.PNG',
    },
    {
      name: 'Maicol 2',
      score: 2,
      selected: false,
      image: 'assets/images/maicol 2.PNG',
    },
    {
      name: 'Andrea',
      score: 0.5,
      selected: false,
      image: 'assets/images/andrea.PNG',
    },
    {
      name: 'Camila',
      score: 0.5,
      selected: false,
      image: 'assets/images/camila.PNG',
    },
    {
      name: 'Esteban',
      score: 2,
      selected: false,
      image: 'assets/images/esteban.PNG',
    },
    {
      name: 'Angie',
      score: 0.5,
      selected: false,
      image: 'assets/images/angie.PNG',
    },
    {
      name: 'Fabian',
      score: 1,
      selected: false,
      image: 'assets/images/fabian.PNG',
    },
  ];
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
  raffle(): void {
    const players = this.players.filter((player: Players) => player.selected);
    this.algorithme1(players);
  }
  algorithme1(players: Players[], attemps: number = 1): void {
    if (attemps <= 100) {
      let data = {
        players,
        teamA: [],
        specialCase: false,
      };
      const playersNumber = players.length;
      const copyPlayers = JSON.parse(JSON.stringify(players));
      while (data.teamA.length < playersNumber / 2) {
        const random = Math.floor(Math.random() * players.length);
        data.specialCase = false;
        if (playersNumber > 6) {
          switch (players[random].name) {
            case 'Jose':
              data = this.checkPartner(
                data.players,
                data.teamA,
                random,
                data.specialCase,
                'Sandra'
              );
              break;
            case 'Sandra':
              data = this.checkPartner(
                data.players,
                data.teamA,
                random,
                data.specialCase,
                'Jose'
              );
              break;
            case 'Maicol':
              data = this.checkPartner(
                data.players,
                data.teamA,
                random,
                data.specialCase,
                'Andrea'
              );
              break;
            case 'Andrea':
              data = this.checkPartner(
                data.players,
                data.teamA,
                random,
                data.specialCase,
                'Maicol'
              );
              break;
            case 'Milthon':
              data = this.checkPartner(
                data.players,
                data.teamA,
                random,
                data.specialCase,
                'Camila'
              );
              break;
            case 'Camila':
              data = this.checkPartner(
                data.players,
                data.teamA,
                random,
                data.specialCase,
                'Milthon'
              );
              break;
            case 'Angie':
              data = this.checkPartner(
                data.players,
                data.teamA,
                random,
                data.specialCase,
                'Fabian'
              );
              break;
            case 'Fabian':
              data = this.checkPartner(
                data.players,
                data.teamA,
                random,
                data.specialCase,
                'Angie'
              );
              break;
          }
        }
        if (!data.specialCase) {
          data.teamA.push(players[random]);
          players.splice(random, 1);
        }
      }
      let differenceA = 0;
      let differenceB = 0;

      data.teamA.forEach((player: Players) => {
        differenceA += player.score;
      });
      players.forEach((player: Players) => {
        differenceB += player.score;
      });
      if (Math.abs(differenceA - differenceB) <= 1) {
        if (data.teamA && players) {
          const navigationExtras: NavigationExtras = {
            state: {
              teamA: data.teamA,
              teamB: players,
              difference: differenceA - differenceB,
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
  checkPartner(
    players: Players[],
    teamA: Players[],
    random: number,
    specialCase: boolean,
    partner: string
  ) {
    const index = players.findIndex(
      (player: Players) => player.name === partner
    );
    if (index >= 0) {
      teamA.push(players[index]);
      players.splice(index, 1);
      if (index < random) {
        specialCase = true;
        teamA.push(players[random - 1]);
        players.splice(random - 1, 1);
      }
    }
    return {
      players,
      teamA,
      specialCase,
    };
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
  selectAll(): void {
    this.players.forEach((player: Players) => {
      player.selected = !this.all;
    });
    this.all = !this.all;
  }
}
