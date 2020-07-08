import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  //public data=JSON.parse(sessionStorage.getItem('user'));
  //messages=[]
  public socket=io(environment.SOCKET_ENDPOINT);
  constructor() {
   }
  setConnection(){
    console.log(this.socket)
    return this.socket;
  }
  setAvailable(data){
    this.socket.emit('Join',data)
  }
  sendMessage(data){
    this.socket.emit('message',data)
  }
  // socket.on('new-message',(data)=>{
  //   this.messages.push(data);
  //   console.log("hii",this.messages);
  // })
}
