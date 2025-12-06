import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(public httpClint: HttpClient) { }

  post(endpoint: any, bean: any, callback: any) {
    this.httpClint.post(endpoint, bean).subscribe((response) => {
      callback(response);
    });
  }
  get(endpoint: any, callback: any) {
    this.httpClint.get(endpoint).subscribe((response) => {
      callback(response)

    });
  }
}