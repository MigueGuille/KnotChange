import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChatItemComponent } from './chat-item.component';

describe('ChatItemComponent', () => {
  let component: ChatItemComponent;
  let fixture: ComponentFixture<ChatItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ChatItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
