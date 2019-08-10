import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleComponent } from './cattle.component';

describe('CattleComponent', () => {
  let component: CattleComponent;
  let fixture: ComponentFixture<CattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
