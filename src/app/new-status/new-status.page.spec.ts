import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewStatusPage } from './new-status.page';

describe('NewStatusPage', () => {
  let component: NewStatusPage;
  let fixture: ComponentFixture<NewStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
