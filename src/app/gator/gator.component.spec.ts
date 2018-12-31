import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule, MatPaginatorModule,
  MatSidenavModule, MatSortModule, MatTableModule,
  MatToolbarModule,
} from '@angular/material';

import { GatorComponent } from './gator.component';
import {TabbyComponent} from '../tabby/tabby.component';

describe('GatorComponent', () => {
  let component: GatorComponent;
  let fixture: ComponentFixture<GatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GatorComponent, TabbyComponent],
      imports: [
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        NoopAnimationsModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
