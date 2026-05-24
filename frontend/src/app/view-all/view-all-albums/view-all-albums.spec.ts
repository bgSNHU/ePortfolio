import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAlbums } from './view-all-albums';

describe('ViewAllAlbums', () => {
  let component: ViewAllAlbums;
  let fixture: ComponentFixture<ViewAllAlbums>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllAlbums],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAllAlbums);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
