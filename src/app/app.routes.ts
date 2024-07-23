//Boilerplate:
//import { Routes } from '@angular/router';
//export const routes: Routes = [];


//Copypasted from app-routing.module.ts:
// import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
// import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: RecipeDetailComponent }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
export class AppRoutingModule { }
