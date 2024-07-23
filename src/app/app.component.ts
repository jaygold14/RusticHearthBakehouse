import { Component, Directive } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from "./messages/messages.component";
//import { AppRoutingModule } from './app-routing.module';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RecipesComponent, 
    MessagesComponent, 
    RouterModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'Rustic Hearth Bakehouse';
}
