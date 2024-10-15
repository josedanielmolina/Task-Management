import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
    <ngx-loading
    [show]="loading"
    [config]="{ backdropBorderRadius: '3px' }"
  ></ngx-loading>
  `
})
export class LoadingComponent {

    @Input() loading: boolean = false;

}
