import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app-state/state/app.state';
import { updateAgeFilter } from '../../../app-state/actions/store.actions';

@Component({
  selector: 'app-ages-button',
  templateUrl: './ages-button.component.html',
  styleUrls: ['./ages-button.component.scss']
})
export class AgesButtonComponent {
  ageFilter!: string | null;
  
  @Input() buttonName = '';
  @Input() id = '';

  constructor(
    private store: Store<{ app: AppState }>
  ) {}

  onInput(value: string | null): void {
    this.ageFilter = value === 'All' ? null : value;

    this.store.dispatch(
      updateAgeFilter({ ageFilter: this.ageFilter })
    );
  }
}
