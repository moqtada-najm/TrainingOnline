import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {


    
data = {
  FirstName: '',
  LastName: '',
  username: '',
  emile: '',
  Password: '',
  ConfirmPassword: '',
  Phone: ''
}
mytext = "example@edede.orq"


  constructor() {

    setInterval(() => {
      // first name
      if (this.data.FirstName != ""){
        document.getElementById("in-fn").setAttribute("style","border : 1px solid #39f;") ;
        document.getElementById("ic1").setAttribute("style","color : #39f;") ;
      } else {
        document.getElementById("in-fn").setAttribute("style","border : 1px solid red;") ;
        document.getElementById("ic1").setAttribute("style","color : red;") ;
      }
        // last name
        if (this.data.LastName != ""){
          document.getElementById("in-ln").setAttribute("style","border : 1px solid #39f;") ;
          document.getElementById("ic2").setAttribute("style","color : #39f;") ;
        } else {
          document.getElementById("in-ln").setAttribute("style","border : 1px solid red;") ;
          document.getElementById("ic2").setAttribute("style","color : red;") ;
        }
        //  password
        if (this.data.Password != ""){
          document.getElementById("in-p").setAttribute("style","border : 1px solid #39f;") ;
          document.getElementById("ic4").setAttribute("style","color : #39f;") ;
        } else {
          document.getElementById("in-p").setAttribute("style","border : 1px solid red;") ;
          document.getElementById("ic4").setAttribute("style","color : red;") ;
        }
        // confirm password
        if (this.data.ConfirmPassword != ""){
          document.getElementById("in-cp").setAttribute("style","border : 1px solid #39f;") ;
          document.getElementById("ic5").setAttribute("style","color : #39f;") ;
        } else {
          document.getElementById("in-cp").setAttribute("style","border : 1px solid red;") ;
          document.getElementById("ic5").setAttribute("style","color : red;") ;
        }
        // emile
        if (this.data.emile != ""){
          if (this.data.emile.search("@codeforiraq.orq") != -1){
          document.getElementById("in-emil").setAttribute("style","border : 1px solid #39f;") ;
          document.getElementById("ic3").setAttribute("style","color : #39f;") ;
          document.getElementById("foremile").innerText = "";

        } else{
          document.getElementById("foremile").innerText = "eroor emile please enter (example@codeforiraq.orq)";
        } 
      } else {
          document.getElementById("in-emil").setAttribute("style","border : 1px solid red;") ;
          document.getElementById("ic3").setAttribute("style","color : red;") ;
       
      }
            }, 1000);
  

   }

  ngOnInit() {
    console.log("name is " + this.data.FirstName)
    console.log("myserach " +  this.mytext.search("@codeforiraq.orq"))
  }
  endsingup() {
    console.log(this.data.FirstName)
  }

}
