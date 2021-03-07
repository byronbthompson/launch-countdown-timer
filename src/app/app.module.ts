import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlipClockComponent } from './flip-clock/flip-clock.component';
import { CountdownGlobalConfig, CountdownConfig, CountdownModule } from 'ngx-countdown';


const countdownConfigFactory: CountdownConfig = {
  //Calculate the remaining time based on the server, e.g: `10`,`5.5`, (Unit: seconds)
  leftTime: 1209600,
  // Formats a date value, pls refer to [Accepted patterns](https://angular.io/api/common/DatePipe#usage-notes), Default: `HH:mm:ss`
  format: 'dd:HH:mm:ss',
  // should be trigger type `notify` event on the x second. When values is `0` will be trigger every time.
  notify: 0
 }
@NgModule({
  declarations: [
    AppComponent,
    FlipClockComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    CountdownModule,
  ],
  providers: [
    {provide: CountdownGlobalConfig, useValue: countdownConfigFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

