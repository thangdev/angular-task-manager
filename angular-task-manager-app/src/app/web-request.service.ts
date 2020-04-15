import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  ApiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get(`${this.ApiUrl}/${endpoint}`)
  }

  post(endpoint: string, payload: Object) {
    return this.http.post(`${this.ApiUrl}/${endpoint}`, payload);
  }

  put(endpoint: string, payload: Object) {
    return this.http.put(`${this.ApiUrl}/${endpoint}`, payload);
  }

  delete(endpoint: string) {
    return this.http.delete(`${this.ApiUrl}/${endpoint}`);
  }

}
