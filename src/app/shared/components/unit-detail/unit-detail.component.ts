import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import data from '../../../../assets/json/age-of-empires-units.json';

import { Subscription } from 'rxjs';
import { Unit } from '../../models/units';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  agesCostsFilteredUnits: Unit[] = data.units;
  detailedUnit!: Unit;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSub = this.route.params
      .subscribe(params => {
        this.detailedUnit = this.agesCostsFilteredUnits[params['id'] - 1];
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
