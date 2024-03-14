import { Component, OnDestroy, OnInit } from '@angular/core';
import { TotalServiceService } from '../services/total-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css'],
})
export class TotalComponent implements OnInit, OnDestroy {
  totalAmount: number = 0;
  //@ts-ignore
  totalSubscription: Subscription;

  constructor(private readonly totalService: TotalServiceService) {}

  ngOnInit(): void {
    // recive emits form totalService since subscribed
    this.totalSubscription = this.totalService.totalSubject.subscribe(
      (total) => {
        this.totalAmount = total;
      }
    );
  }

  ngOnDestroy(): void {
    // If you do not unsubscribe from the Observable, it will continue to emit values, even if you no longer need them
    this.totalSubscription.unsubscribe();
  }
}
