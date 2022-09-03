import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
import {AppComponent} from '../app/app.component';
import * as SockJS from 'sockjs-client';
import {WeightComponent} from "../app/weight/weight.component";
import {Observable, Subject} from "rxjs";
import { webSocket } from 'rxjs/webSocket';

export class WebSocketAPI {
  webSocketEndPoint: string = '/stream/weight-endpoint';
  topic: string = "/topic/scalesData";
  stompClient: any;
  weightComponent: WeightComponent|undefined;
  weightSubject$ = new Subject();

  constructor() {
    //FIXME https://stackoverflow.com/questions/22361917/automatic-reconnect-with-stomp-js-in-node-js-application
    console.log("Initialize WebSocket Connection");
    let socket  = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = null;
    const _this = this;

    _this.stompClient.connect({}, function (frame:any)
    {
      console.log("Connected to WebSocket: " + frame)
      _this.stompClient.subscribe(_this.topic, function (msg:any)
      {
        _this.pushMessageToComponent(msg)
      }),
        _this.stompClient.reconnect_delay = 2000
    });
  }

  setComponent(weightComponent: WeightComponent)
  {
    this.weightComponent = weightComponent;
  }
  _connect() {
    // console.log("Initialize WebSocket Connection");
    // let socket  = new SockJS(this.webSocketEndPoint);
    // this.stompClient = Stomp.over(socket);
    // this.stompClient.debug = null;
    // const _this = this;
    //
    // _this.stompClient.connect({}, function (frame:any)
    // {
    //   console.log("Connected to WebSocket: " + frame)
    //   _this.stompClient.subscribe(_this.topic, function (msg:any)
    //   {
    //     _this.pushMessageToComponent(msg)
    //   }),
    //   _this.stompClient.reconnect_delay = 2000
    // });
  };


  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }


  // on error, schedule a reconnection attempt
  errorCallBack(error: string) {
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message: string) {
    this.stompClient.send("/gkz/hello", {}, JSON.stringify(message));
  }

  pushMessageToComponent(msg: any) {
    this.weightComponent?.displayMessage(JSON.parse(msg.body).weight);
    this.weightSubject$.next( JSON.parse(msg.body).weight);
  }

  public getWeight(): any {
    return this.weightSubject$;
  }

}
