import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quotes: any;

  constructor(private api: ApiService) {
    // TODO: Implement this behavior in service combining both calls in the same observable
    if(!localStorage.getItem('token')) {
      this.api.getToken().subscribe(token => {
        localStorage.setItem('token', JSON.stringify(token));
        this.api.getData().subscribe(quotes => this.quotes = quotes['quotes'][0].fields);
      });
    }
    else {
      this.api.getData().subscribe(quotes => this.quotes = quotes['quotes'][0].fields);
    }
  }

  getColor(amount: Number) {
    return (amount > 0)? 'darkseagreen' : 'red';
  }
}
