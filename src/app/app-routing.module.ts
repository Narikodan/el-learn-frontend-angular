import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { CoursecategoryComponent } from './coursecategory/coursecategory.component';
import { CoursesComponent } from './courses/courses.component';
import { loggedOutGuard } from './logged-out.guard';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { SectionAddComponent } from './section-add/section-add.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { UpdateSectionComponent } from './update-section/update-section.component';
import { UpdateVideoComponent } from './update-video/update-video.component';
import { SearchComponent } from './search/search.component';
import { EnrolledCoursesComponent } from './enrolled-courses/enrolled-courses.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent, canActivate: [loggedOutGuard]  },
  {path:'signup', component:SignupComponent, canActivate: [loggedOutGuard]},
  {path:'login', component:LoginComponent, canActivate: [loggedOutGuard]},
  {path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  {path:'coursecategory', component:CoursecategoryComponent},
  {path:'courses/:category', component: CoursesComponent, canActivate: [AuthGuard] },
  {path: 'course-details', component: CourseDetailsComponent, canActivate: [AuthGuard]  },
  {path: 'create-course', component: CreateCourseComponent, canActivate: [AuthGuard]  },
  {path: 'add-section', component: SectionAddComponent, canActivate: [AuthGuard]  },
  {path: 'add-video', component: AddVideoComponent, canActivate: [AuthGuard] },
  {path: 'account', component: UserAccountComponent },
  {path: 'user-courses', component: UserCoursesComponent },
  {path: 'manage-courses', component: ManageCoursesComponent, canActivate: [AuthGuard] },
  {path: 'update-course', component: UpdateCourseComponent, canActivate: [AuthGuard] },
  {path: 'update-section', component: UpdateSectionComponent, canActivate: [AuthGuard] },
  {path: 'update-video', component: UpdateVideoComponent, canActivate: [AuthGuard] },
  {path: 'search', component: SearchComponent },
  {path: 'enrolled-courses', component: EnrolledCoursesComponent },
  {path: 'reset-password', component: PasswordResetComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
