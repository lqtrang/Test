import {Injectable} from '@angular/core'
import {Router, CanActivate} from '@angular/router'
import {AuthenticationService} from './authentication.service'

@Injectable()
export class AuthGuardService implements CanActivate{
    constructor(private auth: AuthenticationService, private route:Router){}
    canActivate(){
        if(!this.auth.isLoggedIn()){
            this.route.navigateByUrl('/login')
            return false
        }
        return true
    }
}