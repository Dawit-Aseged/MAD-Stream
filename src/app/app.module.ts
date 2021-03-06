import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FilmComponent } from './content/film/film.component';
import { MovieComponent } from './content/movie/movie.component';
import { ShowComponent } from './content/show/show.component';
import { MusicComponent } from './content/music/music.component';
import { ChosenShowComponent } from './content/chosen-show/chosen-show.component';
import { PlayerComponent } from './content/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    FilmComponent,
    MovieComponent,
    ShowComponent,
    MusicComponent,
    ChosenShowComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
