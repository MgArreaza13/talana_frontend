import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  public toggled = false;
  // tslint:disable-next-line:variable-name
  public _hasBackgroundImage = true;
  public menus = [{
    title: 'Menú',
    type: 'header'
  }, {
    title: 'Inicio',
    icon: 'fab fa-buffer',
    active: false,
    type: 'simple',

  },];


  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
