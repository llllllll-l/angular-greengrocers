import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Item[] = [];

  constructor(private readonly cartService: CartServiceService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  itemQuantityDecrease(item: Item) {
    console.log('decrease by one');
    this.cartService.itemQuantityDecrease(item);
    this.ngOnInit(); // <-- since the item may have been removed from the array
  }

  itemQuantityIncrease(item: Item) {
    console.log('increase by one');
    this.cartService.itemQuantityIncrease(item);
  }
}
