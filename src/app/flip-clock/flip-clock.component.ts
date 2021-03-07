import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-flip-clock',
  templateUrl: './flip-clock.component.html',
  styleUrls: ['./flip-clock.component.scss'],
})
export class FlipClockComponent implements OnInit {
  clock = {};
  totalDays: string = '14';
  current: any;

  ngOnInit(): void {
    this.clock = {
      s: this.initElements('s'),
      m: this.initElements('m'),
      h: this.initElements('h'),
      d: this.initElements('d'),
    };
  }

  initElements(type) {
    let el = {};

    if (!['s', 'm', 'h', 'd'].includes(type)) return el;

    const target = document.querySelector(`.flip-clock-${type}`);

    if (!target) return el;
    const digit = target.querySelector('.digit');
    const card = digit.querySelector('.card');
    const cardFaces = card.querySelectorAll('.card-face');
    const cardFaceFront = cardFaces[0];
    const cardFaceBack = cardFaces[1];

    el = {
      digit,
      card,
      cardFaces,
      cardFaceA: cardFaceFront,
      cardFaceB: cardFaceBack,
    }

    return el;
  }

  runClock(event) {
    const newTime = event.text.split(':');
    let next = {
      d: newTime[0],
      h: newTime[1],
      m: newTime[2],
      s: newTime[3],
    };

    if(!this.current)
    {
      this.current = Object.assign({}, next);
    }

    for (const i of Object.keys(this.clock)) {
        const currentEl = this.current[`${i}`];

        let nextVal: any = next[`${i}`];

        const domEl = this.clock[i];
        if (domEl && domEl.digit) {
          if (!domEl.digit.dataset.digitAfter && !domEl.digit.dataset.digitBefore) {
            // Visible
            domEl.digit.dataset.digitBefore = currentEl;
            domEl.cardFaceA.textContent = domEl.digit.dataset.digitBefore;
          } else if (domEl.digit.dataset.digitBefore !== nextVal) {
            domEl.digit.dataset.digitAfter = nextVal;
            domEl.cardFaceB.textContent = domEl.digit.dataset.digitAfter;
            domEl.card.addEventListener(
              'transitionend',
              () => {
                domEl.digit.dataset.digitBefore = nextVal;
                domEl.cardFaceA.textContent = domEl.digit.dataset.digitBefore;

                const cardClone = domEl.card.cloneNode(true);
                cardClone.classList.remove('flipped');
                domEl.digit.replaceChild(cardClone, domEl.card);
                domEl.card = cardClone;
                domEl.cardFaces = domEl.card.querySelectorAll('.card-face');
                domEl.cardFaceA = domEl.cardFaces[0];
                domEl.cardFaceB = domEl.cardFaces[1];
              },
              { once: true }
            );
            if (!domEl.card.classList.contains('flipped' )) {
              this.clock[i].card.classList.add('flipped');
            }
          }
        }

    }
    this.current = Object.assign({}, next);
  }
}
