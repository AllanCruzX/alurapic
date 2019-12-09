import { RouterModule } from '@angular/router';
import { VMessageModule } from './../shared/components/vmessage/vmessage.module';
import { NgModule } from '@angular/core';
import { SignInComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ SignInComponent ],
    imports: [ 
        CommonModule, 
        ReactiveFormsModule ,
         VMessageModule,
         RouterModule ]
})
export class HomeModule {}