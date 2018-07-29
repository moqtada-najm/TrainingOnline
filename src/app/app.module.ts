import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SingupComponent } from './singup/singup.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginComponent } from './login/login.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ProfileComponent } from './profile/profile.component';
import { LessonsComponent } from './lessons/lessons.component';
import { MoreinfoComponent } from './moreinfo/moreinfo.component';
import { ReversePipe } from './lessons/reverse.pipe';



const routes:Routes = [
  {path:'', redirectTo:'home' , pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'singup', component:SingupComponent},
  {path:'login', component:LoginComponent},
  {path:'profile', component:ProfileComponent},
  {path:'lessons', component:LessonsComponent},
  {path:'moreinfo/:id', component:MoreinfoComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SingupComponent,
    LoginComponent,
    ProfileComponent,
    LessonsComponent,
    MoreinfoComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,    
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
