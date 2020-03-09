import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LocalStorageService } from './../../../../core/services/local-storage.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from '../../../../core/services/sidebar.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  @Input() public visibility: string;
  @Output() public changeVisibility = new EventEmitter<string>();
  public toggleSidebar = 'show';
  menus = [];
  username;


  constructor(
    public sidebarservice: SidebarService,
    private authService: AuthService,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private lsService: LocalStorageService,
    private router: Router) {
    this.menus = sidebarservice.getMenuList();

  }

  ngOnInit() {
    this.username = this.lsService.getValue('username')
  }

  toggle(currentMenu: any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu: any) {
    return (currentMenu.active) ? 'down' : 'up';
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }

  toggled() {
    switch (this.visibility) {
      case 'none':
        this.visibility = 'show';
        this.changeVisibility.emit(this.visibility);
        break;
      case 'show':
        this.visibility = 'none';
        this.changeVisibility.emit(this.visibility);
        break;
      default:
        this.visibility = 'show';
        this.changeVisibility.emit(this.visibility);
        break;
    }
  }


  logout() {
    this.ngxService.start();
    this.authService.logout().subscribe(
      (data) => {
        this.lsService.clearStorage();
        this.toastr.success('Hasta Luego', 'Hemos Cerrado tu sesion satisfactoriamente');
        this.ngxService.stop();
        this.router.navigate(['/auth/login']);
      },
      err => {
        if (err.name === 'TokenExpiredError') {
          this.lsService.clearStorage();
          this.toastr.success('Hasta Luego', 'Hemos Cerrado tu sesion satisfactoriamente');
          this.ngxService.stop();
          this.router.navigate(['/auth/login']);
        } else {
          console.log(err);
        }
      }
    );
  }

}
