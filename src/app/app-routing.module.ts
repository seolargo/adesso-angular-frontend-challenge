import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UnitsComponent } from './shared/components/units/units.component';
import { UnitDetailComponent } from './shared/components/unit-detail/unit-detail.component';
import { ErrorComponent } from './features/error/error.component';
import { BrowserModule } from '@angular/platform-browser';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'units', component: UnitsComponent, pathMatch: 'full' },
  { path: 'unit-details/:id', component: UnitDetailComponent, pathMatch: 'full' },
  { path: '**', component: ErrorComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
