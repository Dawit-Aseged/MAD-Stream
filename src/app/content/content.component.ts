import { Movie } from 'src/models/movie.model';
import { CommunicationService } from './../service/communication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
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
export class ContentComponent implements OnInit, OnDestroy {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  public movies!: Movie[];
  public filteredMovies!: Movie[];
  moviesSub = new Subscription();
  searchSub = new Subscription();
  public sortChosen = "By Title";

  constructor(private breakpointObserver: BreakpointObserver, private commService: CommunicationService) {
    this.moviesSub = commService.getMoviesSub()
      .subscribe((movies) => {

        this.movies = movies;
        this.filteredMovies = [...this.movies];
      })

    this.searchSub = commService.getSearchSub()
      .subscribe((searchTerm) => {
        if (searchTerm.trim() == "")
          this.filteredMovies = [...this.movies];
        else
          this.filteredMovies = this.movies.filter(v => v.Movie.toLowerCase().includes(searchTerm.toLowerCase()))
      })
  }

  ngOnInit(): void {
    this.commService.getMovies();
  }

  ngOnDestroy() {
    this.moviesSub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  sortClick(element: HTMLAnchorElement){
    var content = element.innerText;
    this.sortChosen = content;
    if(content == "Oldest First"){

    }
    else if (content == "Newest First"){

    }
    else {

    }

  }
}
