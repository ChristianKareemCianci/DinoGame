<<<<<<< HEAD
=======
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
>>>>>>> c4caefd32de5b23aec015365bcaa2ea4f854d122
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
<<<<<<< HEAD
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DinoGameGit';
=======
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fire', [
      state(
        'left',
        style({
          transform: 'translateX(0)',
          // position: 'relative',
        })
      ),
      state(
        'right',
        style({
          transform: 'translateX(200px)',
          // position: 'relative',
        })
      ),
      transition('right => left', animate(1000)),
    ]),
    trigger('jump', [
      state(
        'up',
        style({
          transform: 'translateY(-50px)',
          // position: 'absolute',
        })
      ),
      state(
        'down',
        style({
          transform: 'translateY(0)',
        })
      ),
      transition(
        'down => up',
        animate(
          300,
          keyframes([
            style({
              offset: 0,
              transform: 'translateY(0)',
            }),
            style({
              offset: 0.7,
              transform: 'translateY(-50px)',
            }),
            style({
              offset: 1,
              transform: 'translateY(-50px)',
            }),
          ])
        )
      ),
      transition(
        'up => down',
        animate(
          300,
          keyframes([
            style({
              offset: 0,
              transform: 'translateY(-50px)',
            }),
            style({
              offset: 0.3,
              transform: 'translateY(-50px)',
            }),
            style({
              offset: 1,
              transform: 'translateY(0)',
            }),
          ])
        )
      ),
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
    }, 300);
  }
>>>>>>> c4caefd32de5b23aec015365bcaa2ea4f854d122
}
