import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  public toggleSidebar = 'show';

  detectChange($event: any) {
    this.toggleSidebar = $event;
  }

  toggle() {
    switch (this.toggleSidebar) {
      case 'none': this.toggleSidebar = 'show'; break;
      case 'show': this.toggleSidebar = 'none'; break;
      default: this.toggleSidebar = 'show'; break;
    }
  }
}
