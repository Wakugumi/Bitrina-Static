import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Database, ref, get, onValue, child, query, orderByChild, equalTo } from '@angular/fire/database'


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient, private db : Database) {

  }

  DBRef = ref(this.db, "product/")



  /**
   * Listing all product titles only
   * @return {Array} as String, returns all Products titles
   */
  listProduct() {
    var data:any[] = [];

    onValue(this.DBRef, (snapshot) => {
      
      for ( let x of Object.entries(snapshot.val()) ) {
        data.push(x)
      }

    }, (error) => { throw error; console.error(error) })
    return data;
  }

  /**
   * Get all products data
   * @return {Object} returns all product's data as Object
   */
  getAll() {
    var data:any[] = [];

    onValue( this.DBRef, (snapshot) => {

      for ( let x of Object.values(snapshot.val()) ) {
        data.push(x);
      }
    }, (error) => { throw error; console.error(error) } )
    
    return data;
  }

  /**
   * Get data with queries
   * @return {Object} returns data filtered with specified query
   */
  get(id: string) {
    var reference = ref(this.db, "product/");
    var queries = query(reference, orderByChild("parentId"), equalTo(id))
    var data:any[] = [];

    onValue(queries, (snapshot) => {
      for( let x of Object.values(snapshot.val())) {
        data.push(x)
      }
    }, (error) => { throw error })

    return data;
  }

}
