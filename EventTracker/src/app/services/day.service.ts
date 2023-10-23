import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Day } from '../models/day';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  index(): Observable<Day[]> {
    return this.http.get<Day[]>(this.url).pipe(
      catchError((err: any) => {

        console.log(err);
        return throwError(
          () => new Error('DayService.index(): error retrieving task: ' + err)
        );
      })
    );
    }

    create(day: Day): Observable<Day>{
      day.createDate = null;
      day.lastUpdate = null;
      return this.http.post<Day>(this.url, day).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error("DayService.create(); error creating task: " + err)
          );
        })
      );
    }

    update(day: Day) {
      return this.http.put<Day>(this.url + '/' + day.id , day).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error("DayService.update(); error creating task: " + err)
          );
        })
      );
    }

    destroy(id: number){
      return this.http.delete<void>(this.url + '/' + id).pipe(
        catchError((err: any) =>{
          console.log(err);
          return throwError(
            () => new Error("DayService.delete(); error deleting day "+ err)
          );
        })
      );
    }
  constructor(private http: HttpClient) {
  }
  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/days';
}
