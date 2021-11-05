import { Movie, Show } from 'src/models/movie.model';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommunicationService } from 'src/app/service/communication.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.2s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.2s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ShowComponent implements OnInit, OnDestroy {
isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  public shows!: Show[];
  public filteredShows!: Show[];
  showsSub = new Subscription();
  searchSub = new Subscription();

  constructor(private breakpointObserver: BreakpointObserver, private commService: CommunicationService) {
    this.showsSub = commService.getShowsSub()
      .subscribe((shows) => {
        this.shows = shows;
        this.filteredShows = [...this.shows];
      })

    this.searchSub = commService.getSearchSub()
      .subscribe((searchTerm) => {
        if (searchTerm.trim() == "")
          this.filteredShows = [...this.shows];
        else
          this.filteredShows = this.shows.filter(v => v.Name.toLowerCase().includes(searchTerm.toLowerCase()))
      })
   }

  ngOnInit(): void {
    this.commService.getShows();
  }
  ngOnDestroy() {
    this.showsSub.unsubscribe();
    this.searchSub.unsubscribe();
  }
}
