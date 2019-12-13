import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root'})
export class PlatformDetectorService { 
    //"platform-detector", e ela conterá todo mecanismo de detecção de plataformas e afins navegador ou server side.
    constructor(@Inject(PLATFORM_ID) private platformId: string) { }

    isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }
}