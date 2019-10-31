import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
// import 'rxjs/Rx';
// import 'rxjs/Rx';
@Injectable()
@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.css']
})
export class HompageComponent implements OnInit {
  quizs_dongvat:any = {};
  quizs_toanhoc:any = {};
  quizs_tieuhoc:any = {};
  quizs_hoahoc:any = {};
  quizs_kienthucchung:any = {};

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit() {
    this.http.get('http://localhost:5000/quizbyid/5db93ca27c213e208d1b414b').
    subscribe((data_dongvat)=>{      
      this.quizs_dongvat = data_dongvat;
      console.log(this.quizs_dongvat);
    });
    this.http.get('http://localhost:5000/quizbyid/5db93bd47c213e208d1b4107').
    subscribe((data_toanhoc)=>{      
      this.quizs_toanhoc = data_toanhoc;
      console.log(this.quizs_toanhoc);
    });
    this.http.get('http://localhost:5000/quizbyid/5db93c777c213e208d1b4133').
    subscribe((data_hoahoc)=>{      
      this.quizs_hoahoc = data_hoahoc;
      console.log(this.quizs_hoahoc);
    });
    this.http.get('http://localhost:5000/quizbyid/5db93c887c213e208d1b413a').
    subscribe((data_tieuhoc)=>{      
      this.quizs_tieuhoc = data_tieuhoc;
      console.log(this.quizs_tieuhoc);
    });
    this.http.get('http://localhost:5000/quizbyid/5db93c997c213e208d1b4145').
    subscribe((data_chung)=>{      
      this.quizs_kienthucchung = data_chung;
      console.log(this.quizs_kienthucchung);
    });
  }

}
