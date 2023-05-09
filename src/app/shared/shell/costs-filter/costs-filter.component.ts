import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { set } from '../../../app-state/actions/store.actions';
import { Unit } from '../../models/units';
import { ResourceState } from '../../../../app/app-state/state/app.state';

@Component({
  selector: 'app-costs-filter',
  templateUrl: './costs-filter.component.html',
  styleUrls: ['./costs-filter.component.scss']
})
export class CostsFilterComponent {
  @Input() label = '';
  @Input() rangeValue = '';
  @Input() id = 1;
  
  disabled = true;
  agesCostsFilteredUnits: Unit[] = [];
  changeZoomVal = 0;

  constructor(
    private store: Store<{resources: ResourceState}>
  ) {}

  clicked(label: string): void {
    this.disabled = !this.disabled;
    this.label = label;
    
    this.updateData();
  }

  changeRadioValue(value: string): void {
    this.changeZoomVal = +value;

    this.updateData();
  }

  updateData(): void {
    const value = this.disabled ? 0 : this.changeZoomVal;
  
    this.store.dispatch(
      set({ 
        resource: this.label as keyof ResourceState, 
        value, 
        disabled: this.disabled 
      })
    );
  }  
}
