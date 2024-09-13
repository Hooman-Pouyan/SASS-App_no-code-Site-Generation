import {TestBed} from '@angular/core/testing';
import {DynamicMediaService} from '../dynamic-media.service';

describe('DynamicImagesService', () => {
  let service: DynamicMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
