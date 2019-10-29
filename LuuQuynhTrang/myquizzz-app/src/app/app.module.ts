import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HompageComponent } from './hompage/hompage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { from } from 'rxjs';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/search.component';
import { TestComponent } from './test/test.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HompageComponent,
    LoginComponent,
    RegisterComponent,
    GameComponent,
    UserComponent,
    SearchComponent,
    TestComponent,
    ProfileComponent,
    
    // AuthenticationService
  ],
  providers: [ AuthenticationService,  AuthGuardService],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
