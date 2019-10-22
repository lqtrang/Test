import { Component, OnInit } from '@angular/core';
// // import { url } from 'inspector';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import axios from "axios";
import { AxiosInstance } from "axios";
import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';
declare var $:any;


@Injectable()

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    // private routeSub: Subscription;
    // public score = 0;
    id: string;    
    public index = 0;
    quizs_game:any = {};
    public y:Int16Array;
    currentQuestion : any;
    // const axios = require('axios');

  constructor(private route: ActivatedRoute,private http: HttpClient) { 
    
  }
  
  ngOnInit() {
      var score = 0;
     
    document.getElementById("countdown").style.display = 'block';
    var button = document.getElementById("start");
    // document.getElementById("countdown").style.display = 'none';
    // document.getElementById("quiz").style.display = 'block';
    button.onclick = function() {
        document.getElementById("countdown").style.display = 'none';
        document.getElementById("quiz").style.display = 'block';
    }
    // playgame();
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get('http://localhost:5000/quiz/'+this.id).subscribe((data)=>{      
        this.quizs_game = data;
        renddata(this.quizs_game, this.index);   
        
    });
    function renddata(data, index){
        var element = document.getElementById("score");
        element.innerHTML = "   Số câu đúng: " + (score);
        var element = document.getElementById("progress");
        element.innerHTML = "Câu số: " + (index+1) +" / "+ data.questions.length;
        var element = document.getElementById("question");        
        element.innerHTML = data.questions[index].title;
        var key = 0;
        for(var i = 0; i < 4; i++){
            var element = document.getElementById("btn" + i);
            element.innerHTML = data.questions[index].answers[i];            
            letpick(data, "btn" + i,index);       
        }
    }
    function letpick(data, id, index){
        var button = document.getElementById(id);
        button.onclick = function() {
            var answer = document.getElementById(id).innerHTML        
            if(answer == data.questions[index].key){                
                getscore();                
            }
            if((index+1) == data.questions.length){
                document.getElementById("quiz").style.display = 'none';
                document.getElementById("result").style.display = 'block';
                
                var element = document.getElementById("score_result");
                element.innerHTML = (score) + "/" + data.questions.length;
            }else{
                renddata(data, index+1);
            }
            
        }
    }
    function getscore(){
        score++;        
        // console.log(score);
    }
  }
}
