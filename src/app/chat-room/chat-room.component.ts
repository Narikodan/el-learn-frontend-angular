// chat-room.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  chatRooms: any[] = [];
  newChatRoomName: string = '';

  constructor(
    private apiService: ChatService,
    private router: Router
    ) {}

  ngOnInit(): void {
    // Fetch the list of chat rooms when the component initializes
    this.fetchChatRooms();
  }

  fetchChatRooms(): void {
    // Use the API service to get a list of chat rooms
    this.apiService.getChatRooms().subscribe((data: any) => {
      this.chatRooms = data;
      console.log(data)
    });
  }

  createChatRoom(): void {
    // Use the API service to create a new chat room
    if (this.newChatRoomName) {
      this.apiService.createChatRoom({ name: this.newChatRoomName }).subscribe(() => {
        // After creating the chat room, refresh the list
        this.fetchChatRooms();
        this.newChatRoomName = ''; // Clear the input field
      });
    }
  }
}
