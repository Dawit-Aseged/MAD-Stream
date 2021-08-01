import { Movie } from 'src/models/movie.model';
import { CommunicationService } from './../service/communication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  public movies!: Movie[];
  moviesSub = new Subscription();
  constructor(private breakpointObserver: BreakpointObserver, private commService: CommunicationService) {
    this.moviesSub = commService.getMoviesSub().subscribe((movies) => {
      this.movies = [...movies];
      console.log(this.movies)
    })
  }

  ngOnInit(): void {
    this.commService.getMovies();
  }

  ngOnDestroy() {
    this.moviesSub.unsubscribe();
  }
}
