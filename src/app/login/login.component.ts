import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: any;

  constructor(
    private route: ActivatedRoute,
    private loginService: ApiService,
    private router: Router
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.message = params['message'];
    });
  }

  Login(a:any){
    this.loginService.submitLogin(a).subscribe( response => {
      console.log('inside Login response')
      console.log(response)
      const a: any = response
      if ( a.message == 'success'){
        localStorage.setItem('access_token', a.access);
        localStorage.setItem('refresh_token', a.refresh);
        
        this.router.navigate(['/dashboard'])
      }
      else {
        alert('Inavalid credentials')

      }
    })
  }
}
