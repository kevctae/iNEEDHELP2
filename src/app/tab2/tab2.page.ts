import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { IonInfiniteScroll } from '@ionic/angular';

firebase.initializeApp(environment.firebaseConfig);
var firestore = firebase.firestore();
const colRefCards = firestore.collection("cards")

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  items = [];
  id: any;
  public cardData: firebase.firestore.DocumentData;
  query = colRefCards.orderBy("id", "desc");
  i = 7;

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = params.id
      }
    })
    
    /*this.query.limit(1).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.i= String(Number(doc.data().id));
      })
    });*/
    this.addMoreItems();
  }

  ngOnInit() {
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
      console.log(this.i);
      var docRef = firestore.collection('cards').doc(j+"");
      docRef.get().then((snapshot) => {
        this.cardData = snapshot.data();
        this.items.push(this.cardData)
      });
    }
    this.i -= 10;
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

}