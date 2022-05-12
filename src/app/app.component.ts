import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

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
          250,
          keyframes([
            style({
              offset: 0,
              transform: 'translateY(0)',
            }),
            style({
              offset: 0.8,
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
          250,
          keyframes([
            style({
              offset: 0,
              transform: 'translateY(-50px)',
            }),
            style({
              offset: 0.2,
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

    trigger('melt', [
      state(
        'melted',
        style({
          transform: 'scale(1.6, 0.2) translateY(70px)',
        })
      ),
      transition('*=> melted', animate(400)),
    ]),
  ],
})
export class AppComponent implements OnDestroy {
  @ViewChild('snowman', { static: true }) snowman: ElementRef;
  @ViewChild('fire', { static: true }) fire: ElementRef;

  subscription: Subscription = null;

  snowmanPositionX = null;
  snowmanPositionY = null;
  firePositionX = null;
  firePositionY = null;

  fireState = 'right';
  jumpState = 'down';
  meltingState = 'notMelted';

  isAnimationGoing = false;
  isGameover = false;
  showingDiv = true;

  onStart() {
    this.meltingState = 'notMelted';
    this.showingDiv = true;
    this.isGameover = false;
    this.isAnimationGoing = true;
    this.animation();
  }

  onStop() {
    this.isAnimationGoing = false;
  }

  onJump() {
    this.jumpState = 'up';
    setTimeout(() => {
      this.jumpState = 'down';
    }, 300);
  }

  onMelt() {
    // si triggera quando si perde
    this.meltingState = 'melted';
  }

  onClose() {
    this.showingDiv = false;
  }

  private check() {
    // prendo le posizioni

    const snowmanArray = getComputedStyle(
      this.snowman.nativeElement
    ).transform.split(',');
    this.snowmanPositionY = snowmanArray[5].split(')')[0];

    const fireArray = getComputedStyle(this.fire.nativeElement).transform.split(
      ','
    );
    this.firePositionX = fireArray[4];

    if (
      135 <= +this.snowmanPositionY + 150 &&
      150 + +this.snowmanPositionY <= 150 &&
      50 <= +this.firePositionX &&
      +this.firePositionX <= 90
    ) {
      this.isGameover = true;
      this.onMelt();

      setTimeout(() => {
        this.onStop();
      }, 400);
    }
  }

  //ho spostato l'animazione del fuoco qui perché così si può anche bloccare l'animazione
  //con la variabile isAnimationGoing

  private animation() {
    if (this.isAnimationGoing && !this.isGameover) {
      this.fireState = 'left';
      setTimeout(() => {
        this.fireState = 'right';
      }, 1000);
      setTimeout(() => {
        this.subscription.unsubscribe();
        this.animation();
      }, 1000);
      this.subscription = interval(100).subscribe(() => {
        this.check();
      });
    } else {
      this.subscription.unsubscribe();
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
