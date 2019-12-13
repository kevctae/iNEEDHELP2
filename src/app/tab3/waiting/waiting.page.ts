import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AlertController, ToastController } from '@ionic/angular';

var firestore = firebase.firestore();
const colRefCards = firestore.collection("cards")
const colRefUsers = firestore.collection("users")

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.page.html',
  styleUrls: ['./waiting.page.scss'],
})
export class WaitingPage implements OnInit {

  items = [];
  id: any;
  query = colRefCards.orderBy("id", "desc");
  i: any;
  loading = true;
  j: any;
  joined: boolean;

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private toast: ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = params.id
      }
    })
  }

  ngOnInit() {
    this.getID();
  }

  getID() {
    this.query.limit(1).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setID(String(Number(doc.data().id)));
      })
    });
  }
  setID(id: string) {
    this.j = Number(id);
    this.i = Number(id);
    if (this.i==0) {
      this.loading = false;
    }
    this.addMoreItems();
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.addMoreItems();
      event.target.complete();
    }, 500);
  }
  addMoreItems() {
    for (let j=Number(this.i); j>Number(this.i)-10; j--) {
      if (j>0) {
        var docRef = firestore.collection('cards').doc(j+"");
        docRef.get().then((snapshot) => {
          this.loading = false;
          this.joined = false;
          if (snapshot.data().host[0] == this.id) {
            this.joined = true
          }
          if (this.joined && !snapshot.data().status) {
            this.items.push(snapshot.data());
          }
        }).catch(e => console.log(e));
      }
    }
    this.i -= 10;
  }
  doRefresh(event) {
    this.items = [];
    console.log('Begin async operation');
    this.getID()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  async confirmDeleteCard(id: string, courseName: string, topic: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete Card?',
      message: courseName + ' : ' + topic,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteCard(id);
          }
        }
      ]
    });
    await alert.present();
}
  deleteCard(id: string) {
    colRefCards.doc(id).delete();
    this.showDeleted();
  }
  async showDeleted() {
    const t = await this.toast.create({
      message: "Card Deleted!",
      duration: 3000
    });
    await t.present();
  }

}