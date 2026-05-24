import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllPlaylists } from './view-all-playlists';

describe('ViewAllPlaylists', () => {
  let component: ViewAllPlaylists;
  let fixture: ComponentFixture<ViewAllPlaylists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllPlaylists],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAllPlaylists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
