import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DropdownMenuModule } from '../../src';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DropdownMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
