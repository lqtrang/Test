import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service'
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: UserDetails
  quizUser:any = [];
  constructor(private auth: AuthenticationService,private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.auth.profile().subscribe(      
      user => {
        this.details = user
        this.rendQuiz()

      },
      err => {
        console.error(err)
      }      
    )    
  }
  rendQuiz(){
  
    this.http.get('http://localhost:5000/quizbyuser/'+this.details._id).
    subscribe((data)=>{      
      this.quizUser = data;
      console.log(this.quizUser);
    });
  }
  onDelete(index){
    // var id=(document.getElementById("id_quiz").textContent)
    console.log(index)
    var result = confirm("Bạn có muốn xóa?"); 
    if (result == true) { 
      // console.log(id)
      this.http.delete('http://localhost:5000/delete/quiz/'+index).subscribe(data => {

      });
     
    } else { 
      console.log("k xoas")
    } 
    this.rendQuiz();
  }
  onEdit(index){
    console.log(index);
    this.router.navigateByUrl('edit/quizz/'+index)
  }
}
