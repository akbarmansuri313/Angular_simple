import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {



  endpoint: String = 'http://localhost:8080/UserCtl/save'

  form: any = {
    data: {},
    inputerror: {},
    message: '',
    perload: [],

  }

  fileToUpload: any = null;

  constructor(public httpService: HttpServiceService, private httpClient: HttpClient) {
  }
  ngOnInit(): void {
    this.preload()
    

  }

  preload() {
    var self = this
    this.httpService.get('http://localhost:8080/UserCtl/preload', function (res: any) {
      console.log(res)
      self.form.preload = res.result.roleList
    })
  }


  onFileSelect(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log(this.fileToUpload);
    console.log('sdfghjkhbvc')
  }

  save() {
    var self = this

    this.httpService.post('http://localhost:8080/UserCtl/save', this.form.data, function (res: any) {
      console.log('Save Upi ==> ', res.result.message)
      console.log('message -->', res.inputerror)

      self.form.message = ''
      self.form.inputerror = {}

      if (res.result.message) {
        self.form.message = res.result.message;
      }

      if (!res.success) {
        self.form.inputerror = res.result.inputerror;
      }

      if (res.success) {
        self.form.data.id = res.result.data;
      }

    })

  }

  myFile() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    return this.httpClient.post("http://localhost:8080/UserCtl/profilePic/" + this.form.data.id, formData,)
      .subscribe((res: any) => {
        console.log(this.fileToUpload);
        console.log('file upload res =>', res);
      }, error => {
        console.log(error);
      });
  }

}
