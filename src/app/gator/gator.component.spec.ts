import {LayoutModule} from '@angular/cdk/layout';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';

import {GatorComponent} from './gator.component';
import {TabbyComponent} from '../tabby/tabby.component';
import {FightstoreService} from '../services/fightstore.service';
import {Subject} from 'rxjs';
import {Fight} from '../services/fight.model';

describe('GatorComponent', () => {
  let component: GatorComponent;
  let fixture: ComponentFixture<GatorComponent>;
  let el: any;

  let mockFightSubject: Subject<Fight>;
  const mockFightstoreService = {
    fetchData: jest.fn(() => mockFightSubject),
  };
  let fights: Fight[];

  beforeEach(async(() => {
    mockFightSubject = new Subject();
    fights = [
      new Fight({eventDate: 123456789, eventName: 'King fight', _id: 'fff0000000000', _timestamp: 90909090}),
      new Fight({eventDate: 2233445566, eventBout: 'Bout bout bout v bout', _id: 'bbbbeeeeeeeeffff', eventOrg: 'MooFC'}),
      new Fight({eventDate: 43146546, eventBilling: 'check please', _id: 'ffff000000000dddd', eventOrg: 'The Guild of Iron Chefs'}),
    ];
    return TestBed.configureTestingModule({
      declarations: [GatorComponent, TabbyComponent],
      imports: [
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: FightstoreService, useValue: mockFightstoreService},
      ],
      schemas: [
        // CUSTOM_ELEMENTS_SCHEMA,
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GatorComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });
  }));

  afterEach(() => {
    mockFightSubject.complete();
  });

  it('should fetch fights on init', async(() => {
    fixture.detectChanges();
    mockFightSubject.next(fights[0]);
    mockFightSubject.next(fights[1]);
    mockFightSubject.next(fights[2]);

    fixture.detectChanges();
    expect(component.datarray).toEqual(fights);
    expect(el.querySelector('#fight-tainer').textContent).toContain('King fight');
    expect(el.querySelector('#fight-tainer').textContent).toContain('Friday, January 02, 4:17 GMT-6');
    expect(el.querySelector('#fight-tainer').textContent).toContain('The Guild of Iron Chefs');
  }));
});
