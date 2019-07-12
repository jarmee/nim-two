import { OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

export class SubscriptionService implements OnDestroy {
  subscriptions: Subscription[] = [];

  subscribeTo(observable: Observable<any>) {
    this.subscriptions = [...this.subscriptions, observable.subscribe()];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
