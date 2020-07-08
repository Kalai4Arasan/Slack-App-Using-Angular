import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { GetListOfDataService } from '../get-list-of-data.service';

declare var $:any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public _socket:SocketService) { }
  ngOnInit(): void {
    
  }


}
