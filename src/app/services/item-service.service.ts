import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemServiceService {
  private URL = `https://boolean-api-server.fly.dev/groceries`;

  constructor(private readonly http: HttpClient) {}

  async loadItems(): Promise<Item[]> {
    return firstValueFrom(this.http.get<Item[]>(this.URL));
  }
}
