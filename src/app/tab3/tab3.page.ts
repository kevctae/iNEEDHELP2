import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';

var firestore = firebase.firestore();

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  id: any;
  public userData: firebase.firestore.DocumentData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = params.id
      }
    })

  }

  ngOnInit() {
    var docRef = firestore.collection('users').doc(this.id);
    docRef.get().then((snapshot) => {
        this.userData = snapshot.data();
    });
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
  openWaitingWithQueryParams() {
    let navigationExtras = {
      queryParams: {
        id: this.id
      }
    }
    this.router.navigate(['tab3/waiting'], navigationExtras);
  }
  openConfirmedWithQueryParams() {
    let navigationExtras = {
      queryParams: {
        id: this.id
      }
    }
    this.router.navigate(['tab3/confirmed'], navigationExtras);
  }

}