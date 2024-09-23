import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';  // Mock REST API

  constructor(private http: HttpClient) {}

  // Method to get a list of posts
  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Method to get a specific post by ID
  getPost(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Method to create a new post
  createPost(post: any): Observable<any> {
    return this.http.post(this.apiUrl, post).pipe(
      catchError(this.handleError)
    );
  }

  // Method to handle errors
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong!'));
  }
}
