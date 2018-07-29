import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.css']
})
export class MoreinfoComponent implements OnInit {
  data = {
    subject: "",
    lNumber: "",
    lStartTime: "",
    NumberLessonsHours: "",
    zoomLink: "",
    notes: "",
    uid: "user",
    userphoto: "",
    name: "name",
    email: "",
    date: "",
    allcome: ""
  }
  iskey: string
  isuid
  host = window.location.href;
  constructor(public db: AngularFireDatabase, public fire: AngularFireAuth, public router: Router, public ActivatedRoute: ActivatedRoute) {
    this.isuid = localStorage.getItem('uid')
    var islogin = localStorage.getItem('isLoggedIn');
    if (islogin != "false") {
      this.ActivatedRoute.params.subscribe(params => {
        this.iskey = params.id
        console.log(params.id)
      })
      this.db.database.ref("lessons/" + this.iskey).on("value", userd => {
        var allinfo = userd.val()
        this.data.subject = allinfo['subject']
        this.data.lNumber = allinfo['lNumber']
        this.data.lStartTime = allinfo['lStartTime']
        this.data.NumberLessonsHours = allinfo['NumberLessonsHours']
        this.data.zoomLink = allinfo['zoomLink']
        this.data.notes = allinfo['notes']
        this.data.uid = allinfo['uid']
        this.data.userphoto = allinfo['userphoto']
        this.data.name = allinfo['name']
        this.data.email = allinfo['email']
        this.data.date = allinfo['date']
        this.data.allcome = allinfo['allcome']
      }, error => {
        console.log(error)
      });
    } else {
      this.router.navigate(["login"])
    }
  }

  ngOnInit() {
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
    console.log(key);

  }
}
