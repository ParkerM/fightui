import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TabbyComponent} from './tabby/tabby.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FightstoreService} from './services/fightstore.service';
import {Subject} from 'rxjs';
import {Fight} from './services/fight.model';
import {LayoutModule} from '@angular/cdk/layout';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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
      declarations: [AppComponent, TabbyComponent],
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
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });
  }));

  afterEach(() => {
    mockFightSubject.complete();
  });

  it('should fetch fights on init', async(() => {
    const fetchedFights: Fight[] = [];

    fixture.detectChanges();
    component.dataSubject
      .subscribe(fRay => {
          fetchedFights.push(fRay);
        }, err => fail(err),
        () => {
          expect(fetchedFights).toHaveLength(3);
          expect(fetchedFights).toEqual(fights);
        });

    mockFightSubject.next(fights[0]);
    mockFightSubject.next(fights[1]);
    mockFightSubject.next(fights[2]);
    fixture.detectChanges();
  }));
});
