import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  emailtoreset: string;
  itemList: AngularFireList<any>;
  listArray = [];


  constructor(public db: AngularFireDatabase, public fire: AngularFireAuth, public afStorage: AngularFireStorage, private router: Router) {
    this.itemList = db.list('users')
  }


  ngOnInit() {
  }
  tologin() {
    this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        var users = this.fire.auth.currentUser;
        localStorage.setItem('uid', users.displayName)
        if (users.displayName == null) {
          this.itemList.snapshotChanges()
            .subscribe(Actions => {
              Actions.forEach(action => {
                let y = action.payload.toJSON()
                y['$key'] = action.key
                if (action.payload.child("email").val() == this.email) {
                  this.itemList.update(y['$key'], {
                    uid: users.uid,
                    photoURL: 'https://firebasestorage.googleapis.com/v0/b/trainingonline-eae18.appspot.com/o/o4s99gdxuw?alt=media&token=144f1265-0781-42d9-b0de-4126ec321a50'
                  })
                  users.updateProfile({
                    displayName: y['$key'],
                    photoURL: 'https://firebasestorage.googleapis.com/v0/b/trainingonline-eae18.appspot.com/o/o4s99gdxuw?alt=media&token=144f1265-0781-42d9-b0de-4126ec321a50'
                  })
                  console.log('completed ferst log in')
                }
              })
            })
        }
        document.getElementById("iferror").innerHTML = "";
        localStorage.setItem('isLoggedIn', 'true')
        this.router.navigateByUrl('/home')
      }).catch(errors => {
        if (errors['message'] == "There is no user record corresponding to this identifier. The user may have been deleted.") {
          document.getElementById("iferror").innerHTML = "<div class='uk-alert-danger'uk-alert><a class='uk-alert-close'></a><p> <i class='fas fa-exclamation-circle'></i> Sorry this email does not exist or error.</p></div>";
          document.getElementById("ifemail").style.border = "1px solid red"
        }
        if (errors['message'] == "The password is invalid or the user does not have a password.") {
          document.getElementById("iferror").innerHTML = "<div class='uk-alert-danger'uk-alert><a class='uk-alert-close'></a><p> <i class='fas fa-exclamation-circle'></i> Invalid password.</p></div>";
          document.getElementById("ifpass").style.border = "1px solid red"
        }
      });
  }
  resetpassword() {
    this.fire.auth.sendPasswordResetEmail(this.emailtoreset).then(function () {
      document.getElementById("sendreset").innerHTML = "<div class='uk-alert-success'uk-alert><a class='uk-alert-close'></a><p> <i class='fas fa-check-circle'></i> i am send mseeage reset to your email.</p></div>"
    }).catch(errors => {
      document.getElementById("errorReset").innerHTML = "<div class='uk-alert-danger'uk-alert><a class='uk-alert-close'></a><p> <i class='fas fa-exclamation-circle'></i> error email.</p></div>"
    })
  }
}
