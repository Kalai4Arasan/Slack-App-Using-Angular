import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TaskBarComponent } from './task-bar/task-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ChannelComponent } from './channel/channel.component';
import { MessagesComponent } from './messages/messages.component';
import {GetListOfDataService} from './get-list-of-data.service';
import { HttpClientModule } from '@angular/common/http';
import { SocketService } from './socket.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TaskBarComponent,
    MainPageComponent,
    ChannelComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
  ],
  providers: [
    GetListOfDataService,
    SocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
