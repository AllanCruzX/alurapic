import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { showIfLoggedDirective } from './how-if-logged.directive';

@NgModule({
    declarations: [showIfLoggedDirective],
    exports: [showIfLoggedDirective],
    imports: [CommonModule]
})
export class ShowIfLoggedModule{}