import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service'
import { CategoryService } from '../category.service'
import { Product } from '../product';
import data from '../../assets/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contents = data;
  categories:any[] = [];
  constructor(private dataService : CategoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  
    this.categories = this.dataService.getAll();
    console.log(this.categories)
  }

  goToProduct(index:any) {
  }
}
