import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: UserDetails
  quizUser
  constructor(private auth: AuthenticationService,private http: HttpClient) { }

  ngOnInit() {
    this.auth.profile().subscribe(
      
      user => {
        this.details = user
        this.http.get('http://localhost:5000/quizbyuser/'+this.details._id).
        subscribe((data)=>{      
          this.quizUser = data;
          console.log(this.quizUser);
        });

      },
      err => {
        console.error(err)
      }
      
    )
    // console.log(this.quizUser)
    
  }

}
