import { resourceReducer, appReducer } from './store.reducer';
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
  

describe('Store Reducers', () => {
  describe('resourceReducer', () => {
    it('should update the resource state when receiving a set action', () => {
      const initialState = { ...resourceInitialState };
      const resource = 'Wood';
      const value = 100;
      const disabled = false;
      const action = set({ resource, value, disabled });

      const newState = resourceReducer(initialState, action);

      expect(newState[resource]).toEqual({ value, disabled });
      expect(newState).not.toBe(initialState);
    });

    it('should return the current state for an unknown action', () => {
      const initialState = { ...resourceInitialState };
      const action = { type: 'UNKNOWN_ACTION' };

      const newState = resourceReducer(initialState, action);

      expect(newState).toBe(initialState);
    });
  });

  describe('appReducer', () => {
    it('should update the app state when receiving an updateAgeFilter action', () => {
      const initialState = { ...appInitialState };
      const ageFilter = 'Castle Age';
      const action = updateAgeFilter({ ageFilter });

      const newState = appReducer(initialState, action);

      expect(newState.ageFilter).toEqual(ageFilter);
      expect(newState).not.toBe(initialState);
    });

    it('should return the current state for an unknown action', () => {
      const initialState = { ...appInitialState };
      const action = { type: 'UNKNOWN_ACTION' };

      const newState = appReducer(initialState, action);

      expect(newState).toBe(initialState);
    });
  });
});
