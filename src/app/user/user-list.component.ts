import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  form: any = {
    list: [],
    searchParams: {},
    pageNo: 0,
    message: '',
    deleteParams: [],
    preload: []
  }

  constructor(private httpService: HttpServiceService, public router: Router) {
  }

  previous() {
    this.form.pageNo--;
    this.search();
  }

  next() {
    this.form.pageNo++;
    this.search();
  }
  ngOnInit(): void {
    this.search();
    this.preload();

  }

  delete() {
    var self = this
    this.httpService.get('http://localhost:8080/UserCtl/delete/' + this.form.deleteParams, function (res: any) {
      if (res.success) {
        self.form.message = res.result.message;
      }
    })
  }

  search() {
    var self = this
    this.httpService.post('http://localhost:8080/UserCtl/search/' + this.form.pageNo,
      this.form.searchParams, function (res: any) {
        console.log("res ==> ", res);
        self.form.list = res.result.data;
      })
  }

  preload() {
    var self = this
    this.httpService.get('http://localhost:8080/UserCtl/preload', function (res: any) {

      console.log(res)
      self.form.preload = res.result.roleList
    })
  }

}

