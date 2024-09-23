import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggingInterceptor } from './logging.interceptor';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule],
  providers:[ 
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    ApiService
  ],
  template: `
   <div class="container">
    <h2>Posts</h2>
    <ul>
      <li *ngFor="let post of posts">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
    <button (click)="testRequest()">Test Request</button>
  </div>

  `,
  styles: [],
})
export class AppComponent {
  posts: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch posts when the component initializes
    this.apiService.getPosts().subscribe(
      (data) => {
        this.posts = data;
        console.log('Posts fetched successfully:', this.posts);
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  testRequest() {
    this.apiService.getPosts().subscribe(
      (data) => {
        console.log('Test request successful:', data);
      },
      (error) => {
        console.error('Test request failed:', error);
      }
    );
  }
}