import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ProviderService {


  data:any;

  constructor(private http : HttpClient) { }

  fetchData() {
    return this.http.get<Object>("assets/data.json")

  }



}
