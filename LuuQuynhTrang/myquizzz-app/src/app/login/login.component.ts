import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService, TokenPayload} from '../authentication.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;
  credentials: TokenPayload={
    _id: '',
    name: '',
    email: '',
    password:''
  }
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    })
    
  }
  login() {
    
      this.auth.login(this.credentials).subscribe(
        ()=>{
          this.router.navigateByUrl('/profile')
        },
        err=>{
          
          console.error(err)
        }
      )
    
    
    // console.log( this.auth.login(this.credentials));
      
    
    
  }

}
