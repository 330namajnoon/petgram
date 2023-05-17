import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsgComponent } from './msg/msg.component';
import { RegisterModule } from './register/register.module';
@NgModule({
  declarations: [
    AppComponent,
    MsgComponent
  ],
  imports: [
    BrowserModule,
    RegisterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
