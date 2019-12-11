import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

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
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Teach?',
      message: 'Discrete : Generating Function\n8/10\n1000฿/hr',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'teach',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  

}
