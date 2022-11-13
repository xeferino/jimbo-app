/**
 *
 * @fileoverview WinnersPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.page.html',
  styleUrls: ['./winners.page.scss'],
})
export class WinnersPage implements OnInit {

  winners: any = [];

  load: boolean = true;

  show: number = 0;

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData();
  }

  setWinner(item) {
    this.show = item.id;
  }

  routes(route){
    this.helper.routes(route);
  }

  loadData() {
    this.load = true;
    this.api
      .get(`raffles/winners`)
      .then((response: any) => {
        this.load = false;
        //this.winners = response.raffles;

        this.winners = [
            {
                "id": 1,
                "title": "Ganate 1000$",
                "cash_to_draw": "$1,000.00",
                "date_start": "2022-11-11T00:00:00.000000Z",
                "date_end": "2022-11-14T00:00:00.000000Z",
                "date_release": "2022-10-12T00:00:00.000000Z",
                "days_ago": 32,
                "logo": "http://jimbo.test/assets/images/raffles/raffle.jpg",
                "winners": [
                    {
                        "id": 1,
                        "name": "Jose Lozada",
                        "dni": "20373816",
                        "phone": "41425365897",
                        "email": "jose_gle@gmail.com",
                        "address": "Cariaco",
                        "country_id": 1,
                        "amount": "$1,000.00",
                        "ticket_id_parent": "16361c5514b7441",
                        "ticket_id_winner": "111667352347",
                        "seller_id": 4,
                        "user_id": null,
                        "raffle_id": 1,
                        "created_at": "2022-11-13T13:54:38.000000Z",
                        "image": "http://jimbo.test/assets/images/avatar.svg",
                        "country": {
                            "id": 1,
                            "name": "Peru",
                            "iso": "PE",
                            "code": "+51",
                            "icon": "http://jimbo.test/assets/images/flags/1668296507.jpg"
                        }
                    }
                ]
            }
        ];

        console.log(this.winners.lenght)
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }
}