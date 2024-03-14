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
}
