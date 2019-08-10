import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessinghouseComponent } from './processinghouse.component';

describe('ProcessinghouseComponent', () => {
  let component: ProcessinghouseComponent;
  let fixture: ComponentFixture<ProcessinghouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessinghouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessinghouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
