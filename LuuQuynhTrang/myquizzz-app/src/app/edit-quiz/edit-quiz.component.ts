import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {
  quizs_game:any = [];
  quiz_tag:any = [];
  index = 0; 
  quiz={
    title:null,
    num_of_ques:null,
    postby:null,
    tags:[],
    questions:[],    
  } 
  constructor(private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      var id= this.route.snapshot.paramMap.get('_id')
      this.http.get('http://localhost:5000/tag').
      subscribe((tags)=>{      
        this.quiz_tag = tags;
        // console.log(this.quiz_tag);
      });  
      this.http.get('http://localhost:5000/quiz/'+id).subscribe((data)=>{      
        this.quizs_game = data;
        // console.log(this.quizs_game.tags);
        var inputElements = document.getElementsByClassName('hashtag');
        
          for(var i=0; inputElements[i]; ++i){
            for(var j = 0; j < this.quizs_game.tags.length; j++){
              if((<HTMLInputElement>inputElements[i]).value == this.quizs_game.tags[j]){
                  // console.log((<HTMLInputElement>inputElements[i]).value);
                  (<HTMLInputElement>inputElements[i]).checked = true;
              }         
  
            }
          }
        
        
        
      });
     

    })   
    
  }
  letStart(){  
      var inputElements = document.getElementsByClassName('hashtag');
      for(var i=0; inputElements[i]; ++i){
        if((<HTMLInputElement>inputElements[i]).checked){
          this.quiz.tags.push((<HTMLInputElement>inputElements[i]).value);
  
        }
      }
      
      this.quiz.title = (<HTMLInputElement>document.getElementById('title-quiz')).value;
      this.quiz.num_of_ques = this.quizs_game.num_of_ques;
      this.quiz.postby = this.quizs_game.postby;
      // console.log(this.quiz);
      document.getElementById("start").style.display = 'none';
      document.getElementById("question").style.display = 'block';
      this.rendata();
      
    // this.restart();
  }
  restart(){
    this.savedata();
    console.log(this.quiz);
    (<HTMLInputElement>document.getElementById('exampleRadios1')).checked = false;
      (<HTMLInputElement>document.getElementById('exampleRadios2')).checked = false;
      (<HTMLInputElement>document.getElementById('exampleRadios3')).checked = false;
      (<HTMLInputElement>document.getElementById('exampleRadios4')).checked = false;
    // console.log(this.quiz.title) 
    // console.log(this.index);
   
    if(this.index+1 == this.quiz.num_of_ques){
      
      document.getElementById("question").style.display = 'none';
      document.getElementById("end").style.display = 'block';
      var id= this.route.snapshot.paramMap.get('_id')
      this.http.put('http://localhost:5000/edit/quizz/'+id,this.quiz)
    .subscribe(
        (val) => {
            console.log("PUT call successful value returned in body", 
                        val);
        },
        response => {
            console.log("PUT call in error", response);
        },
        () => {
            console.log("The PUT observable is now completed.");
        });
     
    }else{
      this.index++;
      // console.log(this.quizs_game);
      this.rendata();
      // (<HTMLInputElement>document.getElementById('title-ques')).value = "Johnny Bravo"; 
      // (<HTMLInputElement>document.getElementById('ans1')).value = "";
      // (<HTMLInputElement>document.getElementById('ans2')).value = "";
      // (<HTMLInputElement>document.getElementById('ans3')).value = "";
      // (<HTMLInputElement>document.getElementById('ans4')).value = "";
      
     
    }
   
    
  }
  rendata(){
    (<HTMLInputElement>document.getElementById('ans1')).value = this.quizs_game.questions[this.index].answers[0];
    (<HTMLInputElement>document.getElementById('ans2')).value = this.quizs_game.questions[this.index].answers[1];
    (<HTMLInputElement>document.getElementById('ans3')).value = this.quizs_game.questions[this.index].answers[2];
    (<HTMLInputElement>document.getElementById('ans4')).value = this.quizs_game.questions[this.index].answers[3];
    
    for(var i = 0; i < 4; i++){
      if((<HTMLInputElement>document.getElementById('ans'+(i+1))).value == this.quizs_game.questions[this.index].key){
        (<HTMLInputElement>document.getElementById('exampleRadios'+(i+1))).checked = true;
        console.log(i)
        
      }
    } 
  }
  savedata(){
    let questions={
      title:null,
      answers:[],
      key:null
    }
    questions.title = (<HTMLInputElement>document.getElementById('title-ques')).value;
    for(var i = 0; i < 4; i++){
      questions.answers[i] = (<HTMLInputElement>document.getElementById('ans'+(i+1))).value;
    }
    for(var i = 0; i < 4; i++){
      if((<HTMLInputElement>document.getElementById('exampleRadios'+(i+1))).checked){
        questions.key = questions.answers[i];        
      }
      
    }
    this.quiz.questions.push(questions);
    // console.log(this.quiz.questions);
    // console.log(this.quiz);
    
  }

}
