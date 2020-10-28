import { Component } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatApp';

  messageText : string;
  feedBack: string;
  messages: Array<any> = [];
  socket: SocketIOClient.Socket;
  username: string = "";
  
  constructor(){

    //connection
    this.socket = io.connect();
  }

  ngOnInit(){
    this.messages = new Array();
    this.listenEvents();
  }

  listenEvents(){

    // listen to event that server is emitting
    this.socket.on("msg", data => {
      //update feedback
      this.feedBack = "";
    this.messages.push(data);  
    });

    this.socket.on("feedback", data => {
      this.feedBack = data + " is typing a message...";
    });
  }


  // emit 
  sendMessage(){
    this.socket.emit("newMsg", this.messageText);
    this.messageText = "";
  }

  typing(){
    this.socket.emit("newFeedback", this.username);
  }




}
