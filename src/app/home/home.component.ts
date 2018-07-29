import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private  isLoggedIn:boolean;
  constructor() { 
     let status = localStorage.getItem('isLoggedIn');
      this.isLoggedIn = status === 'true';
  }

  ngOnInit() {
  }

}
