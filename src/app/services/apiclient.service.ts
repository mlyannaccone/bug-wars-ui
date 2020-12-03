import { MapData } from './../models/map-data';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AIScript } from '../models/aiscript';
import { AIScriptResponse} from '../models/aiscript.response';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {
  getAIScript(id: number) {
    const url = environment.getAllAiScriptUrl + '/'+ id;
    return this.http.get<AIScriptResponse>(url, {observe : 'response'});
  }
  getAllAIScripts(){
    const url = environment.getAllAiScriptUrl;
    // // response = this.http.get(url).subscribe()
    // let response: AIScriptResponse;
    // this.http.get(url).subscribe(res => {
    //     // response =
    //     this.getAllAIScripts();
    // });

    return this.http.get<AIScript[]>(url);
  }
  constructor(private http: HttpClient) { }

  createAIScript(input: AIScript){
    const url = environment.getAllAiScriptUrl;
    return this.http.post<AIScriptResponse>(url, input, {observe : 'response'});
  }

  updateAIScript(input: AIScript){
    const {id}= input;
    const url = environment.getAllAiScriptUrl + '/'+ id;
    return this.http.put<AIScriptResponse>(url, input, {observe : 'response'});
  }

  getMap(id: number): Observable<HttpResponse<MapData>> {
    const mapData: MapData = new MapData();

    mapData.rows = [
      ["OPEN", "OPEN", "OPEN", "OPEN", "OPEN"],
      ["OPEN", "WALL", "OPEN", "WALL", "OPEN"],
      ["OPEN", "OPEN", "OPEN", "OPEN", "OPEN"],
      ["OPEN", "WALL", "OPEN", "WALL", "OPEN"],
      ["OPEN", "OPEN", "OPEN", "OPEN", "OPEN"]
    ];

    mapData.spawns = [
      {
        team: 1,
        x: 0,
        y: 0
      },
      {
        team: 2,
        x: 4,
        y: 4
      }
    ];

    mapData.food = [
      {
        x: 2,
        y: 2
      }
    ];

    let httpResponse = new HttpResponse<MapData>({ body : mapData });
    return of(httpResponse);
  }
}
