import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhotoGalleryComponent } from './create-photo-gallery.component';

describe('CreatePhotoGalleryComponent', () => {
  let component: CreatePhotoGalleryComponent;
  let fixture: ComponentFixture<CreatePhotoGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePhotoGalleryComponent]
    });
    fixture = TestBed.createComponent(CreatePhotoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
