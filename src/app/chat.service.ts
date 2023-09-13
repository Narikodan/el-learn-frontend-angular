import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private apiBaseUrl = 'https://vishnun.pythonanywhere.com/';
  private apiBaseUrl = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Fetch a list of chat rooms
  getChatRooms(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiBaseUrl}chat-rooms/`, { headers });
  }

  // Create a new chat room
  createChatRoom(chatRoomData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiBaseUrl}create-chat-room/`, chatRoomData, { headers });
  }
  createChatRoomWithTeacher(teacherId: number): Observable<any> {
    const headers = this.getHeaders();
    const requestData = { teacher_id: teacherId };
    return this.http.post(`${this.apiBaseUrl}create-chat-room/`, requestData, { headers });
  }

  // Get the name of a chat room by ID
  getChatRoomName(chatRoomId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiBaseUrl}chat-rooms/${chatRoomId}/messages/`, { headers });
  }

  // Get messages for a specific chat room
  getMessages(chatRoomId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiBaseUrl}chat-rooms/${chatRoomId}/messages/`, { headers });
  }

  // Send a new message to a chat room
  sendMessage(messageData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiBaseUrl}chat-rooms/${messageData.chat_room_id}/send-message/`, messageData, { headers });
  }
  
}
