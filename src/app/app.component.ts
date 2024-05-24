import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eventMaker';
  // stripePromise = loadStripe('pk_test_51PJFeA04vysLmCqQ0u6UxHVGb2k8mMKtEl4LWsU8ojjm4284ywkkz8r70qrJuVf55EIqlJnqXzYaQa4EGLiBbz2e00GCNmCORY');
}
