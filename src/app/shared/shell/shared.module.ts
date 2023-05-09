import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    MatListModule,
    MatSidenavModule
  ],
  exports: [
    CommonModule, 
    BrowserModule, 
    MatListModule, 
    MatSidenavModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
