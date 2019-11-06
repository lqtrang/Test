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
declare var webkitSpeechRecognition: any;
declare var webkitSpeechGrammarList: any;



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
    quizs_game:any = [];
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
        var element = document.getElementById("title_quiz");
        element.innerHTML = this.quizs_game.title;
        var element = document.getElementById("num_of_quiz");
        element.innerHTML = "Số câu hỏi: " + this.quizs_game.num_of_ques;
        renddata(this.quizs_game, this.index);   
        
    });
    function renddata(data, index){
        var element = document.getElementById('confirm');
                element.innerHTML = "";
        var color=["#2F6DAE","#66CCC6","#D4546A", "#3A1F3C",]
        for(var i = 0; i < 4; i++){
            document.getElementById("btn"+i).style.backgroundColor  = color[i];
        }
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
            if(data.questions[index].key == data.questions[index].answers[i]){
                key = i;
            }        
            letpick(data, "btn" + i,index, key);
                  
        }
        compare(index, data, key);        
    }
    function letpick(data, id, index, key){
        var button = document.getElementById(id);
        button.onclick = function() {
            // console.log(key);
                      
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
    function compare(index, data, key) {
        var reg = new webkitSpeechRecognition() ||  new SpeechRecognition();
        var regList = new webkitSpeechGrammarList()|| new SpeechGrammar();
        var grammer = '#JSGF V1.0';
        regList.addFromString(grammer,1);
        reg.grammer = regList;
        reg.lang = 'vi';
        // reg.interimResults = true;
        reg.maxAlternatives = 10;
        reg.continuous = true;     
        reg.addEventListener('result', e=>{
            var transcript = Array.from(e.results).map(result=>result[0]).map(result=>result.transcript).join('');
            var temp = (transcript).length;
            // console.log(transcript[temp-1]);
            // var answer = compare(transcript, key);
            var temp = (transcript).length;
            var answer
            if(transcript[temp-1] == 'a' || transcript[temp-1] == 'A' ||transcript[temp-1] == 'b' || transcript[temp-1] == 'B' ||transcript[temp-1] == 'c' ||transcript[temp-1] == 'C' ||transcript[temp-1] == 'd' ||transcript[temp-1] == 'D'){
                answer = transcript[temp-1];
                var element = document.getElementById('confirm');
                element.innerHTML = "Bạn muốn chọn đáp án " + answer + "? Nói CÓ để xác nhận hoặc KHÔNG để chọn đáp án mới";
                confirm(index, data, key, answer)
                // return transcript[temp-1];
                
            }else{
                var max = 0;
                var key_temp =0;
                var str;                
                var text = transcript.toLowerCase();
                str = text.substring(9,text.length)
                for(var i = 0; i < 4; i++){
                    // console.log(data.questions[index].answers[i])
                    var dem = 0;
                    var ans_temp = data.questions[index].answers[i].toLowerCase();
                    for(var j = 1; j <= str.length; j++){
                        // console.log(data.questions[index].answers[i][index_temp])
                        var string = str.substring(0,j);
                        console.log(string)
                        if(ans_temp.indexOf(string) != -1){
                            dem = j;
                        }else{
                            break;
                        }
                        // console.log(str[j])
                        // if(str[j] == ans_temp[index_temp]){
                        //     dem++;
                        // }
                        // index_temp++;
                    }
                    if(dem >= max){
                        max = dem;
                        key_temp = i;
                    }
                    console.log("dem: " + dem);
                }
                console.log(text)
                console.log(str)                
                console.log("key: " + key_temp);
                if(key_temp == 0){
                    answer = "A";
                }else{
                    if(key_temp == 1){
                        answer = "B"
                    }else{
                        if(key_temp == 2){
                            answer = "C"
                        }else{
                            if(key_temp == 3){
                                answer = "D"
                            }
                        }
                    }
                }
                var element = document.getElementById('confirm');
                element.innerHTML = "Bạn muốn chọn đáp án " + answer + "? Nói CÓ để xác nhận hoặc KHÔNG để chọn đáp án mới";
                console.log(answer)
                confirm(index, data, key, answer)
            }
                    
            
        });      
        reg.start()  
        
    }
    function confirm(index, data, key, answer){
        var check = 0;
        // console.log(key)
        var reg = new webkitSpeechRecognition() ||  new SpeechRecognition();
        var regList = new webkitSpeechGrammarList()|| new SpeechGrammar();
        var grammer = '#JSGF V1.0';
        regList.addFromString(grammer,1);
        reg.grammer = regList;
        reg.lang = 'vi';
        // reg.interimResults = true;
        reg.maxAlternatives = 5;
        reg.continuous = true;          
        reg.addEventListener('result', e=>{
            var transcript = Array.from(e.results).map(result=>result[0]).map(result=>result.transcript).join('');
            var temp = (transcript).length;
            
            if(transcript == 'không'){
                compare(index, data, key)
                var element = document.getElementById('confirm');
                element.innerHTML = "";
            }
            if(transcript == 'có'){
                if((answer == 'a' || answer == 'A') && key==0){
                    check = 1;
                    
                }
                if((answer == 'b' || answer == 'B') && key==1){
                    check = 1;
                }
                if((answer == 'c' || answer == 'C') && key==2){
                    check = 1;
                }
                if((answer == 'd' || answer == 'D') && key==3){
                    check = 1;
                }
                document.getElementById("btn"+key).style.backgroundColor  = "red"; 
                
                if(check == 1){
                    getscore();
                }
                if((index+1) == data.questions.length){
                    reg.stop();
                    document.getElementById("quiz").style.display = 'none';
                    document.getElementById("result").style.display = 'block';                                
                    var element = document.getElementById("score_result");
                    element.innerHTML = (score) + "/" + data.questions.length;
                                
                }else{
                    renddata(data, index+1);
                }               
            }           
            // console.log(transcript)
            // console.log(check)        
        });
        // reg.addEventListener('end',reg.start);   
        reg.start()
    }
  }
}
