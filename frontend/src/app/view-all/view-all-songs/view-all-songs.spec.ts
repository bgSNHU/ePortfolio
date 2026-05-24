import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllSongs } from './view-all-songs';

describe('ViewAllSongs', () => {
  let component: ViewAllSongs;
  let fixture: ComponentFixture<ViewAllSongs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllSongs],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAllSongs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
