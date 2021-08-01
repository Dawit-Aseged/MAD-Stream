import { Movie } from 'src/models/movie.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  public isSidenavOpen: boolean = true;
  private sidenavStatus = new Subject<boolean>();
  private movies = new Subject<Movie[]>();
  private searchTerm = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

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

  public getMoviesSub() {
    return this.movies.asObservable();
  }
  public getMovies() {
    var movies: Movie[] = [
      {name: "Fast and Furious 9 asfsa sfsafsdf", duration: "22:22"},
      {name: "The Jungle Cruise", duration: "2:39"},
      {name: "Alladin", duration: "1:56"},
      {name: "Army of the Dead", duration: "3:12"},
      {name: "Fast and Furious 9", duration: "2:22"},
      {name: "The Jungle Cruise", duration: "2:39"},
      {name: "Alladin", duration: "1:56"},
      {name: "Army of the Dead", duration: "3:12"}
    ]

    this.movies.next(movies);
  }

  public getSearchSub() {
    return this.searchTerm.asObservable();
  }
  public searchMedia(term: string) {
    this.searchTerm.next(term);
  }
}
