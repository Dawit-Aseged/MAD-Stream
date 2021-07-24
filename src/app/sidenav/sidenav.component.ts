import { CommunicationService } from './../communication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public sidenavSub: Subscription;
  public isSidenavOpen :boolean;
  constructor(public commService: CommunicationService) {
    this.isSidenavOpen = this.commService.isSidenavOpen;
    this.sidenavSub = this.commService.getSidenavStatus()
      .subscribe((sidenavStat) => {
        this.isSidenavOpen = sidenavStat;
      })
   }

  ngOnInit(): void {
  }

}
