import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMergeComponent } from './file-merge.component';

describe('FileMergeComponent', () => {
  let component: FileMergeComponent;
  let fixture: ComponentFixture<FileMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileMergeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
