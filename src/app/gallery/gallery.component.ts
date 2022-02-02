import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {



  constructor(private route: ActivatedRoute, private router: Router, private currentId : Number) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.currentId = params["title"];
      console.log(this.currentId)
    })
  }

  goToProduct(id: any) {
  }

}
