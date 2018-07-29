import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  private  isLoggedIn:boolean;
  login:any
  constructor(public afAuth:AngularFireAuth,  public router:Router) {
    this.user = afAuth.authState;

    let status;
    setInterval( () => {
      status = localStorage.getItem('isLoggedIn');
      this.isLoggedIn = status === 'true';
    }, 1000);
 }

  ngOnInit() {
  }

  logout(){
    this.afAuth.auth.signOut();
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('uid', 'null')
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
    console.log("isloog: " +this.isLoggedIn)

  }
}
