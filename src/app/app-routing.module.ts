import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { MessagesComponent } from './messages/messages.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  {path:'',component:MainPageComponent},
  {path:'channel/:userName/:roomId',component:ChannelComponent},
  {path:'message/:userName/:roomId',component:MessagesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
