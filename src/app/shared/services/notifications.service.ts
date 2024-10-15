import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2'


@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(private translateService: TranslateService) { }

    showSuccess(message: string) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: this.translateService.instant(message),
            showConfirmButton: false,
            timer: 1500
        });
    }

    showError(message: string) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: this.translateService.instant(message),
            showConfirmButton: false,
            timer: 1500
        });
    }

    async confirmDelete(message: string): Promise<boolean> {
        try {
            const result = await Swal.fire({
                title: this.translateService.instant(message),
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            return result.isConfirmed;
        } catch (error) {
            return false;
        }
    }


}
