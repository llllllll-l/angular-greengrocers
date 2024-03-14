import { Injectable } from '@angular/core';
import { CartServiceService } from './cart-service.service';
import { Item } from '../models/item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TotalServiceService {
  total: number = 0;
  totalSubject: Subject<number> = new Subject<number>();

  constructor(private readonly cartService: CartServiceService) {
    // resive the emits from cartService since subscribed
    this.cartService.cartItemsOnChange.subscribe((cartItem) => {
      this.calculateTotal(cartItem);
    });
  }

  private calculateTotal(cartItem: Item[]): void {
    let total = 0;
    for (const item of cartItem) {
      total += item.price * (item.quantity || 1); // <-- since the quantity can be greater than 1
    }
    this.total = total;

    // emit changes to total to all subscribers
    this.totalSubject.next(total);
  }
}
