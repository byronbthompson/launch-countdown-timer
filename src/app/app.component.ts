import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'launch-countdown-timer';
  clock = {};
  totalDays: string = '14';
  current: iFlipContext;
  nextDay: Subject<string> = new Subject<string>();
  nextHours: Subject<string> = new Subject<string>();
  nextMins: Subject<string> = new Subject<string>();
  nextSecs: Subject<string> = new Subject<string>();
  digits: ['s', 'm', 'h', 'd'];

  onNewValue(event) {
    const timeStr = event.text.split(':');
    this.nextDay.next(timeStr[0]);
    this.nextHours.next(timeStr[1]);
    this.nextMins.next(timeStr[2]);
    this.nextSecs.next(timeStr[3]);
  }
}
interface iFlipContext {
  d: {},
  h: {},
  m: {},
  s: {}
}
