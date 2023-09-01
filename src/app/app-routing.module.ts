import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { CoursecategoryComponent } from './coursecategory/coursecategory.component';
import { CoursesComponent } from './courses/courses.component';
import { loggedOutGuard } from './logged-out.guard';


const routes: Routes = [
  {path:'signup', component:SignupComponent, canActivate: [loggedOutGuard]},
  {path:'login', component:LoginComponent, canActivate: [loggedOutGuard]},
  {path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  {path:'coursecategory', component:CoursecategoryComponent},
  { path: 'courses/:category', component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
