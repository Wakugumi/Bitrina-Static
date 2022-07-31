import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ApiComponent } from './api/api.component';

const routes: Routes = [
  { path:"", component: HomeComponent },
  { path:"gallery/:id", component: GalleryComponent },
  { path:"admin/api/:type", component: ApiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
