import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { set } from '../../../app-state/actions/store.actions';
import { CostsFilterComponent } from './costs-filter.component';
import { ResourceState } from '../../../../app/app-state/state/app.state';

describe('CostsFilterComponent', () => {
  let component: CostsFilterComponent;
  let fixture: ComponentFixture<CostsFilterComponent>;
  let mockStore: MockStore<{ resources: ResourceState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostsFilterComponent],
      providers: [
        provideMockStore(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsFilterComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store) as MockStore<{ resources: ResourceState }>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call clicked method', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.changeZoomVal = 3;

    component.clicked('Wood');

    expect(dispatchSpy).toHaveBeenCalledWith(
      set({
        resource: 'Wood',
        value: 3,
        disabled: false,
      })
    );
    expect(component).toBeTruthy();
  });

  it('should change radio value', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.label = 'Wood';
    component.disabled = false;
    
    component.changeRadioValue('3');
    
    expect(dispatchSpy).toHaveBeenCalledWith(
        set({
          resource: 'Wood',
          value: 3,
          disabled: false,
        })
    );
    expect(component).toBeTruthy();
  })

  it('should update data', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.label = 'Wood';
    component.disabled = false;

    component.updateData();

    expect(dispatchSpy).toHaveBeenCalledWith(
      set({
        resource: 'Wood',
        value: 0,
        disabled: false,
      })
    );
    expect(component).toBeTruthy();
  });

  it('should update data when disabled is given as true', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.label = 'Wood';
    component.disabled = true;

    component.updateData();

    expect(dispatchSpy).toHaveBeenCalledWith(
      set({
        resource: 'Wood',
        value: 0,
        disabled: true,
      })
    );
    expect(component).toBeTruthy();
  });
});
