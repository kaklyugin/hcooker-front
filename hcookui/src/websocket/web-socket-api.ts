import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
import {AppComponent} from '../app/app.component';
import * as SockJS from 'sockjs-client';
import {WeightComponent} from "../app/weight/weight.component";
import {Observable, Subject} from "rxjs";
import { webSocket } from 'rxjs/webSocket';

export class WebSocketAPI {
  webSocketEndPoint: string = '/stream/weight-endpoint';
  topic: string = "/topic/hi";
  stompClient: any;
  weightComponent: WeightComponent|undefined;
  weightSubject$ = new Subject();

  constructor() {
  }

  setComponent(weightComponent: WeightComponent)
  {
    this.weightComponent = weightComponent;
  }
  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);


    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame:any) {
      console.log("Connected to WebSocket: " + frame)
      _this.stompClient.subscribe(_this.topic, function (msg: any) {
        _this.pushMessageToComponent(msg);

      });
      _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }


  // on error, schedule a reconnection attempt
  errorCallBack(error: string) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message: string) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/gkz/hello", {}, JSON.stringify(message));
  }

  pushMessageToComponent(msg: any) {
    console.log("Message Recieved from Server :: " + msg);
    // @ts-ignore
    this.weightComponent.displayMessage(JSON.parse(msg.body).greeting);
    this.weightSubject$.next("helloworld " +  JSON.parse(msg.body).greeting);

  }

  public getWeight(): any {
    return this.weightSubject$;
  }

}
