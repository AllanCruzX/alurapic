import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { PhotosModule } from './photos/photos.module';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';

import { CoreModule } from './core/core.module';
import { PaginaModule } from './pagina/pagina.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PhotosModule,
     ErrorsModule,
     CoreModule,
    AppRoutingModule,
    PaginaModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  // bootstrap - inicialize o AppComponent.
}
