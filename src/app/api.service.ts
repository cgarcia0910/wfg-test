import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private tokenUrl: string;
  private quotesUrl: string;
  private username: string;
  private userAndPassword: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.tokenUrl = environment.tokenUrl;
    this.quotesUrl = environment.quotesUrl;
    this.username = environment.username;
    this.userAndPassword = environment.userAndPassword;
  }

  public getToken() {
    this.headers = new HttpHeaders()
      .set('Authorization', 'Basic d2ViZmctdGVzdDpXVzU4WUpqODlsdFI0M0Ny')
      .set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `grant_type=password&username=${this.username}&scope=uaa.user&password=${this.userAndPassword}`;
    return this.http.post(this.tokenUrl, body, { headers: this.headers});
  }

  getData() {
    const getHeaders = new HttpHeaders()
      .set('Accept', 'application/vnd.solid-v1.0+json')
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', `Bearer ${JSON.parse(localStorage.getItem('token')).access_token}`);

    return this.http.get(this.quotesUrl, {headers: getHeaders});
  }

  // TODO: Call this method with a setTimeout when the saving token behaviour will implemented in the same observable
  private refreshToken(refreshToken) {
    const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;
    this.http.post(this.tokenUrl, body, {headers: this.headers})
      .subscribe(newtoken => {
        localStorage.setItem('token', JSON.stringify(newtoken));
      })
  }
}


