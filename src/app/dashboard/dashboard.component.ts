import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
//import { NgFor } from '@angular/common';
//import { MessageService } from './../message.service';

//import { MessageService } from './../message.service';
// import { RECIPES } from './../mock-recipes';
//import { Component , Directive } from '@angular/core';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeSearchComponent } from '../recipe-search/recipe-search.component';
//import { RecipeService } from '../recipe.service';
//import { Recipe } from '../recipe';
//import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  standalone: true,
  imports: [
    NgFor, 
    CommonModule, 
    FormsModule,
    UpperCasePipe,
    NgIf,
    RecipeDetailComponent,
    RouterLink,
    RouterModule,
    RecipeSearchComponent
  ]
})
export class DashboardComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes.slice(1, 5));
  }
}