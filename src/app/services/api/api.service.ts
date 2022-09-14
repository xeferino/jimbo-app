/**
 *
 * @fileoverview ApiService
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { HelperService } from '../helper/helper.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public url: string = environment.server;
  public headers: any;
  public token: string = localStorage.getItem('token');

  constructor(private http: HttpClient, private auth: AuthService, private helper: HelperService) {}

  setToken() {
    this.token = localStorage.getItem('token');
  }

  setHeaders() {
    this.setToken();
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
    });
  }

  postBase(path, data) {
    this.setHeaders();
    var simbol = path.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.url}${path}${simbol}latitude=${localStorage.getItem('latitude') || 0}&longitude=${
            localStorage.getItem('longitude') || 0
          }`,
          data,
          { headers: this.headers }
        )
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            if (error.status == 401) {
              this.auth.logout();
              this.helper.routes('intro');
            }
            reject(error);
          }
        );
    });
  }

  post(path, data) {
    this.setHeaders();
    var simbol = path.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.token ? this.url + 'user/' : this.url + 'auth/'}${path}${simbol}latitude=${
            localStorage.getItem('latitude') || 0
          }&longitude=${localStorage.getItem('longitude') || 0}`,
          data,
          { headers: this.headers }
        )
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            if (error.status == 401) {
              this.auth.logout();
              this.helper.routes('intro');
            }
            reject(error);
          }
        );
    });
  }

  get(path) {
    this.setHeaders();
    var simbol = path.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${this.token ? this.url + 'user/' : this.url + 'auth/'}${path}${simbol}latitude=${
            localStorage.getItem('latitude') || 0
          }&longitude=${localStorage.getItem('longitude') || 0}`,
          { headers: this.headers }
        )
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            if (error.status == 401) {
              this.auth.logout();
              this.helper.routes('intro');
            }
            reject(error);
          }
        );
    });
  }

  put(path, data) {
    this.setHeaders();
    var simbol = path.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
      this.http
        .put(
          `${this.token ? this.url + 'user/' : this.url + 'auth/'}${path}${simbol}latitude=${
            localStorage.getItem('latitude') || 0
          }&longitude=${localStorage.getItem('longitude') || 0}`,
          data,
          { headers: this.headers }
        )
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            if (error.status == 401) {
              this.auth.logout();
              this.helper.routes('intro');
            }
            reject(error);
          }
        );
    });
  }

  delete(path) {
    this.setHeaders();
    var simbol = path.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
      this.http
        .delete(
          `${this.token ? this.url + 'user/' : this.url + 'auth/'}${path}${simbol}latitude=${
            localStorage.getItem('latitude') || 0
          }&longitude=${localStorage.getItem('longitude') || 0}`,
          { headers: this.headers }
        )
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            if (error.status == 401) {
              this.auth.logout();
              this.helper.routes('intro');
            }
            reject(error);
          }
        );
    });
  }
}
