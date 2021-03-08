import { element } from 'protractor';
import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';

@Component({
  selector: 'app-flip-clock',
  templateUrl: './flip-clock.component.html',
  styleUrls: ['./flip-clock.component.scss'],
})
export class FlipClockComponent implements OnInit {
  private _elementContext: any;
  previousVal: any;
  @Input() nextVal: Subject<string>;
  @Input() type: string;
  @ViewChild('digit', { static: true }) digit: ElementRef;
  @ViewChild('card', { static: true }) card: ElementRef;
  @ViewChild('cardFaceA', { static: true }) cardFaceA: ElementRef;
  @ViewChild('cardFaceB', { static: true }) cardFaceB: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.buildElement()
    this.nextVal.subscribe( (next: string) => {
      this.runClock(next);
    })
  }

  runClock(next: string): void {
    if (!this.previousVal) {
      this.previousVal = next;
    }
    if (this._elementContext && this._elementContext.digit) {
      if (!this._elementContext.digit.dataset.digitAfter && !this._elementContext.digit.dataset.digitBefore) {

        this.renderer.setAttribute(this._elementContext.digit, 'data-digit-before', this.previousVal);
        this.renderer.setProperty(this._elementContext.cardFaceA, 'textContent', this.previousVal);

      } else if (this._elementContext.digit.dataset.digitBefore !== next) {

        this._elementContext.digit.dataset.digitAfter = next;
        this._elementContext.cardFaceB.textContent = this._elementContext.digit.dataset.digitAfter;

        this.renderer.setAttribute(this._elementContext.digit, 'data-digit-after', next);
        this.renderer.setProperty(this._elementContext.cardFaceB, 'textContent', next);

        this._elementContext.card.addEventListener(
          'transitionend',
          () => {
            this.renderer.setAttribute(this._elementContext.digit, 'data-digit-before', this.previousVal);
            this.renderer.setProperty(this._elementContext.cardFaceA, 'textContent', this.previousVal);

            const cardClone = this._elementContext.card.cloneNode(true);
            this.renderer.removeClass(cardClone, 'flipped');
            this._elementContext.digit.replaceChild(
              cardClone,
              this._elementContext.card
            );
            this._elementContext.card = cardClone;
            const cardFaces = this._elementContext.card.querySelectorAll('.card-face');
            this._elementContext.cardFaceA = cardFaces[0];
            this._elementContext.cardFaceB = cardFaces[1];
          },
          { once: true }
        );
        if (!this._elementContext.card.classList.contains('flipped')) {
          this._elementContext.card.classList.add('flipped');
        }
      }
    }
    this.previousVal = next;
  }

  buildElement(): void {
    this._elementContext = {
      digit: this.digit.nativeElement,
      card: this.card.nativeElement,
      cardFaceA: this.cardFaceA.nativeElement,
      cardFaceB: this.cardFaceB.nativeElement,
    };
  }
}
