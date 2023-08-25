import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailsModalComponent } from './video-details-modal.component';

describe('VideoDetailsModalComponent', () => {
  let component: VideoDetailsModalComponent;
  let fixture: ComponentFixture<VideoDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoDetailsModalComponent]
    });
    fixture = TestBed.createComponent(VideoDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
