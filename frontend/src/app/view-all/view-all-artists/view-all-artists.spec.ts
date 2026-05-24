import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllArtists } from './view-all-artists';

describe('ViewAllArtists', () => {
  let component: ViewAllArtists;
  let fixture: ComponentFixture<ViewAllArtists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllArtists],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAllArtists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
