import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebaseConfig);
var firestore = firebase.firestore();
const colRef = firestore.collection("users")

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoggedIn = false;
  userData = { id: '', name: '', email: '', picture: { data: { url: '' } } };

  constructor(
    private facebook: Facebook,
    private router: Router
  ) {
    this.facebook.getLoginStatus()
    .then(response => {
      console.log(response.status);
      if (response.status === 'connect') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }

  ngOnInit() {
  }

  //Facebook Functions
  loginWithFB() {
    this.facebook.login(['email', 'public_profile'])
    .then(response => {
      if (response.status == 'connected') {
        this.isLoggedIn = true;
        this.getUserDetail(response.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
  getUserDetail(userID: any) {
    this.facebook.api('/' + userID + '/?fields=id,email,name,picture.width(720).height(720)', ['public_profile'])
    .then(response => {
      console.log(response);
      this.userData = response;
      this.addDataToFirestore(this.userData);
      this.checkLoginStatus();
    })
  }
  checkLoginStatus() {
    if (this.isLoggedIn) {
      this.openTab2WithQueryParams(this.userData);
    } else {
      console.log('not connected');
    }
  }

  openTab2WithQueryParams(data: any) {
    let navigationExtras = {
      queryParams: {
        id: data['id']
      }
    }
    this.router.navigate(['tab2'], navigationExtras);
  }

  addDataToFirestore(data: any) {
    colRef.doc(data['id']).set({
      id: data['id'],
      name: data['name'],
      email: data['email'],
      picture: data['picture']['data']['url'],
    }).then(function() {
      console.log("Status saved!");
    }).catch(function (error){
      console.log("Got an error: ", error);
    });
  }
}
