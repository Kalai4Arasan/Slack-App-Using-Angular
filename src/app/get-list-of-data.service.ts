import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserModel} from '../interfaces/UserModel';
import {ChannelModel} from '../interfaces/ChannelModel';
import { HttpClient } from '@angular/common/http';
import { MessageModel } from 'src/interfaces/MessageModel';

@Injectable({
  providedIn: 'root'
})
export class GetListOfDataService {

  constructor(private _http: HttpClient) { }

  getData(name):Observable<UserModel>{
    return this._http.get<UserModel>('http://localhost:3000/userDetails/'+name)
  }

  getMessage(room):Observable<MessageModel>{
    return this._http.get<MessageModel>('http://localhost:3000/message/'+room)
  }

  getChannelData(name):Observable<ChannelModel>{
    return this._http.get<ChannelModel>('http://localhost:3000/channelDetails/'+name)
  }

  setAvailability(name){
    
    return this._http.get('http://localhost:3000/setAvailability/'+name)
  }
  removeAvailability(name){
    
    return this._http.get('http://localhost:3000/removeAvailability'+name)
  }
}
