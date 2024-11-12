import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicBookListComponent } from './comic-book-list.component';

describe('ComicBookListComponent', () => {
  let component: ComicBookListComponent;
  let fixture: ComponentFixture<ComicBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComicBookListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
