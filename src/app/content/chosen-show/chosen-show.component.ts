import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chosen-show',
  templateUrl: './chosen-show.component.html',
  styleUrls: ['./chosen-show.component.scss']
})
export class ChosenShowComponent implements OnInit {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

}
