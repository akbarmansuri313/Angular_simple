import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  endpoint : string ='http://localhost:8080/LoginCtl/login'

  form: any = {
    data: {},
    inputError: {}
  }

  constructor(public router: Router, public httpService: HttpServiceService) {

  }



  signIn() {

    var self = this

  //   if (this.form.data.login == 'admin' && this.form.data.password == 'admin') {
  //     this.router.navigateByUrl('welcome')
  //   } else {
  //     this.form.inputError = 'Login id And PAssword must be same.'
  //     this.router.navigateByUrl('login')
  // }


  this.httpService.post(this.endpoint, this.form.data, function(res: any){

    console.log("Data ==>", res.result.data);
    console.log("message ==>", res.result.message);
    console.log("success ==>", res.success);
    console.log("inputerror ==>", res.result.inputerror);

    if(res.success){
      self.router.navigateByUrl('welcome')
    }

    if(!res.success && res.result.message){
    self.form.message = res.result.message  

    }

    if(res.result.inputerror){
      self.form.inputerror = res.result.inputerror
    }

    if(res.success){
        localStorage.setItem('firstName', res.result.data.firstName);
        localStorage.setItem('roleName', res.result.data.roleName);
        localStorage.setItem('id', res.result.data.id);
        self.router.navigateByUrl('welcome');
      }
      
    

  })



  }
}
  

