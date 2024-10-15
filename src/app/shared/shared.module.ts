import { NgModule } from '@angular/core';
import { NgxLoadingModule } from '@dchtools/ngx-loading-v18';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
    declarations: [
        LoadingComponent
    ],
    imports: [
        NgxLoadingModule.forRoot({}),
    ],
    exports: [
        LoadingComponent
    ]
})
export class SharedModule { }
