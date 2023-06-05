import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsgComponent } from './msg/msg.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    MsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
