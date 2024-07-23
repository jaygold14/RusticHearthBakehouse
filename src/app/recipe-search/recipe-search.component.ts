import { Recipe } from './../recipe';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [ RouterLink, NgFor, AsyncPipe],
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.css'
})
export class RecipeSearchComponent {
  recipes$!: Observable<Recipe[]>;
  private searchTerms = new Subject<string>();

  constructor(private recipeService: RecipeService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.recipes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
      this.recipeService.searchRecipes(term)),
    
    );
  }
}
