import { Injectable } from '@angular/core';
import { Http, Response, Headers , RequestOptions} from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class AppService {
headers = new Headers();

 constructor(private http:Http){}

  getData(): Observable<any>{
    return this.http.get('./assets/json/tags.json')
      .map(response => {
        console.log('email sent', response);
        return response.json();
      })
      .catch(this.handleError);
    }

  getPipeData(chartName): Observable<any>{
    return this.http.get('./assets/json/pipe.json')
      .map(response => {
        var data = response.json()
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            console.log(key + " -> " + data[key]);
            if(key == chartName){
              return data[key]
            }
          }
        }
      })
      .catch(this.handleError);
    }

  private handleError (error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }
}
