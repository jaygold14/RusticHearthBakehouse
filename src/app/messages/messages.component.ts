import { NgFor, NgIf } from '@angular/common';
import { MessageService } from './../message.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ NgFor, NgIf ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
