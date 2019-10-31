import { Component, OnInit } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { HttpClient } from '@angular/common/http';


@Injectable()


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  valueS
  quizz:any
  datasearch : string[] = [];
  constructor(private route: ActivatedRoute,private http: HttpClient) { 
    
  }
  ngOnInit() {
    
    document.getElementById("dflex").style.display = 'none';
    this.valueS = this.route.snapshot.paramMap.get('title');
    console.log(this.valueS)
    this.http.get('http://localhost:5000/quiz').
    subscribe((data)=>{      
      this.quizz = data;
      console.log(this.quizz);
      
      for(var i = 0; i < this.quizz.length; i++){
        var check = (this.quizz[i].title.toLowerCase()).indexOf(this.valueS.toLowerCase());
        if(check != -1){
          this.datasearch.push(this.quizz[i])
          console.log(this.datasearch)
        }
        
        
      }
      
    });
  }
   

}

