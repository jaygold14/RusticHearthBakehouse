import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { RECIPES } from './mock-recipes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // getRecipes(): Recipe[] {
  //   return RECIPES;
  // }
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // getRecipes(): Observable<Recipe[]> {
  //   const recipes = of(RECIPES);
  //   this.messageService.add('RecipeService: fetched recipes');
  //   return recipes;
  // }

  private recipesUrl = 'api/recipes';  // URL to web api

  getRecipes(): Observable<Recipe[]> {
    this.messageService.add(`HttpClient: Fetching recipes from ${this.recipesUrl}`);

    return this.http.get<Recipe[]>(this.recipesUrl)
      .pipe(
        tap(_ => this.log('fetched recipes')),
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    this.messageService.add(`HttpClient: Fetching recipes from ${url}`);
    
    return this.http.get<Recipe>(url)
      .pipe(
        tap(_ => this.log(`fetched recipe id=${id}`)),
        catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getRecipe(id: number): Observable<Recipe> {
  //   const recipe = RECIPES.find(h => h.id === id)!;
  //   this.messageService.add(`RecipeService: fetched hero id=${id}`);
  //   return of(recipe);
  // }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesUrl, recipe, this.httpOptions)
      .pipe(
        tap((newRecipe: Recipe) => this.log(`added recipe w/ id=${newRecipe.id}`)),
        catchError(this.handleError<Recipe>('addRecipe'))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RecipeService: ${message}`);
  }

  updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put(this.recipesUrl, recipe, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated recipe id=${recipe.id}`)),
        catchError(this.handleError<any>('updateRecipe'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;

    return this.http.delete<Recipe>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted Recipe id=${id}`)),
        catchError(this.handleError<Recipe>('deleteRecipe'))
      );
  }

  /* GET heroes whose name contains search term */
  searchRecipes(term: string): Observable<Recipe[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Recipe[]>(`${this.recipesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found recipes matching "${term}"`) :
          this.log(`no recipes matching "${term}"`)),
        catchError(this.handleError<Recipe[]>('searchRecipes', []))
      );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

}
