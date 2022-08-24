import { Component } from '@angular/core';
import { WebSocketAPI } from '../websocket/web-socket-api';
import {CurrentOrder} from "../interfaces/current-order";
import { CurrentOrderService } from '../services/current-order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'h-cooker';

  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new AppComponent())
  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message:string){
    this.greeting = message;
  }


}
