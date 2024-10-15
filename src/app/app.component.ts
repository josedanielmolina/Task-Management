import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'task-management';

    constructor(private translate: TranslateService) {
        this.translate.addLangs(['en']);
        const lang = 'en';
        this.translate.use(lang);
    }
}
