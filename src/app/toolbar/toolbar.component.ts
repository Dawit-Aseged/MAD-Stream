import { CommunicationService } from './../service/communication.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  searchActive = false;
  constructor(private breakpointObserver: BreakpointObserver, private commService: CommunicationService) { }

  ngOnInit(): void {
  }

  menuClick() {
    this.commService.toggleSidenav();
  }

  searchClicked(input: HTMLInputElement){
    this.searchActive = true;
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
}
