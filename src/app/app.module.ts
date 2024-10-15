import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttLoaderFactory } from './shared/helpers/translate';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent
    ],
    imports: [
        BrowserModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttLoaderFactory,
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule { }

