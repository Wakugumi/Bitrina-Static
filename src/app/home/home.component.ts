import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProviderService } from '../provider.service'
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contents:any = [];
  constructor(private dataService : ProviderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.dataService.fetchData().subscribe( (data: any) =>
    { for( var i in data ){
        this.contents.push(data[i])
      }
    });
  }

  goToProduct(product:Product) {
  }
}
