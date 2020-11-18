import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  url: string = 'http://localhost:8080/maroons/send';
  constructor(private http: HttpClient) { }

  sendMessage(messageContent: any) {
    return "Form Has Been Submitted"
  }
}