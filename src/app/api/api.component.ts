import { Component, ComponentFactoryResolver, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as Firebase from '@angular/fire/database';
import { FirebaseStorage, ref, uploadBytes, UploadTask, getStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from '../category';
import { Product } from '../product';
import { StorageService } from '../storage.service';
import { getDownloadURL } from 'firebase/storage';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {


  Product = Firebase.ref(this.db, "product/")
  Category = Firebase.ref(this.db, "category/")

  rawData = {};

  Categories:any[] = [];
  ListOfCategory:any[] = [];

  Products:any[] = [];
  ListOfProduct:any[] = [];

  selectedFiles: Array<File> = []

  //Forms
  model_category = new Category("Id", "Title", "Description", "Url")
  model_product = new Product("Id", "Title", "Description", "Parent Id", "Url")
  


  constructor(private db: Firebase.Database,
    private route: ActivatedRoute,
    private router: Router) {
  }
  
  ngOnInit(): void {
    
    switch (this.route.snapshot.params['type']) {
      case "categories": 
        this.listCategory();
        this.selectedFiles = [];
        document.getElementById("Categories")?.removeAttribute("hidden");
        document.getElementById("nav-1")?.classList.add('active')
        document.getElementById("nav-2")?.classList.remove('active')
        break;

      case "products":
        this.listProduct();
        this.getCategories();
        this.selectedFiles = [];
        document.getElementById("Products")?.removeAttribute("hidden");
        document.getElementById("nav-2")?.classList.add('active')
        document.getElementById("nav-1")?.classList.remove('active')
        break;

      default:
        document.getElementById("Error")?.removeAttribute("hidden");
        break;
    }

  }

  onImageChange = (e:any, type:string) : void => {
    this.selectedFiles = e.target.files
  }

  listCategory() {
    Firebase.onValue(this.Category, (snapshot) => {
      var x = []
      for ( let [key] of Object.entries(snapshot.val()) ){
        x.push(key)
      }
      this.Categories = x;
      /*
      Object.values(x).forEach(val => {
        this.Categories.push(val)
      })
      */
      this.model_category.id = this.model_category.generateId(this.Categories);

      this.rawData = snapshot.val();

    }, (error) => console.error(error))
  }

  getCategories() {
    Firebase.onValue(this.Category, (snapshot) => {
      var x = [];
      
      for ( let y of Object.values(snapshot.val())) {
        x.push(y);
      }

      this.Categories = x;
      console.log(this.Categories);
    }, (error) => console.error(error));
  }

  addCategory(e:any) {
    let id = this.model_category.generateId(this.Categories);
    const file = this.selectedFiles[0]
    const filePath = "image/category/" + file.name;
    const reference = ref(getStorage(), filePath);
    const Task = uploadBytes(reference, file)
    Task.then((value) => {
      console.log(file)
      console.log(value);
    }, (error) => {
      throw error;
    })
    getDownloadURL(reference).then((downloadUrl) => {
      this.model_category.id = id;
      this.model_category.imgUrl = downloadUrl;
      Firebase.set(Firebase.child(this.Category, this.model_category.title), this.model_category);
      this.model_category.id = this.model_category.generateId(this.Categories);
    })


    
  }

  deleteCategory(id:string) {
    console.log("Deleting " + id)
    Firebase.remove(Firebase.child(this.Category, id));
  }

  listProduct() {
    Firebase.onValue(this.Product, (snapshot) => {
      var x = [];
      for ( let [key] of Object.entries(snapshot.val()) ) {
        x.push(key);
      }
      this.Products = x;
      this.model_product.id = this.model_product.generateId();
      this.rawData = snapshot.val();
    }, (error) => console.error(error))
  }

  addProduct() {
    this.model_product.id = this.model_product.generateId();
    const file = this.selectedFiles[0];
    const filePath = "image/product/" + file.name;
    const reference = ref(getStorage(), filePath)
    const Task = uploadBytes(reference, file);
    Task.then((value) => {
      getDownloadURL(reference).then((url) => {
        this.model_product.imgUrl = url;
        Firebase.set(Firebase.child(this.Product, this.model_product.title), this.model_product)
      this.model_product.id = this.model_product.generateId();
      })
    }, (error) => { throw error; })

    
  }

  deleteProduct(id:string) {
    Firebase.remove(Firebase.child(this.Product, id));
  }


}
