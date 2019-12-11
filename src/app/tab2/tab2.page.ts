import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})

export class Tab2Page implements OnInit {

  id: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = params.id
      }
    })
  }

  ngOnInit() {
  }

  openTab1WithQueryParams() {
    let navigationExtras = {
      queryParams: {
        id: this.id
      }
    }
    this.router.navigate(['tab1'], navigationExtras);
  }
  openTab2WithQueryParams() {
    let navigationExtras = {
      queryParams: {
        id: this.id
      }
    }
    this.router.navigate(['tab2'], navigationExtras);
  }
  openTab3WithQueryParams() {
    let navigationExtras = {
      queryParams: {
        id: this.id
      }
    }
    this.router.navigate(['tab3'], navigationExtras);
  }
  async Join() {
    const alert = await this.alertController.create({
      header: 'Join?',
      message: 'Discrete : Generating Function\n8/10\n200฿/hr',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'join',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

}