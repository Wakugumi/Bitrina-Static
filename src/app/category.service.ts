import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Database, ref, get, onValue, query, orderByChild, equalTo } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http : HttpClient, 
    private db : Database
  ) { }

  Ref = ref(this.db, "category/")

  /**
   * Listing all category keys
   * @return {Array}
   */
  listCategory() {

    var data:any[] = [];

    onValue( this.Ref, (snapshot) => {

      for ( let x of Object.entries(snapshot.val()) ) {
        data.push(x)
      }

    }, (error) => { throw error; console.error(error) } );
    
    return data;

  }


  /**
   * Get all categories data
   * @return {Object}
   */
  getAll() {
    var data:any[] = [];

    onValue(this.Ref, (snapshot) => {

      for ( let x of Object.values(snapshot.val()) ) {
        data.push(x);
      }

    }, (error) => { throw error; console.error(error)})

    return data;
  }

  get(key:string, value:string) {
    var data:any = [];

    onValue(query(this.Ref, orderByChild(key), equalTo(value)), (snapshot) => {
      for (let x of Object.values(snapshot.val())){
        data.push(x)
      }
    })
    console.log(data)
    return data;
  }
}
