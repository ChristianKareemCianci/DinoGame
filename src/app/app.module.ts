import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> c4caefd32de5b23aec015365bcaa2ea4f854d122

import { AppComponent } from './app.component';

@NgModule({
<<<<<<< HEAD
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
=======
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
>>>>>>> c4caefd32de5b23aec015365bcaa2ea4f854d122
