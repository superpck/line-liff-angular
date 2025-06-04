import { Injectable } from '@angular/core';
import liff from '@line/liff';
import config from '../configs/config.json';
// declare var liff: any;

@Injectable({
  providedIn: 'root'
})
export class LineLiffService {
  profile: any = null;
  
  constructor() { }

  async getProfile(){
    if (!this.profile) {
      return await this.init();
    } else {
      return this.profile;
    }
  }

  async init() {
    try {
      await liff.init({ liffId: config.liffId });

      // ถ้ายังไม่ได้ล็อกอิน ให้เรียกฟังก์ชันล็อกอิน (จะพาไปยังหน้าล็อกอินของ Line)
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        // ดึงข้อมูลโปรไฟล์ของผู้ใช้
        this.profile = await liff.getProfile();
        this.profile.idtoken = liff.getIDToken();
        this.profile.token = liff.getDecodedIDToken();
        this.profile.context = liff.getContext()
        this.profile.language = liff.getLanguage();
        this.profile.appLanguage = liff.getAppLanguage();
        this.profile.isInClient = liff.isInClient();
        this.profile.isApiAvailable = liff.isApiAvailable('profile');
        this.profile.isLoggedIn = liff.isLoggedIn();
        this.profile.os = liff.getOS();
        this.profile.version = liff.getVersion();
        this.profile.lineVersion = liff.getLineVersion();
        this.profile.email = this.profile.token?.email || null;
      }
    } catch (error) {
      console.error("Error initializing LIFF", error);
    }
    finally {
      return this.profile || null;
    }
  }
}
