import { Component, OnInit} from '@angular/core';
import { GetListOfDataService } from '../get-list-of-data.service';
import { SocketService } from '../socket.service';

declare var $:any;

@Component({
  selector: 'app-task-bar',
  templateUrl: './task-bar.component.html',
  styleUrls: ['./task-bar.component.css']
})
export class TaskBarComponent implements OnInit {
  public userData:any;
  public UserName="";
  constructor(private _userData:GetListOfDataService,public _socket:SocketService) { }

  ngOnInit(): void {

    //User Session Storage
    if(sessionStorage.length==0){
      this.UserName=prompt('Enter Your Name');
      if(this.UserName){
            this._userData.getData(this.UserName).subscribe((data)=>{
              this.userData=data;
              sessionStorage.setItem('user',JSON.stringify(data));
              this._socket.setConnection();
              console.log(Object.keys(this.userData).length,this.userData['available'])
                if(Object.keys(this.userData).length>0 && this.userData['available']==0){
                    this._socket.setAvailable(this.userData);
                    this._userData.getData(this.userData['name']).subscribe((data)=>{
                    this.userData=data;
                    sessionStorage.setItem('user',JSON.stringify(data));
                    })
                }
            })
        }
    }
    else{
      //console.log(sessionStorage.getItem('user'));
      this.userData=JSON.parse(sessionStorage.getItem('user'));
      this._socket.setConnection();
        if(Object.keys(this.userData).length>0 && this.userData['available']==0){
            this._socket.setAvailable(this.userData);
            this._userData.getData(this.userData['name']).subscribe((data)=>{
            this.userData=data;
            sessionStorage.setItem('user',JSON.stringify(data));
            })
        }
    }

    //Dropdown list Icon toggle
    $('.cl1').click(()=>{
      if($('#icon1').hasClass('fa fa-caret-right')){
        $("#icon1").attr('class', 'fa fa-caret-down');
      }
      else{
        $("#icon1").attr('class', 'fa fa-caret-right');
      }
    });

    $('.cl2').click(()=>{
      if($('#icon2').hasClass('fa fa-caret-right')){
        $("#icon2").attr('class', 'fa fa-caret-down');
      }
      else{
        $("#icon2").attr('class', 'fa fa-caret-right');
      }
    });
    
  }

    // removeAvailability(){
    // if(this.userData['available']!=0){
    //   this._userData.removeAvailability(this.userData['name']).subscribe();
    //   this.userData['available']=0;
    //   sessionStorage.setItem('user',JSON.stringify(this.userData));
    //}
  //}



}
