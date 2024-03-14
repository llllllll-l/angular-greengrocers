import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartItems: Item[] = [];
  cartItemsOnChange = new Subject<Item[]>();

  constructor() {}

  getCartItems(): Item[] {
    return this.cartItems;
  }

  addToCart(item: Item): void {
    // check to see if the item is already in the cart
    const existingItem = this.findItem(item);

    if (!existingItem) {
      this.cartItems.push({ ...item, quantity: 1 });
    } else {
      // can not write "++" since quantity may not exists
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    }

    // emit changes to the cart to all subscribers
    this.cartItemsOnChange.next(this.cartItems);
  }

  itemQuantityDecrease(item: Item): void {
    const existingItem = this.findItem(item);
    if (existingItem && existingItem.quantity && existingItem.quantity > 1) {
      // can not write "--" since quantity may not exists
      existingItem.quantity = (existingItem.quantity || 0) - 1;

      // emit changes to the cart to all subscribers
      this.cartItemsOnChange.next(this.cartItems);
    } else {
      this.removeItemfromCart(item);

      // emit changes to the cart to all subscribers
      this.cartItemsOnChange.next(this.cartItems);
    }
  }

  itemQuantityIncrease(item: Item): void {
    const existingItem = this.findItem(item);
    if (existingItem) existingItem.quantity = (existingItem.quantity || 0) + 1;

    // emit changes to the cart to all subscribers
    this.cartItemsOnChange.next(this.cartItems);
  }

  // helper
  private removeItemfromCart(item: Item): void {
    this.cartItems = this.cartItems.filter((i) => i.id !== item.id).slice();
    console.log(this.cartItems);
  }

  // helper
  private findItem(item: Item): Item | undefined {
    const existingItem = this.cartItems.find((i) => i.id === item.id);
    return existingItem;
  }
}
