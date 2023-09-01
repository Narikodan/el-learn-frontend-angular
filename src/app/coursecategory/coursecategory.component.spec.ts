import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecategoryComponent } from './coursecategory.component';

describe('CoursecategoryComponent', () => {
  let component: CoursecategoryComponent;
  let fixture: ComponentFixture<CoursecategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursecategoryComponent]
    });
    fixture = TestBed.createComponent(CoursecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
