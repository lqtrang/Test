import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import 'rxjs/Rx';
// import 'rxjs/Rx';
@Injectable()
@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.css']
})
export class HompageComponent implements OnInit {
  quizs:any = {};

  constructor(private http: HttpClient) { 
    
    // this.getQuiz();
  }
  // public getQuiz(){
  //   const url = 'http://localhost:5000/quiz';
  //   return this.http.get(url);
  // }

  ngOnInit() {
    this.http.get('http://localhost:5000/quiz').
    subscribe((data)=>{      
      this.quizs = data;
      console.log(this.quizs);
    });
  }

}
