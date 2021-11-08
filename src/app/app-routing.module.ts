import { PlayerComponent } from './content/player/player.component';
import { ChosenShowComponent } from './content/chosen-show/chosen-show.component';
import { MusicComponent } from './content/music/music.component';
import { ShowComponent } from './content/show/show.component';
import { MovieComponent } from './content/movie/movie.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {path: '', component: MovieComponent},
   {path: 'movies', component: MovieComponent},
   {path: 'shows', component: ShowComponent},
   {path: 'music', component: MusicComponent},
   {path: 'show/:showId', component: ChosenShowComponent},
   {path: 'player', component: PlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
