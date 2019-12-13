import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AlertController, ToastController } from '@ionic/angular';

var firestore = firebase.firestore();
const colRefCards = firestore.collection("cards")
const colRefUsers = firestore.collection("users")

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

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
          for (let item of snapshot.data().members) {
            
            if (item == this.id) {
              this.joined = true
            }
          }
          if (snapshot.data().host[0] == this.id) {
            this.joined = true
          }
          if (snapshot.data().teacher == this.id) {
            this.joined = true
          }
          if (!this.joined && !snapshot.data().status) {
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

  async confirmTeachCard(id: string, courseName: string, topic: string, count: string, capacity: string, price: string, members: string[], host: string[]) {
      const alert = await this.alertController.create({
        header: 'Teach?',
        message: courseName + ' : ' + topic + '\n\r'+ count + '/' + capacity + '\n\r' + price + '฿/hr',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Teach!',
            handler: () => {
              console.log('Confirm Okay');
              this.teachCard(id);
            }
          }
        ]
      });
      await alert.present();
  }
  teachCard(id:string) {
    colRefCards.doc(id).update({
      teacher: firebase.firestore.FieldValue.arrayUnion(this.id),
      status: true
    })
    colRefUsers.doc(this.id).update({
      cards: firebase.firestore.FieldValue.arrayUnion(id),
    })
    this.showTeached();
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

  openNewCardWithQueryParams() {
    let navigationExtras = {
      queryParams: {
        id: this.id
      }
    }
    this.router.navigate(['new-card'], navigationExtras);
  }

  async showTeached() {
    const t = await this.toast.create({
      message: "Card Teached!",
      duration: 3000
    });
    await t.present();
  }
}
