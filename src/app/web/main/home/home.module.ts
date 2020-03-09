import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing'

// Components
import { IndexComponent } from './index/index.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    IndexComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
