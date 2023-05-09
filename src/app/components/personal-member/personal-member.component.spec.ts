import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalMemberComponent } from './personal-member.component';

describe('PersonalMemberComponent', () => {
  let component: PersonalMemberComponent;
  let fixture: ComponentFixture<PersonalMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalMemberComponent]
    });
    fixture = TestBed.createComponent(PersonalMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
