import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public httpService :  HttpServiceService){}

  endpoint : String = 'http://localhost:8080/UserCtl/save'

  form : any ={

    data : {},
    inputerror : {},
    message : '',
    perload : [],
    searchParam : []
    
  }

  ngOnInit(): void {
    this.preload()
    
  }

  preload(){
    var self  = this
    this.httpService.get('http://localhost:8080/UserCtl/preload', function(res : any){
      console.log(res)
      self.form.preload = res.result.roleList
    })
  }

  save(){
    var self = this

    this.httpService.post('http://localhost:8080/UserCtl/save', this.form.data, function(res : any){
      console.log('Save Upi ==> ',  res.result.message)
      console.log('message -->', res.inputerror)

      self.form.message = '';
      self.form.inputerror = {};

      if(res.result.message){
        self.form.message = res.result.message;
      }

      if(!res.sucess){
        self.form.inputerror = res.result.inputerror;
      }

      if(res.sucess){
        self.form.data.id = res.result.data;
            }
    })

  }

}
