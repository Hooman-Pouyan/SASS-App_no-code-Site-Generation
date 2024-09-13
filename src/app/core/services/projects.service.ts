import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getRecentProject(page: number = 1, limit: number = 10, categories?: string[]) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())

    const data = {
      'CATEGORY': categories?.length ? categories : undefined
    }

    return this.httpClient.post('/api/recentProject/Get/', data, {params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getCategoriesProjects() {
    return this.httpClient.get('/api/recentProject/RandomProject').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


}
