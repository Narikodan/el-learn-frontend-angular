import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursecategoryComponent } from './coursecategory/coursecategory.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { SafePipe } from './safe.pipe';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CardComponent } from './card/card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { SectionAddComponent } from './section-add/section-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddVideoComponent } from './add-video/add-video.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { TokenInterceptor } from './token-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    CoursecategoryComponent,
    CoursesComponent,
    CourseDetailsComponent,
    SafePipe,
    VideoPlayerComponent,
    CardComponent,
    NavbarComponent,
    FooterComponent,
    LandingPageComponent,
    CreateCourseComponent,
    SectionAddComponent,
    AddVideoComponent,
    UserAccountComponent,
    UserCoursesComponent,
    ManageCoursesComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
