import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app-state/state/app.state';
import { updateAgeFilter } from '../../../app-state/actions/store.actions';
import { AgesButtonComponent } from './ages-button.component';

describe('AgesButtonComponent', () => {
  let component: AgesButtonComponent;
  let fixture: ComponentFixture<AgesButtonComponent>;
  let mockStore: MockStore<{ app: AppState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgesButtonComponent],
      providers: [
        provideMockStore(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgesButtonComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should call onInput when ageFilter is set to "All"', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.onInput('All');

    expect(dispatchSpy).toHaveBeenCalledWith(
      updateAgeFilter({ ageFilter: null })
    );
    expect(component).toBeTruthy();
  });

  it('should call onInput when ageFilter is set to "All1"', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.onInput('All1');

    expect(dispatchSpy).toHaveBeenCalledWith(
      updateAgeFilter({ ageFilter: "All1" })
    );
    expect(component).toBeTruthy();
  });
});
