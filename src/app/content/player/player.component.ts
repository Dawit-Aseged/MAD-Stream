import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  public path!: string|null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.path = this.route.snapshot.paramMap.get("path")
  }

}
