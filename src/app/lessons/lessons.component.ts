import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  data = {
    subject: "",
    lNumber: "",
    lStartTime: "",
    NumberLessonsHours: "",
    zoomLink: "",
    notes: ""
  }
  itemList: AngularFireList<any>
  mylist: Observable<any>;
  techer: boolean
  uidname: string = localStorage.getItem('uid')
  host = window.location.host;
  constructor(public db: AngularFireDatabase, public router: Router, public fire: AngularFireAuth, public ActivatedRoute: ActivatedRoute) {
    var islogin = localStorage.getItem('isLoggedIn');
    if (islogin != "false") {
       this.db.database.ref("users/" + this.uidname).on("value", userd => {
      if (userd.val().rank == "techer") {
        this.techer = true
      } else {
        this.techer = false
      }
    })
    this.mylist = db.list("lessons").snapshotChanges();

  }else {
    this.router.navigate(["login"])
  }

  }
  ngOnInit() {
  }
  share() {
    var now = new Date();
    var getdate = now.toISOString().substr(0, 10).replace(/-/g, '/');
    var users = this.fire.auth.currentUser;
    var user = users.displayName
    var name: string, email: string
    this.db.database.ref("users/" + user).on("value", userd => {
      var allinfo = userd.val()
      name = allinfo['FirstName'] + " " + allinfo['LastName']
      email = allinfo['email']
    })
    this.db.list("lessons").push({
      subject: this.data.subject,
      lNumber: this.data.lNumber,
      lStartTime: this.data.lStartTime,
      NumberLessonsHours: this.data.NumberLessonsHours,
      zoomLink: this.data.zoomLink,
      notes: this.data.notes,
      uid: user,
      userphoto: users.photoURL,
      name: name,
      email: email,
      date: getdate,
      allcome: 0
    }).then(out => { console.log("Share the Lesson") })
    this.router.navigate(['/lessons'])
  }

  come(key) {
    var userEmail = this.fire.auth.currentUser.email;
    var db = this.db.list("lessons/" + key + "/allcomes", ref => ref.orderByChild("email").equalTo(userEmail)).snapshotChanges();
    var icome = db.subscribe(data => {
      if (data[0] == undefined) {
        this.db.list("lessons/" + key + "/allcomes").push({
          email: userEmail
        })
        this.db.database.ref("lessons/" + key).once("value", fois => {
          if (fois.val().allcome == undefined) {
            this.db.list("lessons").update(key, {
              allcome: 1
            })
          }
          if (fois.val().allcome != undefined) {
            this.db.list("lessons").update(key, {
              allcome: fois.val().allcome + 1
            })
          }
        }, error => {
          console.log(error);
        });
        console.log("you are come naw");
        icome.unsubscribe();
      }
      if (data[0] != undefined) {
        var mykey = data[0].key;
        this.db.list("lessons/" + key + "/allcomes/").remove(mykey)
        this.db.database.ref("lessons/" + key).once("value", fois => {
          var val = fois.val().allcome
          if (fois.val().allcome != undefined) {
            this.db.list("lessons").update(key, {
              allcome: fois.val().allcome - 1
            })
          }
          console.log(fois.val().allcome);
        }, error => {
          console.log(error);
        });
        console.log("you are not comme");
        icome.unsubscribe();
      }
    })
  }
  delete(key) {
    this.db.list("lessons").remove(key)
  }
  edit(key, Subject, lNumber, lStartTime, NumberLessonsHours, zoomLink, notes) {
    this.db.list("lessons").update(key, {
      subject: Subject,
      lNumber: lNumber,
      lStartTime: lStartTime,
      NumberLessonsHours: NumberLessonsHours,
      zoomLink: zoomLink,
      notes: notes,
    })
  }
  show(key) {
    var islogin = localStorage.getItem('isLoggedIn');
    if (islogin != "false") {
      this.router.navigate(["moreinfo/" + key])
    }
    else {
      this.router.navigate(["login"])
    }
  }
}
