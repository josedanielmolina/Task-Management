import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
        errorMessage = `message.clientError`;
    } else {
        errorMessage = `message.serverError`;
    }

    return throwError(() => new Error(errorMessage));
}
