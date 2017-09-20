import { Component , ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import {AppService} from './app.service';
import { Observable } from "rxjs/Rx";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AppService]
})
export class AppComponent {
  title = 'Lab ';
  chartData = {};
  chartKeyData = [];
  count=0;
   options: Object;
    @ViewChild('lineCanvas') lineCanvas;
    lineChart:any; 
    chartEnable:boolean = false;

 constructor(public restService:AppService){
    this.restService.getData().subscribe(res=>{
      console.log(JSON.stringify(res)+"------------------");
      this.chartKeyData = res;
    })
 }
getChart(name){
  console.log(name + "name");
   this.restService.getPipeData(name).subscribe(res=>{
       var time =[];
      var value = [];
      console.log(JSON.stringify(res)+"------------------");
        var subscription =  Observable.interval(100 * 60).subscribe(x => {
     
      if(res.length > this.count){
        if(time.length == 3){
          time.pop();
          value.pop();
          time.unshift(res[this.count].time);
          value.unshift(res[this.count].value);
          this.lineChart = this.chartDatas(time, value);
        }
        else{
         time.unshift(res[this.count].time);
         value.unshift(res[this.count].value);
         this.lineChart = this.chartDatas(time, value);
         }
       }
      

      })
        // if(res.length == this.count){
        //   subscription.unsubscribe();
        // }
    })
}
doSomething(){
  console.log("hello");
}

chartDatas(time,value){
  console.log(time + "    time.    " + value + '     value. ')
  this.count++;
  var data= {
    labels: time,
    datasets: [
      {
        label: '# of Value',
        data: value,
        borderWidth: 1
      }
    ]
  }
   var options= {
    scales: {
      yAxes: [{
        ticks: {
          reverse: false
        }
      }]
    }
  }
   return this.getCharts(this.lineCanvas.nativeElement, "line", data, options);
}

getCharts(context, chartType, data, options?) {
  this.chartEnable = true;
   return new Chart(context, {
     type: chartType,
     data: data,
     options: options
   });
 }





}
