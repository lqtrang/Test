import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  quiz_tag:any = {};
  details: UserDetails
  index = 0; 
  
  quiz={
    title:null,
    num_of_ques:null,
    postby:null,
    tags:[],
    questions:[],
    
  }  
  constructor(private auth: AuthenticationService, private http:HttpClient) { }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
        console.log(this.details)
    this.quiz.postby = this.details._id
      },
      err => {
        console.error(err)
      }
      
    )
    this.http.get('http://localhost:5000/tag').
    subscribe((tags)=>{      
      this.quiz_tag = tags;
      console.log(this.quiz_tag);
    });    
    
  }
  letStart(){
    

    var inputElements = document.getElementsByClassName('hashtag');
    for(var i=0; inputElements[i]; ++i){
      if((<HTMLInputElement>inputElements[i]).checked){
        this.quiz.tags.push((<HTMLInputElement>inputElements[i]).value);

      }
    }
    // this.quiz.tags.push((<HTMLInputElement>document.querySelector('.hashtag:checked')).value);
      
    

    console.log(this.quiz);
    document.getElementById("start").style.display = 'none';
    document.getElementById("question").style.display = 'block';
    // this.restart();
  }
  restart(){
    
    this.savedata();
    
    if(this.index+1 == this.quiz.num_of_ques){
      document.getElementById("question").style.display = 'none';
      document.getElementById("end").style.display = 'block';
      this.http.post('http://localhost:5000/makequiz/',this.quiz)
    .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
     
    }else{
      (<HTMLInputElement>document.getElementById('title-ques')).value = "";
      (<HTMLInputElement>document.getElementById('ans1')).value = "";
      (<HTMLInputElement>document.getElementById('ans2')).value = "";
      (<HTMLInputElement>document.getElementById('ans3')).value = "";
      (<HTMLInputElement>document.getElementById('ans4')).value = "";
      (<HTMLInputElement>document.getElementById('exampleRadios1')).checked = false;
      (<HTMLInputElement>document.getElementById('exampleRadios2')).checked = false;
      (<HTMLInputElement>document.getElementById('exampleRadios3')).checked = false;
      (<HTMLInputElement>document.getElementById('exampleRadios4')).checked = false;
    }
    this.index++;
    
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
    console.log(this.quiz.questions);
    console.log(this.quiz);
    
  }

}
