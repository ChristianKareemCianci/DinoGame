import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fire', [
      state(
        'left',
        style({
          transform: 'translateX(0)',
          position: 'absolute',
        })
      ),
      state(
        'right',
        style({
          transform: 'translateX(200px)',
          position: 'absolute',
        })
      ),
      transition('right => left', animate(1000)),
    ]),
    trigger('jump', [
      state(
        'up',
        style({
          transform: 'translateY(-50px)',
          position: 'absolute',
        })
      ),
      state(
        'down',
        style({
          transform: 'translateY(0)',
          position: 'absolute',
        })
      ),
      transition('down => up', animate(500)),
      transition('up => down', animate(500)),
    ]),
  ],
})
export class AppComponent {
  fireState = 'right';
  jumpState = 'down';

  onStart() {
    this.fireState = 'left';
    setTimeout(() => {
      this.fireState = 'right';
    }, 1000);
    setTimeout(() => {
      this.onStart();
    }, 1000);
  }

  onJump() {
    this.jumpState = 'up';
    setTimeout(() => {
      this.jumpState = 'down';
    }, 500);
  }
}
