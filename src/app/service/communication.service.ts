import { Movie, Show } from 'src/models/movie.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  // Change the below code when hosting to a remote client
  private currentIP = "192.168.128.204";
  // private currentIP = "localhost"
  public isSidenavOpen: boolean = true;
  private sidenavStatus = new Subject<boolean>();
  private movies = new Subject<Movie[]>();
  private shows = new Subject<Show[]>();
  private searchTerm = new Subject<string>();
  private chosenMovie!:Movie;
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

  public getShowsSub() {
    return this.shows.asObservable();
  }
  public getMovies() {
    this.httpClient.get<{newMovies: Movie[]}>(`http://${this.currentIP}:8000/dapi/movies`)
      .subscribe((movies) => {
        var trimmedMovies: Movie[] = movies.newMovies.map(movie => {
          return {
            Movie: movie.Movie.substring(0, movie.Movie.lastIndexOf(".")),
            Location: movie.Location,
            Duration: movie.Duration
          }
        })
        this.movies.next(trimmedMovies);
      })
  }

  public getShows() {

    var shows: Show[] = [
      {
        Name: "Some Name",
        Location: "Some Location",
        NumOfSeasons: "7"
      },
      {
        Name: "Some Other Name",
        Location: "Some Other Location",
        NumOfSeasons: "5"
      },
      {
        Name: "Some Name",
        Location: "Boom",
        NumOfSeasons: "23"
      }
    ]

    this.shows.next(shows)
  }
  public getSearchSub() {
    return this.searchTerm.asObservable();
  }
  public searchMedia(term: string) {
    this.searchTerm.next(term);
  }

  public setChosenMovie(movie: Movie) {
    this.chosenMovie = movie;
  }
  public getChosenMovie() {
    return this.chosenMovie;
  }
}
