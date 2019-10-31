import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  valueS

  constructor(public auth: AuthenticationService,private router: Router) { 
    
  }

  ngOnInit() {    
    
  }
  onSearch(){
    this.valueS = (<HTMLInputElement>document.getElementById('titleSearch')).value
    this.router.navigateByUrl('/search/'+this.valueS)
  }

}
