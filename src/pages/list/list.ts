import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}

@Component({
  template: `
    <ion-tabs class="tabs-basic">
      <ion-tab tabTitle="Music" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="Movies" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="Games" [root]="rootPage"></ion-tab>
    </ion-tabs>
`})
export class BasicPage {
  rootPage = ListPage;
}


/*
import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';


@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Tabs</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
    </ion-content>
`})
export class ListPage {
  isAndroid: boolean = false;

  constructor(platform: Platform) {
    this.isAndroid = platform.is('android');
  }
}

@Component({
  template: `
    <ion-tabs class="tabs-basic">
      <ion-tab tabTitle="Music" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="Movies" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="Games" [root]="rootPage"></ion-tab>
    </ion-tabs>
`})
export class BasicPage {
  rootPage = ListPage;
}*/