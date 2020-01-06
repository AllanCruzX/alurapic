import { Directive } from '@angular/core';
import { OnInit, ElementRef } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Directive({
    selector: '[immediateClick]'
})
export class immediateClickDirective implements OnInit {

    //diretiva, capaz de alterar o comportamento de um componente já existente. 

    constructor(
        private element: ElementRef<any>,
        private platFormDetector: PlatformDetectorService) {}

        ngOnInit(): void {    
            this.platFormDetector.isPlatformBrowser &&
            this.element.nativeElement.click();

    }
}