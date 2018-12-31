import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {GatorComponent} from './gator/gator.component';
import {TabbyComponent} from './tabby/tabby.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GatorComponent,
        TabbyComponent,
      ],
      imports: [
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title "fightui"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('fightui');
  });
});
