import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlaylist } from './edit-playlist';

describe('EditPlaylist', () => {
  let component: EditPlaylist;
  let fixture: ComponentFixture<EditPlaylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlaylist],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPlaylist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
