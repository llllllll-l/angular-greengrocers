import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartItems: Item[] = [];

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
  }

  itemQuantityDecrease(item: Item): void {
    const existingItem = this.findItem(item);
    if (existingItem) existingItem.quantity = (existingItem.quantity || 0) - 1;
  }

  itemQuantityIncrease(item: Item): void {
    const existingItem = this.findItem(item);
    if (existingItem) existingItem.quantity = (existingItem.quantity || 0) + 1;
  }

  //helper
  findItem(item: Item): Item | undefined {
    const existingItem = this.cartItems.find((i) => i.id === item.id);
    return existingItem;
  }
}
