import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppGameComponent } from './app-game/app-game.component';


@Component({
  selector: 'app-root',
  imports: [AppGameComponent,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angularprj');
}
