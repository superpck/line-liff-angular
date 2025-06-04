import { Injectable } from '@angular/core';
// import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { firstValueFrom, lastValueFrom } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';
import dayjs from 'dayjs';
import config from '../configs/config.json';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = config.apiUrl;

  // jwtHelper: JwtHelperService = new JwtHelperService();
  // production: any = environment.production;
  token = sessionStorage.getItem('tokenRefer');
  hisTokenName = 'tokenhis';
  hisKeyName = 'his-key';
  hisClientIDSessionName = 'HIS-Client-ID';
  hisConnectUrl = '';
  config: any = {};
  headers: any;
  apiConfig: any;
  thaidData: any;

  constructor(
    // private mainService: MainService,
    private http: HttpClient
  ) {}

  // ProviderID =================================
  async providerIDPortal(type: any = null) {
    const kwd = dayjs().add(2, 'seconds').format('YYYYMMDDHHmmss');
    try {
      const result = await lastValueFrom(this.http.get(`${this.url}/admin/providerid/create-url/${kwd}` + (type ? `/${type}` : '')));
      return result;
    } catch (error) {
      return error;
    }
  }

  // ThaID กระทรวงมหาดไทย =================================
  async setThaiID(data: any = null) {
    this.thaidData = data;
  }
  async getThaiID() {
    return this.thaidData || null;
  }
  async thaIDPortal(type: any = 'approve') {
    const kwd = dayjs().add(2, 'seconds').format('YYYYMMDDHHmmss');

    try {
      let sourceUrl: any = window.location.href.split('/')[2];
      sourceUrl = sourceUrl ? sourceUrl.split(/\.|\:/)[0] : sourceUrl;
      const result = await lastValueFrom(this.http.get(`${this.url}/thaid/create-thaID-url/${kwd}/${type}/${sourceUrl}`));
      return result;
    } catch (error) {
      return error;
    }
  }
  async callbackData(state: string, code: string) {
    return lastValueFrom(this.http.post(`${this.url}/admin/thaid/callback-data`, { state, code }))
      .then(result => result)
      .catch(error => error);
  }

  // ตรวจสอบว่า Approve หรือยัง
  async thaIDAuthenticatedProvince(province: string) {
    return lastValueFrom(this.http.get(`${this.url}/admin/thaid/authenticated-province/${province}`))
      .then(result => result)
      .catch(error => error);
  }
  async loginByThaID(state: string, code: string, callbackRef = 0, uid = 0) {
    try {
      const result = await firstValueFrom(this.http.post(`${this.url}/thaid/callback-data-login`, { state, code, callbackRef, uid }));
      return result;
    } catch (error) {
      return error;
    }
  }
}