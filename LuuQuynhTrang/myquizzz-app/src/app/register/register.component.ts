import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormGroup, FormControl, Validators,AbstractControl} from '@angular/forms';
import {AuthenticationService, TokenPayload} from '../authentication.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form;
  credentials: TokenPayload = {
    _id: '',
    name: '',
    email: '',
    password: ''
  }
  
  constructor(private auth: AuthenticationService, private router: Router) { }
  
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      confirm:new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ]))
    },{
      validators:comparePassword
    });
  }
  register() {
    console.log("aaa");
    this.auth.register(this.credentials).subscribe(
      ()=>{
        this.router.navigateByUrl('/')
      },
      err=>{
        console.error(err)
      }
    )
  }
  

}
export function comparePassword(c: AbstractControl) {
  const v = c.value;
    return (v.password === v.confirm) ? null : {
      passwordnotmatch: true
    };
}
