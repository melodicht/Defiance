import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { DragDropDirective } from './drag-drop.directive';
import { DragEventDirective } from './drag-event.directive';
import { HeroIconsComponent } from './hero-icons/hero-icons.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    DragDropDirective,
    DragEventDirective,
    HeroIconsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //remove when real server is ready
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
