import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-module.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from '@iplab/ngx-file-upload';

// COMPONENTS
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    FileUploadModule
    
  ]
})
export class TodoModuleModule { }
