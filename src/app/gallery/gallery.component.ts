import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Database, ref, get, onValue, child, orderByChild, orderByValue, equalTo, query, QueryConstraint } from '@angular/fire/database'
import { ProductService } from '../product.service'
import { orderByKey } from 'firebase/database';
import { async } from '@firebase/util';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  contents: any = []
  category: any = {}
  currentId = this.route.snapshot.params["id"]

  constructor(private route: ActivatedRoute, private router: Router, private db : Database, private Product : ProductService, private Category : CategoryService) { }

  ngOnInit(): void {

    this.contents = this.Product.get(this.currentId)
    this.category = this.Category.get("id", this.currentId)

    console.log(this.category)

  }


  goToProduct(id: any) {
  }

}
