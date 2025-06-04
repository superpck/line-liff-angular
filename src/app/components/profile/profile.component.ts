import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineLiffService } from '../../services/line-liff.service';
import config from '../../configs/config.json';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = true;
  userProfile: any = null;
  statusText: string[] = [];
  appConfig = config;

  constructor(
    private lineService: LineLiffService
  ) { }

  async ngOnInit() {
    this.statusText.push('host: '+window.location.href);
    this.statusText.push('search: '+window.location.hash);
    this.statusText.push('โหลดข้อมูลผู้ใช้...');
    this.userProfile = await this.lineService.getProfile();
    this.statusText.push('Line name: '+(this.userProfile.displayName || ''));
    this.loading = false;
  }
}
