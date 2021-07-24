import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  public isSidenavOpen: boolean = true;
  private sidenavStatus = new Subject<boolean>();

  constructor() { }

  public changeSidenav(sidenavStatus: boolean){
    this.isSidenavOpen = sidenavStatus;
    this.sidenavStatus.next(this.isSidenavOpen);
  }

  public toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.sidenavStatus.next(this.isSidenavOpen);
  }

  public getSidenavStatus() {
    return this.sidenavStatus.asObservable();
  }


}
