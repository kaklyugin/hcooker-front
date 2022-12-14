import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WebSocketAPI} from "../../websocket/web-socket-api";
import {Observable} from "rxjs";
import {IScalesData} from "../../interfaces/iscales-data";

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})

export class WeightComponent implements OnInit {
  title = 'h-cooker';
  webSocketAPI: WebSocketAPI ;
  name: string;

  greeting: string = "init";

  iScalesData: IScalesData;

  constructor(private changeDetection: ChangeDetectorRef) {
    this.changeDetection.detach()
  }

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI();
    this.webSocketAPI.setComponent(this);

    const weightObservable = this.webSocketAPI.getWeight();
    weightObservable.subscribe((weightData: string)=>{
     // this.weight = weightData;
      this.changeDetection.detectChanges();
    })

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

  displayMessage(msg:string){
    this.greeting = msg;
    this.changeDetection.detectChanges()

  }

}
