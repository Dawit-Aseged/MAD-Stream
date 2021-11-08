import { CommunicationService } from 'src/app/service/communication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  public path!: string|null;
  public streamPath!: string;
  constructor(private route: ActivatedRoute, private commService: CommunicationService) {

   }

  ngOnInit(): void {
    this.path = this.commService.getChosenMovie();
    console.log(this.path)
    this.streamPath = "http://localhost:8000/dapi/stream?path=" + this.path;
  }

}
