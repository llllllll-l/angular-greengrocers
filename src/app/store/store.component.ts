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
  apiResponseItems: Item[] = [];
  filteredItems: Item[] = [];

  constructor(
    private readonly itemService: ItemServiceService,
    private readonly cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  async loadItems() {
    this.apiResponseItems = await this.itemService.loadItems();
    this.filteredItems = this.apiResponseItems;
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
  }

  filterFruits() {
    this.filtering('fruits');
  }

  filterVegetables() {
    this.filtering('vegetables');
  }

  removeFiltering() {
    this.loadItems();
  }

  private filtering(filteringBy: string) {
    if (filteringBy === 'fruits') {
      this.filteredItems = this.apiResponseItems.filter(
        (i) => i.type === 'fruit'
      );
    } else if (filteringBy === 'vegetables') {
      this.filteredItems = this.apiResponseItems.filter(
        (i) => i.type === 'vegetable'
      );
    }
  }
}
