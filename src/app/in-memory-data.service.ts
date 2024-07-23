import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const recipes = [
      { id: 1, name: 'Rustic Sourdough Loaf' },
      { id: 2, name: 'Pineapple Empanadas' },
      { id: 3, name: 'Five Ingredient Apple Pie' },
      { id: 4, name: "Birthday Carrot Cake" },
      { id: 5, name: "Chocolate Chip Biscuits" },
      { id: 6, name: "Sourdough Pancakes" },
      { id: 7, name: "Pork Shoulder Meat Pies" },
      { id: 8, name: "Holiday Bread" },
      { id: 9, name: "Table Bread" },
      { id: 10, name: "Chunky Banana Bread"},
      { id: 11, name: "Sweet Potato Pie"}
    ];
    return {recipes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(recipes: Recipe[]): number {
    return recipes.length > 0 ? Math.max(...recipes.map(recipe => recipe.id)) + 1 : 11;
  }
}
