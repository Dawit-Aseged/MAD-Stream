import { CommunicationService } from 'src/app/service/communication.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isMobile!: boolean;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  searchActive = false;
  constructor(private breakpointObserver: BreakpointObserver, private commService: CommunicationService) {
    this.isHandset
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
    })
  }

  ngOnInit(): void {
  }

  menuClick() {
    this.commService.toggleSidenav();
  }

  searchClicked(input: HTMLInputElement){
    this.searchActive = true;
    if(this.isMobile){
      this.commService.changeSidenav(false)
    }
    setTimeout(() => {
      input.focus();
    }, 100);
  }

  // Checks if there is anything in the search bar and removes border accordingly
  inputFocusLeave(input: HTMLInputElement) {
    if(input.value == undefined ||input.value.trim() == ""){
      input.value = "";
      this.searchActive = false
    }
  }

  searchInput(input: HTMLInputElement){
    this.commService.searchMedia(input.value);
  }
}
