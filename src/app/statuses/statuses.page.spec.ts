import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusesPage } from './statuses.page';

describe('StatusesPage', () => {
  let component: StatusesPage;
  let fixture: ComponentFixture<StatusesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
