import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {



  data = {
    FirstName: "",
    LastName: '',
    email: '',
    Password: '',
    ConfirmPassword: '',
  }
  itemList: AngularFireList<any>
  showpage = "none";
  constructor(public db: AngularFireDatabase, public router: Router, public fire: AngularFireAuth) {
    setInterval(() => {
      if (this.showpage != "none") {
        // first name
        if (this.data.FirstName != "") {
          document.getElementById("in-fn").setAttribute("style", "border : 1px solid #39f;");
          document.getElementById("ic1").setAttribute("style", "color : #39f;");
        } else {
          document.getElementById("in-fn").setAttribute("style", "border : 1px solid red;");
          document.getElementById("ic1").setAttribute("style", "color : red;");
        }
        // last name
        if (this.data.LastName != "") {
          document.getElementById("in-ln").setAttribute("style", "border : 1px solid #39f;");
          document.getElementById("ic2").setAttribute("style", "color : #39f;");
        } else {
          document.getElementById("in-ln").setAttribute("style", "border : 1px solid red;");
          document.getElementById("ic2").setAttribute("style", "color : red;");
        }
        //  password
        if (this.data.Password != "") {
          document.getElementById("in-p").setAttribute("style", "border : 1px solid #39f;");
          document.getElementById("ic4").setAttribute("style", "color : #39f;");
        } else {
          document.getElementById("in-p").setAttribute("style", "border : 1px solid red;");
          document.getElementById("ic4").setAttribute("style", "color : red;");
        }
        // confirm password
        if (this.data.ConfirmPassword != "") {
          if (this.data.ConfirmPassword == this.data.Password) {
            document.getElementById("in-cp").setAttribute("style", "border : 1px solid #39f;");
            document.getElementById("ic5").setAttribute("style", "color : #39f;");
            document.getElementById("forpass").innerText = "";

          } else {
            document.getElementById("forpass").innerText = "password does not match";
            document.getElementById("in-cp").setAttribute("style", "border : 1px solid red;");
            document.getElementById("ic5").setAttribute("style", "color : red;");
          }
        } else {
          document.getElementById("in-cp").setAttribute("style", "border : 1px solid red;");
          document.getElementById("ic5").setAttribute("style", "color : red;");
        }
        // email
        if (this.data.email != "") {
          if (this.data.email.search("@codeforiraq.org") != -1) {
            document.getElementById("in-emil").setAttribute("style", "border : 1px solid #39f;");
            document.getElementById("ic3").setAttribute("style", "color : #39f;");
            document.getElementById("foremile").innerText = "";

          } else {
            document.getElementById("foremile").innerText = "eroor email please enter (example@codeforiraq.org)";
          }
        } else {
          document.getElementById("in-emil").setAttribute("style", "border : 1px solid red;");
          document.getElementById("ic3").setAttribute("style", "color : red;");

        }
      }
    }, 1000);



  }

  ngOnInit() {
  }
  foris(x) {
    this.showpage = x;
  }

  forsingup() {
    // document.getElementById("waiting").innerHTML = "<span>one minute please </span>";
    document.getElementById("waiting").innerHTML = "<span>Loading </span> <i class='fas fa-spinner fa-pulse'></i>";
    setTimeout(() => {
      if (this.data.email.search("@codeforiraq.org") != -1) {
        if (this.data.Password == this.data.ConfirmPassword && this.data.Password != "") {
          this.fire.auth.createUserWithEmailAndPassword(this.data.email, this.data.Password)
            .then(user => {
              this.itemList = this.db.list("users");
              this.itemList.push({
                FirstName: this.data.FirstName,
                LastName: this.data.LastName,
                email: this.data.email,
                rank: this.showpage
              }).then(out => { console.log("sing in is end thanks") })
              this.showpage = "none"
              this.router.navigate(['/login'])
            }).catch(errors => {
              document.getElementById("waiting").innerHTML = "<div class='uk-label uk-label-danger' uk-alert>  <span>error occurred, please try later</span></div>  ";
            });
        } else { document.getElementById("waiting").innerHTML = "<div class='uk-label uk-label-danger' uk-alert>  <span>The password is incorrect.</span></div>  "; }

      } else { document.getElementById("waiting").innerHTML = "<div class='uk-label uk-label-danger' uk-alert>  <span>email is incorrect.</span></div>"; }
    }, 2000);
  }
}

