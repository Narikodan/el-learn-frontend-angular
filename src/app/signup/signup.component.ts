import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor (
    private apiService: ApiService,
    private router: Router
  ){}
  

  saveRegistration(a:any) {
    // console.log(a.value)
    a.email = a.email.toLowerCase();
    this.apiService.submitRegistration(a).subscribe(response => {
      // console.log('inside response')
      // console.log(response)
      const a: any = response
      if ( a.message == 'success'){
        
        this.router.navigate(['/login'], {queryParams: {message: 'Account created successfully! Please Login to continue'}})
      }
      else {
        alert('Email already taken')

      }
      
      
    },);
  }

}


