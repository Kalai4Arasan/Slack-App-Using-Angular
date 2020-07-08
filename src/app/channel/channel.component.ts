import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { GetListOfDataService } from '../get-list-of-data.service';
import { ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit  {

  constructor(public _socket:SocketService,private route:ActivatedRoute,private _userData: GetListOfDataService) { }
  socket;
  data=JSON.parse(sessionStorage.getItem('user'));
  PageUserName;
  PageUserData;
  public messageInput="";
  totalMessages;
  public Editor = ClassicEditor;
  ngOnInit(): void {

    this.socket=this._socket.socket;
    this._socket.setConnection();
    this._socket.setAvailable(this.data);
    this.route.params.subscribe(param=>{
      this.PageUserName=param
      this.totalMessages=[];
      this.socket.emit('JoinRoom',this.PageUserName['roomId']);
      this._userData.getMessage(this.PageUserName['roomId']).subscribe((data)=>{
        console.log(data['message'])
        if(data['message'][0]=='' && Object.keys(data['message']).length==1){
          this.totalMessages=[]
        }
        else{
        this.totalMessages=data['message'];
        }
        //console.log(data);
      })

      this._userData.getChannelData(this.PageUserName['userName']).subscribe((data)=>{
        this.PageUserData=data;
        //console.log(data);
      })
      $("html, body").animate({ scrollTop: $(document).height() }, "slow");

    });
    $('.details').click(()=>{
      if($('#MainBox').hasClass('col-md-12')){
        $("#MainBox").attr('class', 'col-md-8');
      }
      else{
        setTimeout(()=>{
          $("#MainBox").attr('class', 'col-md-12');
        },500)
      }
    });

    $('.user').click(()=>{
      if($('#iconuser').hasClass('fa fa-caret-right')){
        $("#iconuser").attr('class', 'fa fa-caret-down');
      }
      else{
        $("#iconuser").attr('class', 'fa fa-caret-right');
      }
    });

    $(".submit").click(function() {
      $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    });​
     
    

    this.socket.on('new-message',(data)=>{
      this.totalMessages.push(data);
      //console.log(this.totalMessages[this.PageUserName['userName']+this.PageUserName['roomId']]);
    })
  
  }

  sendMessage(){
    var sendData={'message':this.messageInput,'user':this.data,'time':new Date()};
    this.totalMessages.push(sendData);
    this._socket.sendMessage(sendData);
    this.messageInput=""
  }

  

}
