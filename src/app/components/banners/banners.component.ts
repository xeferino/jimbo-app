/**
 *
 * @fileoverview BannersComponent
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
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {

  slidesBanner = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    spaceBetween: 1,
    centeredSlides: false,
    autoplay: true,
    pager: true,
    paginationType: 'bullets'
  };

  banners: any = [];

  load: boolean = true;

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.api
      .get(`sliders`)
      .then((response: any) => {
        this.load = false;
        this.banners = response.sliders;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }
}
