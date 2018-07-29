import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  itemList: AngularFireList<any>;
  users;
  data = {
    FirstName: "",
    LastName: "",
    email: "",
    rank: ""
  }
  new = {
    FirstName: "",
    LastName: "",
  }

  ref: AngularFireStorageReference;
  UploadTask: AngularFireUploadTask;

  photoURL: any
  constructor(public db: AngularFireDatabase, public fire: AngularFireAuth, public afStorage: AngularFireStorage, private router: Router, ) {
    this.itemList = db.list('users')
    this.fire.auth.onAuthStateChanged(user => {
      this.users = user.displayName
      this.photoURL = user.photoURL
      this.db.database.ref("users/" + this.users).on("value", userd => {
        var allinfo = userd.val()
        this.data.FirstName = allinfo['FirstName']
        this.data.LastName = allinfo['LastName']
        this.data.email = allinfo['email']
        this.data.rank = allinfo['rank']
        console.log(this.data)
      }, error => {
        console.log(error)
      });
    })


  }
  ngOnInit() {
  }


  upload(event) {
    const id = Math.random().toString(36).substring(2);
    const file: File = event.target.files[0];
    const metaData = { 'contentType': file.type };
    this.ref = this.afStorage.ref(id);
    this.UploadTask = this.ref.put(event.target.files[0]);
    this.UploadTask.then(url => {
      url.ref.getDownloadURL().then(urls => {
        var users = this.fire.auth.currentUser;
        this.photoURL = urls
        this.itemList.update(users.displayName, {
          photoURL: urls
        })
        users.updateProfile({
          displayName: users.displayName,
          photoURL: urls
        })
        this.router.navigateByUrl('/profile')
      })
    })
  }

  newprofile() {
    console.log("firstname :" + this.data.FirstName)
    console.log("new firstname :" + this.new.FirstName)
    if (this.new.LastName == null) {
      this.new.LastName = this.data.LastName
    }
    if (this.new.FirstName == null) {
      this.new.FirstName = this.data.FirstName
    }
    var useris = this.fire.auth.currentUser;
    this.itemList.update(useris.displayName, {
      FirstName: this.new.FirstName,
      LastName: this.new.LastName
    })
    this.router.navigateByUrl('/profile')
    document.getElementById("errorReset").innerHTML = "<div class='uk-alert-success'uk-alert><a class='uk-alert-close'></a><p> <i class='fas fa-check-circle'></i> Profile successfully updated.</p></div>"
    setTimeout(() => {
      document.getElementById("errorReset").innerHTML = ""
    }, 5000);
  }
}

