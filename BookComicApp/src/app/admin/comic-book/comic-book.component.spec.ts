import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicBookComponent } from './comic-book.component';

describe('ComicBookComponent', () => {
  let component: ComicBookComponent;
  let fixture: ComponentFixture<ComicBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComicBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
