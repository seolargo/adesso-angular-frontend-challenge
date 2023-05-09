import { Component, OnInit } from '@angular/core';
import { Unit } from '../../models/units';
import data from '../../../../assets/json/age-of-empires-units.json';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { ResourceState, AppState } from '../../../../app/app-state/state/app.state';
import { Cost } from '../../models/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  agesCostsFilteredUnits: Unit[] = [];

  wood$: Observable<Cost>;
  food$: Observable<Cost>;
  gold$: Observable<Cost>;

  costArray: Cost[] = [
    {
      resource: "Wood",
      disabled: true,
      value: 0
    },
    {
      resource: "Food",
      disabled: true,
      value: 0
    },
    {
      resource: "Gold",
      disabled: true,
      value: 0
    },
  ];

  ageFilter!: string | null;
  ageFilter$!: Observable<string | null>;

  ageFilterSubscription!: Subscription;
  resourceSubscription!: Subscription;

  constructor(
    private resourceStore: Store<{resources: ResourceState}>,
    private appStore: Store<{ app: AppState }>
  ) {
    this.wood$ = this.resourceStore.select(state => ({ 
      resource: 'Wood', 
      value: state.resources.Wood.value, 
      disabled: state.resources.Wood.disabled 
    }));
    this.food$ = this.resourceStore.select(state => ({ 
      resource: 'Food', 
      value: state.resources.Food.value, 
      disabled: state.resources.Food.disabled 
    }));
    this.gold$ = this.resourceStore.select(state => ({ 
      resource: 'Gold', 
      value: state.resources.Gold.value, 
      disabled: state.resources.Gold.disabled 
    }));
    this.ageFilter$ = this.appStore.select(state => state.app.ageFilter);
  }

  ngOnInit(): void {
    this.ageFilterSubscription = this.ageFilter$
      .subscribe(val => {
        this.ageFilter = val;
        this.filterUnits();
      });

    this.resourceSubscription = combineLatest([
      this.wood$,
      this.food$,
      this.gold$
    ]).subscribe(([woodVal, foodVal, goldVal]) => {
      this.costArray = this.findAndReplace(this.costArray, [woodVal, foodVal, goldVal]);
      this.filterUnits();
    });
  }

  filterUnits(): void {
    this.filterAges();
    this.filterCosts();
  }

  private filterAges(): void {
    this.agesCostsFilteredUnits = this.filterAgeArray(data.units);
  }

  private filterCosts(): void {
    const woodFilter = this.costArray[0].value;
    const woodDisabled = this.costArray[0].disabled;
    const foodFilter = this.costArray[1].value;
    const foodDisabled = this.costArray[1].disabled;
    const goldFilter = this.costArray[2].value;
    const goldDisabled = this.costArray[2].disabled;

    this.agesCostsFilteredUnits = this.filterCostArray(
      woodFilter, 
      woodDisabled, 
      foodFilter, 
      foodDisabled, 
      goldFilter, 
      goldDisabled
    );
  }

  private filterAgeArray(array: Unit[]): Unit[] {
    return array.filter((val) => (
      this.ageFilter ? val?.age === this.ageFilter : true
    ));
  }

  filterCostArray(
    woodFilter: number, 
    woodDisabled: boolean, 
    foodFilter: number, 
    foodDisabled: boolean, 
    goldFilter: number, 
    goldDisabled: boolean
  ): Unit[] {
    return this.agesCostsFilteredUnits.filter((val) => (
      (!woodDisabled ? val.cost?.Wood === +woodFilter : true) &&
      (!foodDisabled ? val.cost?.Food === +foodFilter : true) &&
      (!goldDisabled ? val.cost?.Gold === +goldFilter : true)
    ));
  }

  private findAndReplace<T extends { resource: string }>(array1: T[], array2: T[]): T[] {
    return array1.map(obj => array2.find(o => o.resource === obj.resource) || obj);
  }
}
