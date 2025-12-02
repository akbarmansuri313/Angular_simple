import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  
  constructor(private httpService: HttpServiceService ) { }

  endpoint: string = 'http://localhost:8080/LoginCtl/signUp'


 form : any = {
  data:{},
  message : '',
  inputerror : {}

 }
 signUp(){

  var self = this

     console.log('firstName==> ', this.form.data.firstName)
    console.log('lastName===>', this.form.data.lastName)
    console.log('login===>', this.form.data.loginId)
    console.log('password===>', this.form.data.password)
    console.log('dob===>', this.form.data.dob)

      this.httpService.post(this.endpoint, this.form.data, function (res: any) {
      console.log('response from signUp api user===>', res.result.message)
      console.log('message ===>', res.result.inputerror)
      console.log('ID ==>', res.result.data)
      console.log('Status ==>', res.sucess)

        if(res.result.message){
          self.form.message = res.result.message;
        }

      if(res.result.inputerror){
        self.form.inputerror = res.result.inputerror;
      }

    })
 }
}
