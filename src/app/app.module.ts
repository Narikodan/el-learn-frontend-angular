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
import { MatIconModule } from '@angular/material/icon';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { UpdateSectionComponent } from './update-section/update-section.component';
import { UpdateVideoComponent } from './update-video/update-video.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchComponent } from './search/search.component';
import { EnrolledCoursesComponent } from './enrolled-courses/enrolled-courses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationsModule } from './animations/animations.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';


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
    UpdateCourseComponent,
    UpdateSectionComponent,
    UpdateVideoComponent,
    ConfirmationDialogComponent,
    SearchComponent,
    EnrolledCoursesComponent,
    PasswordResetComponent,
  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AnimationsModule,
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
