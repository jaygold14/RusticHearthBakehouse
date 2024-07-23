import { Component, Input } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { Recipe } from '../recipe';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [FormsModule, NgIf, UpperCasePipe],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})


export class RecipeDetailComponent {
  @Input() recipe?: Recipe;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id)
      .subscribe(recipe => this.recipe = recipe);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.recipe) {
      this.recipeService.updateRecipe(this.recipe)
        .subscribe(() => this.goBack());
    }
  }
}
