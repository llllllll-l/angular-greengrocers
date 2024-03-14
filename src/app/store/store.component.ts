import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ItemServiceService } from '../services/item-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  items: Item[] = [];

  constructor(private readonly itemService: ItemServiceService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  async loadItems() {
    console.log('Hello');
    this.items = await this.itemService.loadItems();

    console.log(this.items);
  }
}
