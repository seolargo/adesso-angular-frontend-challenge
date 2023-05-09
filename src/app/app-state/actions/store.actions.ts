import { createAction, props } from '@ngrx/store';
import { ResourceState } from '../state/app.state';

export const set = createAction('[Set] Resource', props<{ resource: keyof ResourceState, value: number, disabled: boolean }>());
export const updateAgeFilter = createAction('[Set] App', props<{ ageFilter: string | null }>());

