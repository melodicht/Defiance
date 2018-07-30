import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroIconsComponent } from './hero-icons.component';

describe('HeroIconsComponent', () => {
  let component: HeroIconsComponent;
  let fixture: ComponentFixture<HeroIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
