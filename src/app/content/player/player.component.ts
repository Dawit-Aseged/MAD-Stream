import { Movie } from 'src/models/movie.model';
import { CommunicationService } from 'src/app/service/communication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public movie!: Movie;
  public title!: string;
  public streamPath!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.movie = this.commService.getChosenMovie();
    if (this.movie == null){
      this.router.navigate(["../movies"], {relativeTo: this.route})
      // Add logic if there is no movie present
      return;
    }
    this.title = this.movie.Movie;
    this.streamPath = 'http://localhost:8000/dapi/stream?path=' + this.movie.Location;
  }
}
