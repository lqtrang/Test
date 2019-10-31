import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { HompageComponent } from './hompage/hompage.component';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'game/:id',component:GameComponent },
  {path:'',component:HompageComponent },
  {path:'homepage',component:HompageComponent },
  {path:'user',component:UserComponent },
  {path:'search/:title',component:SearchComponent },
  {path:'makeQuiz',component:TestComponent ,canActivate:[AuthGuardService]},
  {path:'profile',component:ProfileComponent , canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
