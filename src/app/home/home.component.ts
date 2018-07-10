import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  text = "Training Online \nIs a platform for the company code for Iraq,\nthrough which you can learn the lesson time in your PATH \nThe name of the trainer, the number of daily lessons,the number of attendees ... and more"
  constructor() { }

  ngOnInit() {
  }

}
