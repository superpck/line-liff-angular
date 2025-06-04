import { appConfig } from './../../app.config';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineLiffService } from '../../services/line-liff.service';
import { AdminService } from '../../services/admin.service';
import config from '../../configs/config.json';

@Component({
  selector: 'third-party-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './third-party-login.component.html',
  styleUrls: ['./third-party-login.component.scss']
})
export class ThirdPartyLoginComponent implements OnInit {
  loading = true;
  userProfile: any = null;
  statusText: string[] = [];
  appConfig = config;

  constructor(
    private lineService: LineLiffService,
    private adminService: AdminService
  ) { }

  async ngOnInit() {
    this.statusText.push('host: '+window.location.href);
    this.statusText.push('search: '+window.location.hash);
    this.statusText.push('โหลดข้อมูลผู้ใช้...');
    this.userProfile = await this.lineService.getProfile();
    this.statusText.push('Line name: '+(this.userProfile.displayName || ''));
    this.loading = false;
  }

  redirectUrl = '';
  modalRedirect = false;
  async loginByThaID() {
    this.redirectTitle = 'Login by ThaID';
    this.statusText.push('ติดต่อ ThaID กระทรวงมหาดไทย...');
    let result: any = await this.adminService.thaIDPortal('login');
    this.statusText.push('get url: success');
    if (result.statusCode == 200 && result.url) {
      this.redirectUrl = result.url
      this.modalRedirect = true;
      window.location.replace(this.redirectUrl);
    } else {
      this.statusText.push('error: ' + (result.message || ''));
    }
  }

  redirectTitle = '';
  async loginByProviderID() {
    this.redirectTitle = 'Login by ProviderID';
    this.statusText.push('กำลังติดต่อ ProviderID...');
    let result: any = await this.adminService.providerIDPortal('login');
    this.statusText.push('get url: success');
    if (result.statusCode == 200 && result.url) {
      this.redirectUrl = result.url
      this.modalRedirect = true;
      window.location.replace(this.redirectUrl);
    } else {
      this.statusText.push('error: ' + (result.message || ''));
    }
  }
}
