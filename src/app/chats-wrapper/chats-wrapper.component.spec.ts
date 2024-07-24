import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChatsWrapperComponent } from './chats-wrapper.component';

describe('ChatsWrapperComponent', () => {
  let component: ChatsWrapperComponent;
  let fixture: ComponentFixture<ChatsWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ChatsWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
