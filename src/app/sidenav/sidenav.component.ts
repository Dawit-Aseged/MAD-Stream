import { element } from 'protractor';
import { CommunicationService } from '../service/communication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  public sidenavSub: Subscription;
  public isSidenavOpen: boolean;
  private isMobile!: boolean;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);


  constructor(private breakpointObserver: BreakpointObserver, public commService: CommunicationService) {
    this.isSidenavOpen = this.commService.isSidenavOpen;

    this.isHandset
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
    })
    this.sidenavSub = this.commService.getSidenavStatus()
      .subscribe((sidenavStat) => {
        this.isSidenavOpen = sidenavStat;
      })
  }

  ngOnInit(): void {
    this.commService.changeSidenav(!this.isMobile);
  }

  ngOnDestroy(): void {
    this.sidenavSub.unsubscribe();
  }
  contentClicked(element: HTMLDivElement) {
    if(this.isSidenavOpen && this.isMobile)
      this.commService.toggleSidenav();
  }

  optionSelected(element: HTMLAnchorElement) {
    for(var i = 0; i < element.parentElement?.children.length!; i++){
      element.parentElement?.children[i].classList.remove("activeButton")
    }
    element.classList.add("activeButton")
  }
}
