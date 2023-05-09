import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { ErrorComponent } from './features/error/error.component';
import { HeaderComponent } from './shared/shell/header/header.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UnitsComponent } from './shared/components/units/units.component';
import { UnitDetailComponent } from './shared/components/unit-detail/unit-detail.component';
import { CostsFilterComponent } from './shared/shell/costs-filter/costs-filter.component';
import { TableComponent } from './shared/shell/table/table.component';
import { AgesButtonComponent } from './shared/shell/ages-button/ages-button.component';
import { StoreModule } from '@ngrx/store';
import { resourceReducer, appReducer } from './app-state/reducers/store.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    UnitsComponent,
    UnitDetailComponent,
    HeaderComponent,
    CostsFilterComponent,
    TableComponent,
    AgesButtonComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatListModule,
    MatSidenavModule,
    StoreModule.forRoot({ app: appReducer }),
    StoreModule.forFeature('resources', resourceReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
