import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contents:any = [];

  constructor(private dataService : ProviderService) { }

  ngOnInit(): void {
    this.dataService.fetchData().subscribe( (data: any) =>
    { for( var i in data ){
        this.contents.push(data[i])
      }
    });
  }
}
