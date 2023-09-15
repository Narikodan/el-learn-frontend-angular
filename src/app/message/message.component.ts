import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  chatRoomId: string = '';
  chatRoomName: string = '';
  messages: any[] = [];
  newMessage: string = '';
  userData: any;

  @ViewChild('messageList', { static: false }) messageList!: ElementRef;
  visibleMessages: any[] = [];
  batchSize: number = 10; // Number of messages to load at once
  currentBatchIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ChatService,
    private userdataService: ApiService
  ) {}

  ngOnInit(): void {
    // Retrieve the chat room ID from the route parameters
    this.userdataService.getUserData().subscribe(
      (data) => {
        this.userData = data;
        // console.log(this.userData);
      },
      (error) => {
        // console.error('Error fetching user data:', error);
      }
    );
    this.route.params.subscribe((params) => {
      this.chatRoomId = params['chatRoomId'];
      this.fetchChatRoomName(); // Fetch the chat room name
      this.fetchMessages(); // Fetch messages for the chat room
    });

    // Call loadMessages here to initialize visibleMessages
    this.loadMessages();
  }

  fetchChatRoomName(): void {
    // Use the API service to get the chat room name based on the chatRoomId
    this.apiService.getChatRoomName(this.chatRoomId).subscribe((data: any) => {
      // console.log(this.chatRoomId);
      this.chatRoomName = data.name;
    });
  }

  fetchMessages(): void {
    // Use the API service to get messages for the chat room
    this.apiService.getMessages(this.chatRoomId).subscribe((data: any) => {
      this.messages = data;
      this.loadMessages(); // Load messages after fetching
    });
  }

  loadMessages(): void {
    const totalMessages = this.messages.length;
    const startIndex = totalMessages - this.batchSize;

    if (startIndex >= 0) {
      this.visibleMessages = this.messages.slice(startIndex, totalMessages);
    } else {
      // If there are fewer messages than batchSize, show all available messages
      this.visibleMessages = this.messages.slice(0, totalMessages);
    }

    this.currentBatchIndex = startIndex >= 0 ? totalMessages : totalMessages - startIndex;
  }

  onScroll(): void {
    const element = this.messageList.nativeElement;
    if (element.scrollTop === 0 && this.currentBatchIndex < this.messages.length) {
      const newBatch = this.messages.slice(
        this.currentBatchIndex,
        this.currentBatchIndex + this.batchSize
      );
      this.visibleMessages = newBatch.concat(this.visibleMessages);
      this.currentBatchIndex += this.batchSize;
    }
  }

  sendMessage(): void {
    // Use the API service to send a new message
    if (this.newMessage) {
      const messageData = {
        chat_room_id: this.chatRoomId,
        content: this.newMessage
      };

      this.apiService.sendMessage(messageData).subscribe(() => {
        // After sending the message, refresh the message list
        this.fetchMessages();
        this.newMessage = ''; // Clear the input field
      });
    }
  }
}
