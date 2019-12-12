import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Tab2Page } from '../tab2/tab2.page';

var firestore = firebase.firestore();
const colRefCards = firestore.collection("cards")

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.page.html',
  styleUrls: ['./new-card.page.scss'],
})
export class NewCardPage implements OnInit {

  id: any;
  courseNumber: any;
  topic: any;
  capacity: any;
  price: any;
  cardID: any;
  public userData: firebase.firestore.DocumentData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastController
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

    var query = colRefCards.orderBy("id", "desc").limit(1);
    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.cardID = String(Number(doc.data().id) + 1);
      })
    });
  }

  initializeCard() {
    var docRefCourses = firestore.collection('courses').doc(this.courseNumber);
    var courseName = '';
    docRefCourses.get().then((snapshot) => {
      courseName = snapshot.data().name;
      console.log(courseName);
      console.log(this.cardID);
      this.addCard(this.cardID, courseName)
    });
  }
  addCard(id: string, name: string) {
    colRefCards.doc(id).set({
      capacity: this.capacity,
      count: 1,
      courseID: id,
      id: this.cardID,
      courseName: name,
      price: this.price,
      topic: this.topic,
      host: [this.id, this.userData.name],
      members: []
    }).then(function() {
      console.log("Status saved!");
    }).catch(function (error){
      console.log("Got an error: ", error);
    });
    this.openTab2WithQueryParams();
    this.showAdded()
  }

  openTab2WithQueryParams() {
    let navigationExtras = {
      queryParams: {
        id: this.id
      }
    }
    this.router.navigate(['tab2'], navigationExtras);
  }

  async showAdded() {
    const t = await this.toast.create({
      message: "Card Added!",
      duration: 3000
    });
    await t.present();
  }
}
