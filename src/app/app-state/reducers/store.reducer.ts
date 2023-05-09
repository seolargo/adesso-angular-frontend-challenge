import { createReducer, on } from '@ngrx/store';
import { set, updateAgeFilter } from '../actions/store.actions';
import { AppState, ResourceState } from '../state/app.state';

export const resourceInitialState: ResourceState = {
  Wood: {
    disabled: true,
    value: 0
  },
  Food: {
    disabled: true,
    value: 0
  },
  Gold: {
    disabled: true,
    value: 0
  }
};

export const appInitialState: AppState = {
  ageFilter: ''
};

export const resourceReducer = createReducer(
  resourceInitialState,
  on(set, (state, { resource, value, disabled }) => ({
    ...state,
    [resource]: { ...state[resource], value, disabled: disabled }
  }))
);

export const appReducer = createReducer(
  appInitialState,
  on(updateAgeFilter, (state, { ageFilter }) => ({
    ...state,
    ageFilter: ageFilter
  }))
);
