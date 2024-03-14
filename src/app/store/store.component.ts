import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ItemServiceService } from '../services/item-service.service';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private readonly itemService: ItemServiceService,
    private readonly cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  async loadItems() {
    console.log('Hello');
    this.items = await this.itemService.loadItems();
  }

  addToCart(item: Item) {
    console.log(item);
    this.cartService.addToCart(item);
  }
}
