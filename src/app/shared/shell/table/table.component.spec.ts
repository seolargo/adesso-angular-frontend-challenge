import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TableComponent } from './table.component';
import { Cost } from '../../models/table';
import { Unit } from '../../models/units';
import { AppState, ResourceState } from '../../../../app/app-state/state/app.state';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockResourceStore: jasmine.SpyObj<Store<{ resources: ResourceState }>>;
  let mockAppStore: jasmine.SpyObj<Store<{ app: AppState }>>;

  const mockWood$: Observable<Cost> = of({
    resource: 'Wood',
    value: 1,
    disabled: false
  });
  const mockFood$: Observable<Cost> = of({
    resource: 'Food',
    value: 1,
    disabled: false
  });
  const mockGold$: Observable<Cost> = of({
    resource: 'Gold',
    value: 1,
    disabled: false
  });
  const mockAgeFilter$: Observable<string | null> = of('Castle');
  const mockUnits: Unit[] = [
    {
      id: 1,
      name: '1',
      description: '1',
      expansion: '1',
      age: '1',
      cost: {
        Wood: 1,
        Food: 1,
        Gold: 1
      },
      build_time: 1,
      reload_time: 5,
      attack_delay: 2,
      movement_rate: 1,
      line_of_sight: 1,
      hit_points: 1,
      range: '1',
      attack: 1,
      armor: '1',
      accuracy: '1',
      attack_bonus: ['1'],
      search_radius: 1,
      blast_radius: 1,
      armor_bonus: ['1']
    }
  ];

  beforeEach(async () => {
    mockResourceStore = jasmine.createSpyObj('Store', ['select']);
    mockAppStore = jasmine.createSpyObj('Store', ['select']);

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        { provide: Store, useValue: mockResourceStore },
        { provide: Store, useValue: mockAppStore }
      ]
    }).compileComponents();

    mockResourceStore.select.and.returnValues(mockWood$, mockFood$, mockGold$);
    mockAppStore.select.and.returnValue(mockAgeFilter$);

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter units', () => {
    component.filterUnits();
    expect(component).toBeTruthy();
  });

  it('should find and replace', () => {
    const array1 = [
      { resource: 'W', value: 10 },
      { resource: 'F', value: 20 },
      { resource: 'G', value: 30 }
    ];
    const array2 = [
      { resource: 'F', value: 25 },
      { resource: 'S', value: 40 }
    ];
    const expectedResult = [
      { resource: 'W', value: 10 },
      { resource: 'F', value: 25 },
      { resource: 'G', value: 30 }
    ];

    expect(component['findAndReplace'](array1, array2)).toEqual(expectedResult);
  });

  
  it('should filter cost array', () => {
    component.agesCostsFilteredUnits = mockUnits;
    const woodFilter = 0;
    const woodDisabled = true;
    const foodFilter = 0;
    const foodDisabled = true;
    const goldFilter = 0;
    const goldDisabled = true;
    
    component.filterCostArray(woodFilter, woodDisabled, foodFilter, foodDisabled, goldFilter, goldDisabled);
    expect(component).toBeTruthy();
  });

  it('should filter cost array when woodDisabled set to false', () => {
    component.agesCostsFilteredUnits = mockUnits;
    const woodFilter = 0;
    const woodDisabled = false;
    const foodFilter = 0;
    const foodDisabled = true;
    const goldFilter = 0;
    const goldDisabled = true;
    
    component.filterCostArray(woodFilter, woodDisabled, foodFilter, foodDisabled, goldFilter, goldDisabled);
    expect(component).toBeTruthy();
  });

  it('should filter costs', () => {
    component.agesCostsFilteredUnits = mockUnits;
    
    component['filterCosts']();
    expect(component.agesCostsFilteredUnits).toEqual(mockUnits);
  });

  it('should filter the units based on the age filter', () => {    
    component['filterAges']();
    expect(component).toBeTruthy();
  });
});
