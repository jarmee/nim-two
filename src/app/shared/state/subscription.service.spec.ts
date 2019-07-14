import { async, TestBed } from '@angular/core/testing';
import { EMPTY, Observable } from 'rxjs';
import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionService]
    });
  }));

  beforeEach(() => {
    service = TestBed.get(SubscriptionService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('subscribeTo', () => {
    it('should a subscribtion to the subscriptions array', () => {
      const fakeObservable: Observable<any> = EMPTY;

      service.subscribeTo(fakeObservable);

      expect(service.subscriptions.length).toBe(1);
    });

    it('should subscribe to the observable', () => {
      const fakeObservable: any = {
        subscribe: jest.fn(() => EMPTY.subscribe())
      };

      service.subscribeTo(fakeObservable);

      expect(fakeObservable.subscribe).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from all subscriptions', () => {
      const fakeSubscription1 = {
        unsubscribe: jest.fn()
      };
      const fakeSubscription2 = {
        unsubscribe: jest.fn()
      };
      service.subscriptions = [fakeSubscription1, fakeSubscription2] as any;

      service.ngOnDestroy();

      expect(fakeSubscription1.unsubscribe).toHaveBeenCalled();
      expect(fakeSubscription2.unsubscribe).toHaveBeenCalled();
    });
  });
});
